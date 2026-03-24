import type { INodeProperties } from 'n8n-workflow';

export const unmuteOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['unmute'],
      },
    },
    description: 'The ID of the conversation to unmute',
  },
];
