import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
  {
    displayName: 'Account ID',
    name: 'accountId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['accountUser'],
        operation: ['delete'],
      },
    },
    description: 'ID of the account',
  },
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['accountUser'],
        operation: ['delete'],
      },
    },
    description: 'ID of the user to remove from the account',
  },
];
