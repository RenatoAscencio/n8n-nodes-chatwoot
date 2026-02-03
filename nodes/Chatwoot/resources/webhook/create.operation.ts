import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Webhook URL',
    name: 'url',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'https://your-server.com/webhook',
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['create'],
      },
    },
    description: 'URL where webhook events will be sent',
  },
  {
    displayName: 'Subscriptions',
    name: 'subscriptions',
    type: 'multiOptions',
    required: true,
    options: [
      {
        name: 'Contact Created',
        value: 'contact_created',
        description: 'Triggered when a new contact is created',
      },
      {
        name: 'Contact Updated',
        value: 'contact_updated',
        description: 'Triggered when a contact is updated',
      },
      {
        name: 'Conversation Created',
        value: 'conversation_created',
        description: 'Triggered when a new conversation is created',
      },
      {
        name: 'Conversation Status Changed',
        value: 'conversation_status_changed',
        description: 'Triggered when conversation status changes (open, resolved, pending, snoozed)',
      },
      {
        name: 'Conversation Updated',
        value: 'conversation_updated',
        description: 'Triggered when a conversation is updated',
      },
      {
        name: 'Message Created',
        value: 'message_created',
        description: 'Triggered when a new message is sent',
      },
      {
        name: 'Message Updated',
        value: 'message_updated',
        description: 'Triggered when a message is updated',
      },
      {
        name: 'Webwidget Triggered',
        value: 'webwidget_triggered',
        description: 'Triggered when chat widget is opened',
      },
    ],
    default: ['message_created'],
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['create'],
      },
    },
    description: 'Events that will trigger this webhook',
  },
];
