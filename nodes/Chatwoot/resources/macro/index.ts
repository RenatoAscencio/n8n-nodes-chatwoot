import type { INodeProperties } from 'n8n-workflow';
import { getOperation } from './get.operation';
import { getAllOperation } from './getAll.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';
import { executeOperation } from './execute.operation';

export const macroOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['macro'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new macro',
      action: 'Create a macro',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete a macro',
      action: 'Delete a macro',
    },
    {
      name: 'Execute',
      value: 'execute',
      description: 'Execute a macro on a conversation',
      action: 'Execute a macro',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get a macro by ID',
      action: 'Get a macro',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get all macros',
      action: 'Get many macros',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update a macro',
      action: 'Update a macro',
    },
  ],
  default: 'getAll',
};

export const macroFields: INodeProperties[] = [
  ...getOperation,
  ...getAllOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
  ...executeOperation,
];
