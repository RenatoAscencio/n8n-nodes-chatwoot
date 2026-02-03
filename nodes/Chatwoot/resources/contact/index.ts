import type { INodeProperties } from 'n8n-workflow';
import { createOperation } from './create.operation';
import { getOperation } from './get.operation';
import { getAllOperation } from './getAll.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';
import { searchOperation } from './search.operation';

export const contactOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['contact'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new contact',
      action: 'Create a contact',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete a contact',
      action: 'Delete a contact',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get a contact by ID',
      action: 'Get a contact',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get many contacts',
      action: 'Get many contacts',
    },
    {
      name: 'Search',
      value: 'search',
      description: 'Search contacts by name, email, phone, or identifier',
      action: 'Search contacts',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update a contact',
      action: 'Update a contact',
    },
  ],
  default: 'getAll',
};

export const contactFields: INodeProperties[] = [
  ...createOperation,
  ...getOperation,
  ...getAllOperation,
  ...updateOperation,
  ...deleteOperation,
  ...searchOperation,
];
