import type { INodeProperties } from 'n8n-workflow';
import { getOperation } from './get.operation';
import { getAllOperation } from './getAll.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';

export const slaPolicyOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['slaPolicy'] } },
  options: [
    { name: 'Create', value: 'create', description: 'Create an SLA policy (Enterprise)', action: 'Create SLA policy' },
    { name: 'Delete', value: 'delete', description: 'Delete an SLA policy (Enterprise)', action: 'Delete SLA policy' },
    { name: 'Get', value: 'get', description: 'Get an SLA policy by ID (Enterprise)', action: 'Get SLA policy' },
    { name: 'Get Many', value: 'getAll', description: 'Get all SLA policies (Enterprise)', action: 'Get many SLA policies' },
    { name: 'Update', value: 'update', description: 'Update an SLA policy (Enterprise)', action: 'Update SLA policy' },
  ],
  default: 'getAll',
};

export const slaPolicyFields: INodeProperties[] = [
  ...getOperation,
  ...getAllOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
];
