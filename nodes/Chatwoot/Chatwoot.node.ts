import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import {
  chatwootApiRequest,
  chatwootApiRequestAllItems,
  chatwootApiRequestAllMessages,
  validateId,
} from './GenericFunctions';

import { conversationOperations, conversationFields } from './resources/conversation';
import { messageOperations, messageFields } from './resources/message';
import { contactOperations, contactFields } from './resources/contact';

export class Chatwoot implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Chatwoot',
    name: 'chatwoot',
    icon: 'file:chatwoot.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Chatwoot API to manage conversations, messages, and contacts',
    defaults: {
      name: 'Chatwoot',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'chatwootApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Contact',
            value: 'contact',
          },
          {
            name: 'Conversation',
            value: 'conversation',
          },
          {
            name: 'Message',
            value: 'message',
          },
        ],
        default: 'conversation',
      },
      // Operations
      conversationOperations,
      messageOperations,
      contactOperations,
      // Fields
      ...conversationFields,
      ...messageFields,
      ...contactFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData: IDataObject | IDataObject[];

        // =====================================================================
        // CONVERSATION
        // =====================================================================
        if (resource === 'conversation') {
          // -----------------------------------------------------------------
          // GET
          // -----------------------------------------------------------------
          if (operation === 'get') {
            const conversationId = validateId(
              this.getNodeParameter('conversationId', i),
              'Conversation ID',
            );

            responseData = await chatwootApiRequest.call(
              this,
              'GET',
              `/conversations/${conversationId}`,
            );
          }

          // -----------------------------------------------------------------
          // GET ALL
          // -----------------------------------------------------------------
          else if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const filters = this.getNodeParameter('filters', i) as IDataObject;

            const qs: IDataObject = {};

            // Apply filters
            if (filters.status && filters.status !== 'all') {
              qs.status = filters.status;
            }
            if (filters.assignee_type && filters.assignee_type !== 'all') {
              qs.assignee_type = filters.assignee_type;
            }
            if (filters.inbox_id) {
              qs.inbox_id = filters.inbox_id;
            }
            if (filters.team_id) {
              qs.team_id = filters.team_id;
            }
            if (filters.labels) {
              qs.labels = (filters.labels as string).split(',').map((l) => l.trim());
            }
            if (filters.q) {
              qs.q = filters.q;
            }

            if (returnAll) {
              responseData = await chatwootApiRequestAllItems.call(
                this,
                'GET',
                '/conversations',
                {},
                qs,
                'payload',
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              qs.page = 1;
              const result = (await chatwootApiRequest.call(
                this,
                'GET',
                '/conversations',
                {},
                qs,
              )) as IDataObject;
              const payload = (result.payload || []) as IDataObject[];
              responseData = payload.slice(0, limit);
            }
          }

          // -----------------------------------------------------------------
          // UPDATE STATUS
          // -----------------------------------------------------------------
          else if (operation === 'updateStatus') {
            const conversationId = validateId(
              this.getNodeParameter('conversationId', i),
              'Conversation ID',
            );
            const status = this.getNodeParameter('status', i) as string;

            const body: IDataObject = { status };

            // Handle snoozed_until for snoozed status
            if (status === 'snoozed') {
              const snoozedUntil = this.getNodeParameter('snoozed_until', i, '') as string;
              if (snoozedUntil) {
                body.snoozed_until = Math.floor(new Date(snoozedUntil).getTime() / 1000);
              }
            }

            responseData = await chatwootApiRequest.call(
              this,
              'POST',
              `/conversations/${conversationId}/toggle_status`,
              body,
            );
          } else {
            throw new NodeOperationError(
              this.getNode(),
              `Operation "${operation}" is not supported for resource "conversation"`,
              { itemIndex: i },
            );
          }
        }

        // =====================================================================
        // MESSAGE
        // =====================================================================
        else if (resource === 'message') {
          // -----------------------------------------------------------------
          // CREATE
          // -----------------------------------------------------------------
          if (operation === 'create') {
            const conversationId = validateId(
              this.getNodeParameter('conversationId', i),
              'Conversation ID',
            );
            const content = this.getNodeParameter('content', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;

            const body: IDataObject = { content };

            if (options.message_type) {
              body.message_type = options.message_type;
            }
            if (options.private !== undefined) {
              body.private = options.private;
            }
            if (options.content_type) {
              body.content_type = options.content_type;
            }

            responseData = await chatwootApiRequest.call(
              this,
              'POST',
              `/conversations/${conversationId}/messages`,
              body,
            );
          }

          // -----------------------------------------------------------------
          // GET ALL
          // -----------------------------------------------------------------
          else if (operation === 'getAll') {
            const conversationId = validateId(
              this.getNodeParameter('conversationId', i),
              'Conversation ID',
            );
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;

            if (returnAll) {
              responseData = await chatwootApiRequestAllMessages.call(this, conversationId);
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              responseData = await chatwootApiRequestAllMessages.call(this, conversationId, limit);
            }
          } else {
            throw new NodeOperationError(
              this.getNode(),
              `Operation "${operation}" is not supported for resource "message"`,
              { itemIndex: i },
            );
          }
        }

        // =====================================================================
        // CONTACT
        // =====================================================================
        else if (resource === 'contact') {
          // -----------------------------------------------------------------
          // CREATE
          // -----------------------------------------------------------------
          if (operation === 'create') {
            const inboxId = validateId(this.getNodeParameter('inboxId', i), 'Inbox ID');
            const name = this.getNodeParameter('name', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = {
              inbox_id: inboxId,
            };

            if (name) {
              body.name = name;
            }

            if (additionalFields.email) {
              body.email = additionalFields.email;
            }
            if (additionalFields.phone_number) {
              body.phone_number = additionalFields.phone_number;
            }
            if (additionalFields.identifier) {
              body.identifier = additionalFields.identifier;
            }
            if (additionalFields.custom_attributes) {
              body.custom_attributes =
                typeof additionalFields.custom_attributes === 'string'
                  ? JSON.parse(additionalFields.custom_attributes as string)
                  : additionalFields.custom_attributes;
            }

            responseData = await chatwootApiRequest.call(this, 'POST', '/contacts', body);
          }

          // -----------------------------------------------------------------
          // GET
          // -----------------------------------------------------------------
          else if (operation === 'get') {
            const contactId = validateId(this.getNodeParameter('contactId', i), 'Contact ID');

            responseData = await chatwootApiRequest.call(this, 'GET', `/contacts/${contactId}`);
          }

          // -----------------------------------------------------------------
          // GET ALL
          // -----------------------------------------------------------------
          else if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const options = this.getNodeParameter('options', i) as IDataObject;

            const qs: IDataObject = {};

            if (options.sort) {
              qs.sort = options.sort;
            }

            if (returnAll) {
              responseData = await chatwootApiRequestAllItems.call(
                this,
                'GET',
                '/contacts',
                {},
                qs,
                'payload',
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              qs.page = 1;
              const result = (await chatwootApiRequest.call(
                this,
                'GET',
                '/contacts',
                {},
                qs,
              )) as IDataObject;
              const payload = (result.payload || []) as IDataObject[];
              responseData = payload.slice(0, limit);
            }
          }

          // -----------------------------------------------------------------
          // UPDATE
          // -----------------------------------------------------------------
          else if (operation === 'update') {
            const contactId = validateId(this.getNodeParameter('contactId', i), 'Contact ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = {};

            if (updateFields.name) {
              body.name = updateFields.name;
            }
            if (updateFields.email) {
              body.email = updateFields.email;
            }
            if (updateFields.phone_number) {
              body.phone_number = updateFields.phone_number;
            }
            if (updateFields.identifier) {
              body.identifier = updateFields.identifier;
            }
            if (updateFields.avatar_url) {
              body.avatar_url = updateFields.avatar_url;
            }
            if (updateFields.blocked !== undefined) {
              body.blocked = updateFields.blocked;
            }
            if (updateFields.custom_attributes) {
              body.custom_attributes =
                typeof updateFields.custom_attributes === 'string'
                  ? JSON.parse(updateFields.custom_attributes as string)
                  : updateFields.custom_attributes;
            }

            responseData = await chatwootApiRequest.call(
              this,
              'PUT',
              `/contacts/${contactId}`,
              body,
            );
          }

          // -----------------------------------------------------------------
          // DELETE
          // -----------------------------------------------------------------
          else if (operation === 'delete') {
            const contactId = validateId(this.getNodeParameter('contactId', i), 'Contact ID');

            await chatwootApiRequest.call(this, 'DELETE', `/contacts/${contactId}`);
            responseData = { success: true, id: contactId };
          }

          // -----------------------------------------------------------------
          // SEARCH
          // -----------------------------------------------------------------
          else if (operation === 'search') {
            const query = this.getNodeParameter('query', i) as string;
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const options = this.getNodeParameter('options', i) as IDataObject;

            const qs: IDataObject = { q: query };

            if (options.sort) {
              qs.sort = options.sort;
            }

            if (returnAll) {
              responseData = await chatwootApiRequestAllItems.call(
                this,
                'GET',
                '/contacts/search',
                {},
                qs,
                'payload',
              );
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              qs.page = 1;
              const result = (await chatwootApiRequest.call(
                this,
                'GET',
                '/contacts/search',
                {},
                qs,
              )) as IDataObject;
              const payload = (result.payload || []) as IDataObject[];
              responseData = payload.slice(0, limit);
            }
          } else {
            throw new NodeOperationError(
              this.getNode(),
              `Operation "${operation}" is not supported for resource "contact"`,
              { itemIndex: i },
            );
          }
        } else {
          throw new NodeOperationError(this.getNode(), `Resource "${resource}" is not supported`, {
            itemIndex: i,
          });
        }

        // Format output
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData as IDataObject | IDataObject[]),
          { itemData: { item: i } },
        );

        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: (error as Error).message }),
            { itemData: { item: i } },
          );
          returnData.push(...executionData);
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
