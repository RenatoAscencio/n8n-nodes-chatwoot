import type { INodeProperties } from 'n8n-workflow';

export const getSsoUrlOperation: INodeProperties[] = [
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['platformUser'],
        operation: ['getSsoUrl'],
      },
    },
    description: 'ID of the user to get SSO URL for',
  },
];
