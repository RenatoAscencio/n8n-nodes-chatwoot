import type { INodeProperties } from 'n8n-workflow';

export const getOperation: INodeProperties[] = [
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['platformUser'],
        operation: ['get'],
      },
    },
    description: 'ID of the user to retrieve',
  },
];
