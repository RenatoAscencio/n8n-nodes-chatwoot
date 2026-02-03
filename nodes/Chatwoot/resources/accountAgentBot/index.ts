import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { getOperation } from './get.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';

export const accountAgentBotOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['accountAgentBot'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create an agent bot for an account',
      action: 'Create account agent bot',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete an agent bot from an account',
      action: 'Delete account agent bot',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get an agent bot by ID',
      action: 'Get account agent bot',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'List all agent bots for an account',
      action: 'Get account agent bots',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update an agent bot',
      action: 'Update account agent bot',
    },
  ],
  default: 'getAll',
};

export const accountAgentBotFields: INodeProperties[] = [
  ...getAllOperation,
  ...getOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
];
