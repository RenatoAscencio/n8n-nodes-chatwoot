import type { INodeProperties } from 'n8n-workflow';
import { getOperation } from './get.operation';
import { getAllOperation } from './getAll.operation';
import { updateStatusOperation } from './updateStatus.operation';

export const conversationOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['conversation'],
    },
  },
  options: [
    {
      name: 'Get',
      value: 'get',
      description: 'Get a conversation by ID',
      action: 'Get a conversation',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get many conversations with optional filters',
      action: 'Get many conversations',
    },
    {
      name: 'Update Status',
      value: 'updateStatus',
      description: 'Update conversation status (open, resolved, pending, snoozed)',
      action: 'Update conversation status',
    },
  ],
  default: 'getAll',
};

export const conversationFields: INodeProperties[] = [
  ...getOperation,
  ...getAllOperation,
  ...updateStatusOperation,
];
