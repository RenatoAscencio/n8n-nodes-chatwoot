import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';

export const contactNoteOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['contactNote'] } },
  options: [
    { name: 'Create', value: 'create', description: 'Create a note on a contact', action: 'Create a contact note' },
    { name: 'Delete', value: 'delete', description: 'Delete a contact note', action: 'Delete a contact note' },
    { name: 'Get Many', value: 'getAll', description: 'Get all notes for a contact', action: 'Get many contact notes' },
    { name: 'Update', value: 'update', description: 'Update a contact note', action: 'Update a contact note' },
  ],
  default: 'getAll',
};

export const contactNoteFields: INodeProperties[] = [
  ...getAllOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
];
