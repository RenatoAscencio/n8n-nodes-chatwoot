import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['contactNote'], operation: ['update'] } },
    description: 'The ID of the contact',
  },
  {
    displayName: 'Note ID',
    name: 'noteId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['contactNote'], operation: ['update'] } },
    description: 'The ID of the note to update',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    required: true,
    default: '',
    typeOptions: { rows: 3 },
    displayOptions: { show: { resource: ['contactNote'], operation: ['update'] } },
    description: 'The updated note content',
  },
];
