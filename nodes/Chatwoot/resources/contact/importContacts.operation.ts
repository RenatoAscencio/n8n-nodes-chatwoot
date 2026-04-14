import type { INodeProperties } from 'n8n-workflow';

export const importContactsOperation: INodeProperties[] = [
  {
    displayName: 'File Content (CSV)',
    name: 'fileContent',
    type: 'string',
    required: true,
    default: '',
    typeOptions: {
      rows: 5,
    },
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['import'],
      },
    },
    description:
      'CSV content with headers: name, email, phone_number, identifier. First row must be headers.',
  },
];
