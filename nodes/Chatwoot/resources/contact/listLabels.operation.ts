import type { INodeProperties } from 'n8n-workflow';

export const listLabelsOperation: INodeProperties[] = [
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['listLabels'],
      },
    },
    description: 'ID of the contact to get labels from',
  },
];
