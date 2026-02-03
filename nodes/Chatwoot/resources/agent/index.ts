import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';

export const agentOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['agent'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new agent',
      action: 'Create an agent',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete an agent',
      action: 'Delete an agent',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get all agents in the account',
      action: 'Get all agents',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update an agent',
      action: 'Update an agent',
    },
  ],
  default: 'getAll',
};

export const agentFields: INodeProperties[] = [
  ...getAllOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
];
