import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
  {
    displayName: 'Canned Response ID',
    name: 'cannedResponseId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
        operation: ['delete'],
      },
    },
    description: 'ID of the canned response to delete',
  },
];
