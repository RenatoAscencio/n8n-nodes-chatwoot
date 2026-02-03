import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { getOperation } from './get.operation';
import { updateOperation } from './update.operation';

export const inboxOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['inbox'],
    },
  },
  options: [
    {
      name: 'Get',
      value: 'get',
      description: 'Get an inbox by ID',
      action: 'Get an inbox',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get all inboxes in the account',
      action: 'Get all inboxes',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update inbox settings',
      action: 'Update an inbox',
    },
  ],
  default: 'getAll',
};

export const inboxFields: INodeProperties[] = [
  ...getAllOperation,
  ...getOperation,
  ...updateOperation,
];
