import type { INodeProperties } from 'n8n-workflow';

export const exportContactsOperation: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['export'],
      },
    },
    options: [
      {
        displayName: 'Filter Tag',
        name: 'tag',
        type: 'string',
        default: '',
        description: 'Filter contacts by label/tag for export',
      },
      {
        displayName: 'Column Names',
        name: 'column_names',
        type: 'string',
        default: '',
        description:
          'Comma-separated column names to include in export (e.g., name,email,phone_number)',
      },
    ],
  },
];
