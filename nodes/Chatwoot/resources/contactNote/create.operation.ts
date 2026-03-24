import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['contactNote'], operation: ['create'] } },
    description: 'The ID of the contact',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    required: true,
    default: '',
    typeOptions: { rows: 3 },
    displayOptions: { show: { resource: ['contactNote'], operation: ['create'] } },
    description: 'The note content',
  },
];
