import type { INodeProperties } from 'n8n-workflow';
import { getOperation } from './get.operation';
import { getAllOperation } from './getAll.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';

export const campaignOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['campaign'] } },
  options: [
    { name: 'Create', value: 'create', description: 'Create a new campaign', action: 'Create a campaign' },
    { name: 'Delete', value: 'delete', description: 'Delete a campaign', action: 'Delete a campaign' },
    { name: 'Get', value: 'get', description: 'Get a campaign by ID', action: 'Get a campaign' },
    { name: 'Get Many', value: 'getAll', description: 'Get all campaigns', action: 'Get many campaigns' },
    { name: 'Update', value: 'update', description: 'Update a campaign', action: 'Update a campaign' },
  ],
  default: 'getAll',
};

export const campaignFields: INodeProperties[] = [
  ...getOperation,
  ...getAllOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
];
