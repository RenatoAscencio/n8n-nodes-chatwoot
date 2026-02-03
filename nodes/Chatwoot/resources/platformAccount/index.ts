import type { INodeProperties } from 'n8n-workflow';
import { createOperation } from './create.operation';
import { getOperation } from './get.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';

export const platformAccountOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['platformAccount'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new account',
      action: 'Create account',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete an account',
      action: 'Delete account',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get account details',
      action: 'Get account',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update an account',
      action: 'Update account',
    },
  ],
  default: 'get',
};

export const platformAccountFields: INodeProperties[] = [
  ...createOperation,
  ...getOperation,
  ...updateOperation,
  ...deleteOperation,
];
