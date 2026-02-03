import type { INodeProperties } from 'n8n-workflow';
import { createOperation } from './create.operation';
import { getOperation } from './get.operation';
import { updateOperation } from './update.operation';

export const publicContactOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['publicContact'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new contact via public API',
      action: 'Create public contact',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get contact details',
      action: 'Get public contact',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update contact details',
      action: 'Update public contact',
    },
  ],
  default: 'create',
};

export const publicContactFields: INodeProperties[] = [
  ...createOperation,
  ...getOperation,
  ...updateOperation,
];
