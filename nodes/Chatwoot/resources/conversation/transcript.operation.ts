import type { INodeProperties } from 'n8n-workflow';

export const transcriptOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['transcript'],
      },
    },
    description: 'The ID of the conversation',
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['transcript'],
      },
    },
    description: 'Email address to send the transcript to',
  },
];
