import type { INodeProperties } from 'n8n-workflow';
import { createOperation } from './create.operation';
import { getOperation } from './get.operation';
import { getAllOperation } from './getAll.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';
import { searchOperation } from './search.operation';
import { getConversationsOperation } from './getConversations.operation';
import { mergeOperation } from './merge.operation';
import { filterOperation } from './filter.operation';
import { addLabelsOperation } from './addLabels.operation';
import { listLabelsOperation } from './listLabels.operation';

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
      name: 'Add Labels',
      value: 'addLabels',
      description: 'Add labels to a contact',
      action: 'Add labels to contact',
    },
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
      name: 'Filter',
      value: 'filter',
      description: 'Filter contacts using advanced criteria',
      action: 'Filter contacts',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get a contact by ID',
      action: 'Get a contact',
    },
    {
      name: 'Get Conversations',
      value: 'getConversations',
      description: 'Get all conversations for a contact',
      action: 'Get contact conversations',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get many contacts',
      action: 'Get many contacts',
    },
    {
      name: 'List Labels',
      value: 'listLabels',
      description: 'Get all labels for a contact',
      action: 'List contact labels',
    },
    {
      name: 'Merge',
      value: 'merge',
      description: 'Merge two contacts into one',
      action: 'Merge contacts',
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
  ...getConversationsOperation,
  ...mergeOperation,
  ...filterOperation,
  ...addLabelsOperation,
  ...listLabelsOperation,
];
