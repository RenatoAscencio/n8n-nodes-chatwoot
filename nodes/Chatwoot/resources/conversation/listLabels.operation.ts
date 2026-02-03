import type { INodeProperties } from 'n8n-workflow';

export const listLabelsOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['listLabels'],
      },
    },
    description: 'ID of the conversation to get labels from',
  },
];
