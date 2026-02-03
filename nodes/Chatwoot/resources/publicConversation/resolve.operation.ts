import type { INodeProperties } from 'n8n-workflow';

export const resolveOperation: INodeProperties[] = [
  {
    displayName: 'Contact Identifier',
    name: 'contactIdentifier',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['publicConversation'],
        operation: ['resolve'],
      },
    },
    description: 'The source_id of the contact',
  },
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['publicConversation'],
        operation: ['resolve'],
      },
    },
    description: 'ID of the conversation to toggle resolved status',
  },
];
