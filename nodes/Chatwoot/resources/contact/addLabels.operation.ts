import type { INodeProperties } from 'n8n-workflow';

export const addLabelsOperation: INodeProperties[] = [
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['addLabels'],
      },
    },
    description: 'ID of the contact to add labels to',
  },
  {
    displayName: 'Labels',
    name: 'labels',
    type: 'multiOptions',
    typeOptions: {
      loadOptionsMethod: 'getLabels',
    },
    default: [],
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['addLabels'],
      },
    },
    description: 'Labels to add to the contact. Choose from the list or specify comma-separated label names.',
  },
];
