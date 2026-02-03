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
  getAgents,
  getTeams,
  getInboxes,
  getLabels,
} from './GenericFunctions';

// Resource imports
import { accountOperations, accountFields } from './resources/account';
import { agentOperations, agentFields } from './resources/agent';
import { teamOperations, teamFields } from './resources/team';
import { inboxOperations, inboxFields } from './resources/inbox';
import { labelOperations, labelFields } from './resources/label';
import { cannedResponseOperations, cannedResponseFields } from './resources/cannedResponse';
import { customAttributeOperations, customAttributeFields } from './resources/customAttribute';
import { webhookOperations, webhookFields } from './resources/webhook';
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
    description: 'Interact with Chatwoot API to manage conversations, messages, contacts, and more',
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
          { name: 'Account', value: 'account' },
          { name: 'Agent', value: 'agent' },
          { name: 'Canned Response', value: 'cannedResponse' },
          { name: 'Contact', value: 'contact' },
          { name: 'Conversation', value: 'conversation' },
          { name: 'Custom Attribute', value: 'customAttribute' },
          { name: 'Inbox', value: 'inbox' },
          { name: 'Label', value: 'label' },
          { name: 'Message', value: 'message' },
          { name: 'Team', value: 'team' },
          { name: 'Webhook', value: 'webhook' },
        ],
        default: 'conversation',
      },
      // Operations
      accountOperations,
      agentOperations,
      teamOperations,
      inboxOperations,
      labelOperations,
      cannedResponseOperations,
      customAttributeOperations,
      webhookOperations,
      conversationOperations,
      messageOperations,
      contactOperations,
      // Fields
      ...accountFields,
      ...agentFields,
      ...teamFields,
      ...inboxFields,
      ...labelFields,
      ...cannedResponseFields,
      ...customAttributeFields,
      ...webhookFields,
      ...conversationFields,
      ...messageFields,
      ...contactFields,
    ],
  };

  methods = {
    loadOptions: {
      getAgents,
      getTeams,
      getInboxes,
      getLabels,
    },
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
        // ACCOUNT
        // =====================================================================
        if (resource === 'account') {
          if (operation === 'get') {
            responseData = await chatwootApiRequest.call(this, 'GET', '');
          } else if (operation === 'update') {
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
            const body: IDataObject = {};

            if (updateFields.name) body.name = updateFields.name;
            if (updateFields.locale) body.locale = updateFields.locale;
            if (updateFields.domain) body.domain = updateFields.domain;
            if (updateFields.support_email) body.support_email = updateFields.support_email;
            if (updateFields.auto_resolve_duration !== undefined) {
              body.auto_resolve_duration = updateFields.auto_resolve_duration;
            }

            responseData = await chatwootApiRequest.call(this, 'PATCH', '', body);
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // AGENT
        // =====================================================================
        else if (resource === 'agent') {
          if (operation === 'getAll') {
            responseData = await chatwootApiRequest.call(this, 'GET', '/agents');
          } else if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            const email = this.getNodeParameter('email', i) as string;
            const role = this.getNodeParameter('role', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = { name, email, role };

            if (additionalFields.availability_status) {
              body.availability_status = additionalFields.availability_status;
            }
            if (additionalFields.auto_offline !== undefined) {
              body.auto_offline = additionalFields.auto_offline;
            }

            responseData = await chatwootApiRequest.call(this, 'POST', '/agents', body);
          } else if (operation === 'update') {
            const agentId = validateId(this.getNodeParameter('agentId', i), 'Agent ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = {};
            if (updateFields.name) body.name = updateFields.name;
            if (updateFields.role) body.role = updateFields.role;
            if (updateFields.availability_status) body.availability_status = updateFields.availability_status;
            if (updateFields.auto_offline !== undefined) body.auto_offline = updateFields.auto_offline;

            responseData = await chatwootApiRequest.call(this, 'PATCH', `/agents/${agentId}`, body);
          } else if (operation === 'delete') {
            const agentId = validateId(this.getNodeParameter('agentId', i), 'Agent ID');
            await chatwootApiRequest.call(this, 'DELETE', `/agents/${agentId}`);
            responseData = { success: true, id: agentId };
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // TEAM
        // =====================================================================
        else if (resource === 'team') {
          if (operation === 'getAll') {
            responseData = await chatwootApiRequest.call(this, 'GET', '/teams');
          } else if (operation === 'get') {
            const teamId = validateId(this.getNodeParameter('teamId', i), 'Team ID');
            responseData = await chatwootApiRequest.call(this, 'GET', `/teams/${teamId}`);
          } else if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = { name };
            if (additionalFields.description) body.description = additionalFields.description;
            if (additionalFields.allow_auto_assign !== undefined) {
              body.allow_auto_assign = additionalFields.allow_auto_assign;
            }

            responseData = await chatwootApiRequest.call(this, 'POST', '/teams', body);
          } else if (operation === 'update') {
            const teamId = validateId(this.getNodeParameter('teamId', i), 'Team ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = {};
            if (updateFields.name) body.name = updateFields.name;
            if (updateFields.description) body.description = updateFields.description;
            if (updateFields.allow_auto_assign !== undefined) body.allow_auto_assign = updateFields.allow_auto_assign;

            responseData = await chatwootApiRequest.call(this, 'PATCH', `/teams/${teamId}`, body);
          } else if (operation === 'delete') {
            const teamId = validateId(this.getNodeParameter('teamId', i), 'Team ID');
            await chatwootApiRequest.call(this, 'DELETE', `/teams/${teamId}`);
            responseData = { success: true, id: teamId };
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // INBOX
        // =====================================================================
        else if (resource === 'inbox') {
          if (operation === 'getAll') {
            const response = await chatwootApiRequest.call(this, 'GET', '/inboxes');
            responseData = ((response as IDataObject).payload || response) as IDataObject[];
          } else if (operation === 'get') {
            const inboxId = validateId(this.getNodeParameter('inboxId', i), 'Inbox ID');
            responseData = await chatwootApiRequest.call(this, 'GET', `/inboxes/${inboxId}`);
          } else if (operation === 'update') {
            const inboxId = validateId(this.getNodeParameter('inboxId', i), 'Inbox ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = { ...updateFields };
            responseData = await chatwootApiRequest.call(this, 'PATCH', `/inboxes/${inboxId}`, body);
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // LABEL
        // =====================================================================
        else if (resource === 'label') {
          if (operation === 'getAll') {
            const response = await chatwootApiRequest.call(this, 'GET', '/labels');
            responseData = ((response as IDataObject).payload || response) as IDataObject[];
          } else if (operation === 'create') {
            const title = this.getNodeParameter('title', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = { title };
            if (additionalFields.description) body.description = additionalFields.description;
            if (additionalFields.color) body.color = additionalFields.color;
            if (additionalFields.show_on_sidebar !== undefined) {
              body.show_on_sidebar = additionalFields.show_on_sidebar;
            }

            responseData = await chatwootApiRequest.call(this, 'POST', '/labels', body);
          } else if (operation === 'update') {
            const labelId = validateId(this.getNodeParameter('labelId', i), 'Label ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = { ...updateFields };
            responseData = await chatwootApiRequest.call(this, 'PATCH', `/labels/${labelId}`, body);
          } else if (operation === 'delete') {
            const labelId = validateId(this.getNodeParameter('labelId', i), 'Label ID');
            await chatwootApiRequest.call(this, 'DELETE', `/labels/${labelId}`);
            responseData = { success: true, id: labelId };
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // CANNED RESPONSE
        // =====================================================================
        else if (resource === 'cannedResponse') {
          if (operation === 'getAll') {
            const options = this.getNodeParameter('options', i) as IDataObject;
            const qs: IDataObject = {};
            if (options.search) qs.search = options.search;

            responseData = await chatwootApiRequest.call(this, 'GET', '/canned_responses', {}, qs);
          } else if (operation === 'create') {
            const shortCode = this.getNodeParameter('shortCode', i) as string;
            const content = this.getNodeParameter('content', i) as string;

            const body: IDataObject = { short_code: shortCode, content };
            responseData = await chatwootApiRequest.call(this, 'POST', '/canned_responses', body);
          } else if (operation === 'update') {
            const cannedResponseId = validateId(this.getNodeParameter('cannedResponseId', i), 'Canned Response ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = { ...updateFields };
            responseData = await chatwootApiRequest.call(this, 'PATCH', `/canned_responses/${cannedResponseId}`, body);
          } else if (operation === 'delete') {
            const cannedResponseId = validateId(this.getNodeParameter('cannedResponseId', i), 'Canned Response ID');
            await chatwootApiRequest.call(this, 'DELETE', `/canned_responses/${cannedResponseId}`);
            responseData = { success: true, id: cannedResponseId };
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // CUSTOM ATTRIBUTE
        // =====================================================================
        else if (resource === 'customAttribute') {
          if (operation === 'getAll') {
            const attributeModel = this.getNodeParameter('attributeModel', i) as string;
            const qs: IDataObject = { attribute_model: attributeModel };
            responseData = await chatwootApiRequest.call(this, 'GET', '/custom_attribute_definitions', {}, qs);
          } else if (operation === 'get') {
            const customAttributeId = validateId(this.getNodeParameter('customAttributeId', i), 'Custom Attribute ID');
            responseData = await chatwootApiRequest.call(this, 'GET', `/custom_attribute_definitions/${customAttributeId}`);
          } else if (operation === 'create') {
            const attributeDisplayName = this.getNodeParameter('attributeDisplayName', i) as string;
            const attributeKey = this.getNodeParameter('attributeKey', i) as string;
            const attributeModel = this.getNodeParameter('attributeModel', i) as string;
            const attributeDisplayType = this.getNodeParameter('attributeDisplayType', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = {
              attribute_display_name: attributeDisplayName,
              attribute_key: attributeKey,
              attribute_model: attributeModel,
              attribute_display_type: attributeDisplayType,
            };

            if (additionalFields.attribute_description) {
              body.attribute_description = additionalFields.attribute_description;
            }
            if (additionalFields.default_value) body.default_value = additionalFields.default_value;
            if (additionalFields.attribute_values) {
              body.attribute_values = (additionalFields.attribute_values as string).split(',').map(v => v.trim());
            }

            responseData = await chatwootApiRequest.call(this, 'POST', '/custom_attribute_definitions', body);
          } else if (operation === 'update') {
            const customAttributeId = validateId(this.getNodeParameter('customAttributeId', i), 'Custom Attribute ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = {};
            if (updateFields.attribute_display_name) body.attribute_display_name = updateFields.attribute_display_name;
            if (updateFields.attribute_description) body.attribute_description = updateFields.attribute_description;
            if (updateFields.default_value) body.default_value = updateFields.default_value;
            if (updateFields.attribute_values) {
              body.attribute_values = (updateFields.attribute_values as string).split(',').map(v => v.trim());
            }

            responseData = await chatwootApiRequest.call(this, 'PATCH', `/custom_attribute_definitions/${customAttributeId}`, body);
          } else if (operation === 'delete') {
            const customAttributeId = validateId(this.getNodeParameter('customAttributeId', i), 'Custom Attribute ID');
            await chatwootApiRequest.call(this, 'DELETE', `/custom_attribute_definitions/${customAttributeId}`);
            responseData = { success: true, id: customAttributeId };
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // WEBHOOK
        // =====================================================================
        else if (resource === 'webhook') {
          if (operation === 'getAll') {
            responseData = await chatwootApiRequest.call(this, 'GET', '/webhooks');
          } else if (operation === 'create') {
            const url = this.getNodeParameter('url', i) as string;
            const subscriptions = this.getNodeParameter('subscriptions', i) as string[];

            const body: IDataObject = { url, subscriptions };
            responseData = await chatwootApiRequest.call(this, 'POST', '/webhooks', body);
          } else if (operation === 'update') {
            const webhookId = validateId(this.getNodeParameter('webhookId', i), 'Webhook ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = { ...updateFields };
            responseData = await chatwootApiRequest.call(this, 'PATCH', `/webhooks/${webhookId}`, body);
          } else if (operation === 'delete') {
            const webhookId = validateId(this.getNodeParameter('webhookId', i), 'Webhook ID');
            await chatwootApiRequest.call(this, 'DELETE', `/webhooks/${webhookId}`);
            responseData = { success: true, id: webhookId };
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // CONVERSATION
        // =====================================================================
        else if (resource === 'conversation') {
          if (operation === 'get') {
            const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
            responseData = await chatwootApiRequest.call(this, 'GET', `/conversations/${conversationId}`);
          } else if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const filters = this.getNodeParameter('filters', i) as IDataObject;

            const qs: IDataObject = {};
            if (filters.status && filters.status !== 'all') qs.status = filters.status;
            if (filters.assignee_type && filters.assignee_type !== 'all') qs.assignee_type = filters.assignee_type;
            if (filters.inbox_id) qs.inbox_id = filters.inbox_id;
            if (filters.team_id) qs.team_id = filters.team_id;
            if (filters.labels) qs.labels = (filters.labels as string).split(',').map(l => l.trim());
            if (filters.q) qs.q = filters.q;

            if (returnAll) {
              responseData = await chatwootApiRequestAllItems.call(this, 'GET', '/conversations', {}, qs, 'payload');
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              qs.page = 1;
              const result = await chatwootApiRequest.call(this, 'GET', '/conversations', {}, qs) as IDataObject;
              const payload = (result.payload || []) as IDataObject[];
              responseData = payload.slice(0, limit);
            }
          } else if (operation === 'updateStatus') {
            const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
            const status = this.getNodeParameter('status', i) as string;

            const body: IDataObject = { status };
            if (status === 'snoozed') {
              const snoozedUntil = this.getNodeParameter('snoozed_until', i, '') as string;
              if (snoozedUntil) {
                body.snoozed_until = Math.floor(new Date(snoozedUntil).getTime() / 1000);
              }
            }

            responseData = await chatwootApiRequest.call(this, 'POST', `/conversations/${conversationId}/toggle_status`, body);
          } else if (operation === 'assign') {
            const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
            const assignmentType = this.getNodeParameter('assignmentType', i) as string;

            const body: IDataObject = {};
            if (assignmentType === 'agent') {
              body.assignee_id = validateId(this.getNodeParameter('assigneeId', i), 'Agent ID');
            } else if (assignmentType === 'team') {
              body.team_id = validateId(this.getNodeParameter('teamId', i), 'Team ID');
            } else if (assignmentType === 'unassign') {
              body.assignee_id = null;
            }

            responseData = await chatwootApiRequest.call(this, 'POST', `/conversations/${conversationId}/assignments`, body);
          } else if (operation === 'addLabels') {
            const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
            const labels = this.getNodeParameter('labels', i) as string[];

            const body: IDataObject = { labels };
            responseData = await chatwootApiRequest.call(this, 'POST', `/conversations/${conversationId}/labels`, body);
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // MESSAGE
        // =====================================================================
        else if (resource === 'message') {
          if (operation === 'create') {
            const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
            const content = this.getNodeParameter('content', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;

            const body: IDataObject = { content };
            if (options.message_type) body.message_type = options.message_type;
            if (options.private !== undefined) body.private = options.private;
            if (options.content_type) body.content_type = options.content_type;

            responseData = await chatwootApiRequest.call(this, 'POST', `/conversations/${conversationId}/messages`, body);
          } else if (operation === 'getAll') {
            const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;

            if (returnAll) {
              responseData = await chatwootApiRequestAllMessages.call(this, conversationId);
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              responseData = await chatwootApiRequestAllMessages.call(this, conversationId, limit);
            }
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // CONTACT
        // =====================================================================
        else if (resource === 'contact') {
          if (operation === 'create') {
            const inboxId = validateId(this.getNodeParameter('inboxId', i), 'Inbox ID');
            const name = this.getNodeParameter('name', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = { inbox_id: inboxId };
            if (name) body.name = name;
            if (additionalFields.email) body.email = additionalFields.email;
            if (additionalFields.phone_number) body.phone_number = additionalFields.phone_number;
            if (additionalFields.identifier) body.identifier = additionalFields.identifier;
            if (additionalFields.custom_attributes) {
              body.custom_attributes = typeof additionalFields.custom_attributes === 'string'
                ? JSON.parse(additionalFields.custom_attributes)
                : additionalFields.custom_attributes;
            }

            responseData = await chatwootApiRequest.call(this, 'POST', '/contacts', body);
          } else if (operation === 'get') {
            const contactId = validateId(this.getNodeParameter('contactId', i), 'Contact ID');
            responseData = await chatwootApiRequest.call(this, 'GET', `/contacts/${contactId}`);
          } else if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const options = this.getNodeParameter('options', i) as IDataObject;

            const qs: IDataObject = {};
            if (options.sort) qs.sort = options.sort;

            if (returnAll) {
              responseData = await chatwootApiRequestAllItems.call(this, 'GET', '/contacts', {}, qs, 'payload');
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              qs.page = 1;
              const result = await chatwootApiRequest.call(this, 'GET', '/contacts', {}, qs) as IDataObject;
              const payload = (result.payload || []) as IDataObject[];
              responseData = payload.slice(0, limit);
            }
          } else if (operation === 'update') {
            const contactId = validateId(this.getNodeParameter('contactId', i), 'Contact ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = {};
            if (updateFields.name) body.name = updateFields.name;
            if (updateFields.email) body.email = updateFields.email;
            if (updateFields.phone_number) body.phone_number = updateFields.phone_number;
            if (updateFields.identifier) body.identifier = updateFields.identifier;
            if (updateFields.avatar_url) body.avatar_url = updateFields.avatar_url;
            if (updateFields.blocked !== undefined) body.blocked = updateFields.blocked;
            if (updateFields.custom_attributes) {
              body.custom_attributes = typeof updateFields.custom_attributes === 'string'
                ? JSON.parse(updateFields.custom_attributes)
                : updateFields.custom_attributes;
            }

            responseData = await chatwootApiRequest.call(this, 'PUT', `/contacts/${contactId}`, body);
          } else if (operation === 'delete') {
            const contactId = validateId(this.getNodeParameter('contactId', i), 'Contact ID');
            await chatwootApiRequest.call(this, 'DELETE', `/contacts/${contactId}`);
            responseData = { success: true, id: contactId };
          } else if (operation === 'search') {
            const query = this.getNodeParameter('query', i) as string;
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const options = this.getNodeParameter('options', i) as IDataObject;

            const qs: IDataObject = { q: query };
            if (options.sort) qs.sort = options.sort;

            if (returnAll) {
              responseData = await chatwootApiRequestAllItems.call(this, 'GET', '/contacts/search', {}, qs, 'payload');
            } else {
              const limit = this.getNodeParameter('limit', i) as number;
              qs.page = 1;
              const result = await chatwootApiRequest.call(this, 'GET', '/contacts/search', {}, qs) as IDataObject;
              const payload = (result.payload || []) as IDataObject[];
              responseData = payload.slice(0, limit);
            }
          } else if (operation === 'getConversations') {
            const contactId = validateId(this.getNodeParameter('contactId', i), 'Contact ID');
            const response = await chatwootApiRequest.call(this, 'GET', `/contacts/${contactId}/conversations`);
            responseData = ((response as IDataObject).payload || response) as IDataObject[];
          } else if (operation === 'merge') {
            const baseContactId = validateId(this.getNodeParameter('baseContactId', i), 'Base Contact ID');
            const mergeeContactId = validateId(this.getNodeParameter('mergeeContactId', i), 'Merge Contact ID');

            const body: IDataObject = {
              base_contact_id: baseContactId,
              mergee_contact_id: mergeeContactId,
            };

            responseData = await chatwootApiRequest.call(this, 'POST', '/actions/contact_merge', body);
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        } else {
          throw new NodeOperationError(this.getNode(), `Resource "${resource}" is not supported`, { itemIndex: i });
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
