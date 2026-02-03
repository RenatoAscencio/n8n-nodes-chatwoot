import type { INodeProperties } from 'n8n-workflow';

export const getOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['csatSurvey'],
        operation: ['get'],
      },
    },
    description: 'ID of the conversation to get CSAT survey for',
  },
];
