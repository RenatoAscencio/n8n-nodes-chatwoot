import type { INodeProperties } from 'n8n-workflow';
import { getOperation } from './get.operation';
import { updateOperation } from './update.operation';

export const accountOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['account'],
    },
  },
  options: [
    {
      name: 'Get',
      value: 'get',
      description: 'Get account details',
      action: 'Get account details',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update account settings',
      action: 'Update account settings',
    },
  ],
  default: 'get',
};

export const accountFields: INodeProperties[] = [
  ...getOperation,
  ...updateOperation,
];
