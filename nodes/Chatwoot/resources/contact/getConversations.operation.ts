import type { INodeProperties } from 'n8n-workflow';

export const getConversationsOperation: INodeProperties[] = [
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['getConversations'],
      },
    },
    description: 'ID of the contact',
  },
];
