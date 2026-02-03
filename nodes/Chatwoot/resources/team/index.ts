import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { getOperation } from './get.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';

export const teamOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['team'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new team',
      action: 'Create a team',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete a team',
      action: 'Delete a team',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get a team by ID',
      action: 'Get a team',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get all teams in the account',
      action: 'Get all teams',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update a team',
      action: 'Update a team',
    },
  ],
  default: 'getAll',
};

export const teamFields: INodeProperties[] = [
  ...getAllOperation,
  ...getOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
];
