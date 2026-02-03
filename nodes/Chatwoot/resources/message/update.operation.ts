import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['update'],
      },
    },
    description: 'ID of the conversation containing the message',
  },
  {
    displayName: 'Message ID',
    name: 'messageId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['update'],
      },
    },
    description: 'ID of the message to update',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    typeOptions: {
      rows: 4,
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['update'],
      },
    },
    description: 'New message content',
  },
];
