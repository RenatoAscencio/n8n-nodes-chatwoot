import type { INodeProperties } from 'n8n-workflow';
import { getOperation } from './get.operation';
import { getAllOperation } from './getAll.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';
import { searchOperation } from './search.operation';

export const companyOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['company'] } },
  options: [
    { name: 'Create', value: 'create', description: 'Create a new company (Enterprise)', action: 'Create a company' },
    { name: 'Delete', value: 'delete', description: 'Delete a company (Enterprise)', action: 'Delete a company' },
    { name: 'Get', value: 'get', description: 'Get a company by ID (Enterprise)', action: 'Get a company' },
    { name: 'Get Many', value: 'getAll', description: 'Get all companies (Enterprise)', action: 'Get many companies' },
    { name: 'Search', value: 'search', description: 'Search companies by name or domain (Enterprise)', action: 'Search companies' },
    { name: 'Update', value: 'update', description: 'Update a company (Enterprise)', action: 'Update a company' },
  ],
  default: 'getAll',
};

export const companyFields: INodeProperties[] = [
  ...getOperation,
  ...getAllOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
  ...searchOperation,
];
