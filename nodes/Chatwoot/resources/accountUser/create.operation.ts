import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Account ID',
    name: 'accountId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['accountUser'],
        operation: ['create'],
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
        operation: ['create'],
      },
    },
    description: 'ID of the user to add to the account',
  },
  {
    displayName: 'Role',
    name: 'role',
    type: 'options',
    required: true,
    options: [
      { name: 'Administrator', value: 'administrator' },
      { name: 'Agent', value: 'agent' },
    ],
    default: 'agent',
    displayOptions: {
      show: {
        resource: ['accountUser'],
        operation: ['create'],
      },
    },
    description: 'Role of the user in the account',
  },
];
