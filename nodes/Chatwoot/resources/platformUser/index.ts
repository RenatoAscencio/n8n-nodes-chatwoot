import type { INodeProperties } from 'n8n-workflow';
import { createOperation } from './create.operation';
import { getOperation } from './get.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';
import { getSsoUrlOperation } from './getSsoUrl.operation';

export const platformUserOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['platformUser'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new user',
      action: 'Create user',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete a user',
      action: 'Delete user',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get user details',
      action: 'Get user',
    },
    {
      name: 'Get SSO URL',
      value: 'getSsoUrl',
      description: 'Get SSO login URL for a user',
      action: 'Get SSO URL',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update a user',
      action: 'Update user',
    },
  ],
  default: 'get',
};

export const platformUserFields: INodeProperties[] = [
  ...createOperation,
  ...getOperation,
  ...updateOperation,
  ...deleteOperation,
  ...getSsoUrlOperation,
];
