import type { INodeProperties } from 'n8n-workflow';
import { getOperation } from './get.operation';
import { getAllOperation } from './getAll.operation';
import { updateStatusOperation } from './updateStatus.operation';
import { assignOperation } from './assign.operation';
import { addLabelsOperation } from './addLabels.operation';
import { createOperation } from './create.operation';
import { togglePriorityOperation } from './togglePriority.operation';
import { updateOperation } from './update.operation';
import { filterOperation } from './filter.operation';
import { updateCustomAttributesOperation } from './updateCustomAttributes.operation';
import { listLabelsOperation } from './listLabels.operation';
import { getMetaOperation } from './getMeta.operation';

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
      name: 'Add Labels',
      value: 'addLabels',
      description: 'Set labels on a conversation',
      action: 'Add labels to a conversation',
    },
    {
      name: 'Assign',
      value: 'assign',
      description: 'Assign conversation to an agent or team',
      action: 'Assign a conversation',
    },
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new conversation',
      action: 'Create a conversation',
    },
    {
      name: 'Filter',
      value: 'filter',
      description: 'Filter conversations using advanced criteria',
      action: 'Filter conversations',
    },
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
      name: 'Get Meta',
      value: 'getMeta',
      description: 'Get conversation metadata and counts',
      action: 'Get conversation metadata',
    },
    {
      name: 'List Labels',
      value: 'listLabels',
      description: 'Get all labels for a conversation',
      action: 'List conversation labels',
    },
    {
      name: 'Toggle Priority',
      value: 'togglePriority',
      description: 'Set conversation priority (urgent, high, medium, low, none)',
      action: 'Toggle conversation priority',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update conversation details',
      action: 'Update a conversation',
    },
    {
      name: 'Update Custom Attributes',
      value: 'updateCustomAttributes',
      description: 'Update conversation custom attributes',
      action: 'Update conversation custom attributes',
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
  ...assignOperation,
  ...addLabelsOperation,
  ...createOperation,
  ...togglePriorityOperation,
  ...updateOperation,
  ...filterOperation,
  ...updateCustomAttributesOperation,
  ...listLabelsOperation,
  ...getMetaOperation,
];
