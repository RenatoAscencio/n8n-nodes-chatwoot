import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['contactNote'], operation: ['delete'] } },
    description: 'The ID of the contact',
  },
  {
    displayName: 'Note ID',
    name: 'noteId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['contactNote'], operation: ['delete'] } },
    description: 'The ID of the note to delete',
  },
];
