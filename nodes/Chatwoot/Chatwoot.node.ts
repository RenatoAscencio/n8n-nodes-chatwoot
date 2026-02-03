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
import { agentBotOperations, agentBotFields } from './resources/agentBot';
import { automationRuleOperations, automationRuleFields } from './resources/automationRule';
import { teamOperations, teamFields } from './resources/team';
import { inboxOperations, inboxFields } from './resources/inbox';
import { labelOperations, labelFields } from './resources/label';
import { cannedResponseOperations, cannedResponseFields } from './resources/cannedResponse';
import { customAttributeOperations, customAttributeFields } from './resources/customAttribute';
import { customFilterOperations, customFilterFields } from './resources/customFilter';
import { webhookOperations, webhookFields } from './resources/webhook';
import { conversationOperations, conversationFields } from './resources/conversation';
import { messageOperations, messageFields } from './resources/message';
import { contactOperations, contactFields } from './resources/contact';
import { reportOperations, reportFields } from './resources/report';

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
          { name: 'Agent Bot', value: 'agentBot' },
          { name: 'Automation Rule', value: 'automationRule' },
          { name: 'Canned Response', value: 'cannedResponse' },
          { name: 'Contact', value: 'contact' },
          { name: 'Conversation', value: 'conversation' },
          { name: 'Custom Attribute', value: 'customAttribute' },
          { name: 'Custom Filter', value: 'customFilter' },
          { name: 'Inbox', value: 'inbox' },
          { name: 'Label', value: 'label' },
          { name: 'Message', value: 'message' },
          { name: 'Report', value: 'report' },
          { name: 'Team', value: 'team' },
          { name: 'Webhook', value: 'webhook' },
        ],
        default: 'conversation',
      },
      // Operations
      accountOperations,
      agentOperations,
      agentBotOperations,
      automationRuleOperations,
      teamOperations,
      inboxOperations,
      labelOperations,
      cannedResponseOperations,
      customAttributeOperations,
      customFilterOperations,
      webhookOperations,
      conversationOperations,
      messageOperations,
      contactOperations,
      reportOperations,
      // Fields
      ...accountFields,
      ...agentFields,
      ...agentBotFields,
      ...automationRuleFields,
      ...teamFields,
      ...inboxFields,
      ...labelFields,
      ...cannedResponseFields,
      ...customAttributeFields,
      ...customFilterFields,
      ...webhookFields,
      ...conversationFields,
      ...messageFields,
      ...contactFields,
      ...reportFields,
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
          } else if (operation === 'create') {
            const sourceId = this.getNodeParameter('sourceId', i) as string;
            const inboxId = validateId(this.getNodeParameter('inboxId', i), 'Inbox ID');
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = {
              source_id: sourceId,
              inbox_id: inboxId,
            };
            if (additionalFields.contact_id) body.contact_id = additionalFields.contact_id;
            if (additionalFields.status) body.status = additionalFields.status;
            if (additionalFields.assignee_id) body.assignee_id = additionalFields.assignee_id;
            if (additionalFields.team_id) body.team_id = additionalFields.team_id;
            if (additionalFields.custom_attributes) {
              body.custom_attributes = JSON.parse(additionalFields.custom_attributes as string);
            }

            responseData = await chatwootApiRequest.call(this, 'POST', '/conversations', body);
          } else if (operation === 'togglePriority') {
            const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
            const priority = this.getNodeParameter('priority', i) as string;

            const body: IDataObject = { priority };
            responseData = await chatwootApiRequest.call(this, 'POST', `/conversations/${conversationId}/toggle_priority`, body);
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
          } else if (operation === 'delete') {
            const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
            const messageId = validateId(this.getNodeParameter('messageId', i), 'Message ID');
            await chatwootApiRequest.call(this, 'DELETE', `/conversations/${conversationId}/messages/${messageId}`);
            responseData = { success: true, id: messageId };
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
        }

        // =====================================================================
        // AGENT BOT
        // =====================================================================
        else if (resource === 'agentBot') {
          if (operation === 'getAll') {
            responseData = await chatwootApiRequest.call(this, 'GET', '/agent_bots');
          } else if (operation === 'get') {
            const agentBotId = validateId(this.getNodeParameter('agentBotId', i), 'Agent Bot ID');
            responseData = await chatwootApiRequest.call(this, 'GET', `/agent_bots/${agentBotId}`);
          } else if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = { name };
            if (additionalFields.description) body.description = additionalFields.description;
            if (additionalFields.outgoing_url) body.outgoing_url = additionalFields.outgoing_url;

            responseData = await chatwootApiRequest.call(this, 'POST', '/agent_bots', body);
          } else if (operation === 'update') {
            const agentBotId = validateId(this.getNodeParameter('agentBotId', i), 'Agent Bot ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = { ...updateFields };
            responseData = await chatwootApiRequest.call(this, 'PATCH', `/agent_bots/${agentBotId}`, body);
          } else if (operation === 'delete') {
            const agentBotId = validateId(this.getNodeParameter('agentBotId', i), 'Agent Bot ID');
            await chatwootApiRequest.call(this, 'DELETE', `/agent_bots/${agentBotId}`);
            responseData = { success: true, id: agentBotId };
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // AUTOMATION RULE
        // =====================================================================
        else if (resource === 'automationRule') {
          if (operation === 'getAll') {
            responseData = await chatwootApiRequest.call(this, 'GET', '/automation_rules');
          } else if (operation === 'get') {
            const automationRuleId = validateId(this.getNodeParameter('automationRuleId', i), 'Automation Rule ID');
            responseData = await chatwootApiRequest.call(this, 'GET', `/automation_rules/${automationRuleId}`);
          } else if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            const eventName = this.getNodeParameter('eventName', i) as string;
            const conditions = JSON.parse(this.getNodeParameter('conditions', i) as string);
            const actions = JSON.parse(this.getNodeParameter('actions', i) as string);
            const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

            const body: IDataObject = {
              name,
              event_name: eventName,
              conditions,
              actions,
            };
            if (additionalFields.description) body.description = additionalFields.description;
            if (additionalFields.active !== undefined) body.active = additionalFields.active;

            responseData = await chatwootApiRequest.call(this, 'POST', '/automation_rules', body);
          } else if (operation === 'update') {
            const automationRuleId = validateId(this.getNodeParameter('automationRuleId', i), 'Automation Rule ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = {};
            if (updateFields.name) body.name = updateFields.name;
            if (updateFields.description) body.description = updateFields.description;
            if (updateFields.active !== undefined) body.active = updateFields.active;
            if (updateFields.conditions) body.conditions = JSON.parse(updateFields.conditions as string);
            if (updateFields.actions) body.actions = JSON.parse(updateFields.actions as string);

            responseData = await chatwootApiRequest.call(this, 'PATCH', `/automation_rules/${automationRuleId}`, body);
          } else if (operation === 'delete') {
            const automationRuleId = validateId(this.getNodeParameter('automationRuleId', i), 'Automation Rule ID');
            await chatwootApiRequest.call(this, 'DELETE', `/automation_rules/${automationRuleId}`);
            responseData = { success: true, id: automationRuleId };
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // CUSTOM FILTER
        // =====================================================================
        else if (resource === 'customFilter') {
          if (operation === 'getAll') {
            const filterType = this.getNodeParameter('filterType', i) as string;
            responseData = await chatwootApiRequest.call(this, 'GET', '/custom_filters', {}, { filter_type: filterType });
          } else if (operation === 'get') {
            const customFilterId = validateId(this.getNodeParameter('customFilterId', i), 'Custom Filter ID');
            responseData = await chatwootApiRequest.call(this, 'GET', `/custom_filters/${customFilterId}`);
          } else if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            const filterType = this.getNodeParameter('filterType', i) as string;
            const query = JSON.parse(this.getNodeParameter('query', i) as string);

            const body: IDataObject = {
              name,
              filter_type: filterType,
              query,
            };

            responseData = await chatwootApiRequest.call(this, 'POST', '/custom_filters', body);
          } else if (operation === 'update') {
            const customFilterId = validateId(this.getNodeParameter('customFilterId', i), 'Custom Filter ID');
            const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

            const body: IDataObject = {};
            if (updateFields.name) body.name = updateFields.name;
            if (updateFields.query) body.query = JSON.parse(updateFields.query as string);

            responseData = await chatwootApiRequest.call(this, 'PATCH', `/custom_filters/${customFilterId}`, body);
          } else if (operation === 'delete') {
            const customFilterId = validateId(this.getNodeParameter('customFilterId', i), 'Custom Filter ID');
            await chatwootApiRequest.call(this, 'DELETE', `/custom_filters/${customFilterId}`);
            responseData = { success: true, id: customFilterId };
          } else {
            throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
          }
        }

        // =====================================================================
        // REPORT
        // =====================================================================
        else if (resource === 'report') {
          const qs: IDataObject = {};

          if (operation === 'accountSummary') {
            const since = new Date(this.getNodeParameter('since', i) as string).getTime() / 1000;
            const until = new Date(this.getNodeParameter('until', i) as string).getTime() / 1000;
            const metric = this.getNodeParameter('metric', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;

            qs.since = since;
            qs.until = until;
            qs.metric = metric;
            if (options.type) qs.type = options.type;
            if (options.id) qs.id = options.id;
            if (options.timezone_offset) qs.timezone_offset = options.timezone_offset;

            responseData = await chatwootApiRequest.call(this, 'GET', '/reports/summary', {}, qs);
          } else if (operation === 'agentStatistics') {
            const since = new Date(this.getNodeParameter('since', i) as string).getTime() / 1000;
            const until = new Date(this.getNodeParameter('until', i) as string).getTime() / 1000;
            const options = this.getNodeParameter('options', i) as IDataObject;

            qs.since = since;
            qs.until = until;
            if (options.timezone_offset) qs.timezone_offset = options.timezone_offset;

            responseData = await chatwootApiRequest.call(this, 'GET', '/reports/agents', {}, qs);
          } else if (operation === 'conversationCounts') {
            responseData = await chatwootApiRequest.call(this, 'GET', '/conversations/meta');
          } else if (operation === 'conversationStatistics') {
            const since = new Date(this.getNodeParameter('since', i) as string).getTime() / 1000;
            const until = new Date(this.getNodeParameter('until', i) as string).getTime() / 1000;
            const groupBy = this.getNodeParameter('groupBy', i) as string;
            const options = this.getNodeParameter('options', i) as IDataObject;

            qs.since = since;
            qs.until = until;
            if (options.timezone_offset) qs.timezone_offset = options.timezone_offset;

            let endpoint = '/reports';
            if (groupBy === 'agent') endpoint = '/reports/conversations';
            else if (groupBy === 'inbox') endpoint = '/reports/inboxes';
            else if (groupBy === 'team') endpoint = '/reports/teams';
            else if (groupBy === 'channel_type') endpoint = '/reports/conversations';

            qs.type = groupBy;
            responseData = await chatwootApiRequest.call(this, 'GET', endpoint, {}, qs);
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
