import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Webhook ID',
    name: 'webhookId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['update'],
      },
    },
    description: 'ID of the webhook to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Webhook URL',
        name: 'url',
        type: 'string',
        default: '',
        description: 'URL where webhook events will be sent',
      },
      {
        displayName: 'Subscriptions',
        name: 'subscriptions',
        type: 'multiOptions',
        options: [
          { name: 'Contact Created', value: 'contact_created' },
          { name: 'Contact Updated', value: 'contact_updated' },
          { name: 'Conversation Created', value: 'conversation_created' },
          { name: 'Conversation Status Changed', value: 'conversation_status_changed' },
          { name: 'Conversation Updated', value: 'conversation_updated' },
          { name: 'Message Created', value: 'message_created' },
          { name: 'Message Updated', value: 'message_updated' },
          { name: 'Webwidget Triggered', value: 'webwidget_triggered' },
        ],
        default: [],
        description: 'Events that will trigger this webhook',
      },
    ],
  },
];
