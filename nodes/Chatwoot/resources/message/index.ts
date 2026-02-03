import type { INodeProperties } from 'n8n-workflow';
import { createOperation } from './create.operation';
import { getAllOperation } from './getAll.operation';

export const messageOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['message'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Send a message to a conversation',
      action: 'Send a message',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get messages from a conversation',
      action: 'Get messages from conversation',
    },
  ],
  default: 'create',
};

export const messageFields: INodeProperties[] = [...createOperation, ...getAllOperation];
