import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { createOperation } from './create.operation';
import { deleteOperation } from './delete.operation';

export const accountUserOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['accountUser'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Add a user to an account',
      action: 'Create account user',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Remove a user from an account',
      action: 'Delete account user',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'List all users in an account',
      action: 'Get account users',
    },
  ],
  default: 'getAll',
};

export const accountUserFields: INodeProperties[] = [
  ...getAllOperation,
  ...createOperation,
  ...deleteOperation,
];
