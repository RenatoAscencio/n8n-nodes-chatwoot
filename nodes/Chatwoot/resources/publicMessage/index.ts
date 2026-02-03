import type { INodeProperties } from 'n8n-workflow';
import { createOperation } from './create.operation';
import { getAllOperation } from './getAll.operation';
import { updateOperation } from './update.operation';

export const publicMessageOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['publicMessage'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Send a message via public API',
      action: 'Create public message',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get messages from a conversation',
      action: 'Get public messages',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update a message',
      action: 'Update public message',
    },
  ],
  default: 'create',
};

export const publicMessageFields: INodeProperties[] = [
  ...createOperation,
  ...getAllOperation,
  ...updateOperation,
];
