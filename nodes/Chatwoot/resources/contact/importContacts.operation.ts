import type { INodeProperties } from 'n8n-workflow';

export const importContactsOperation: INodeProperties[] = [
  {
    displayName: 'Input Binary Field',
    name: 'binaryPropertyName',
    type: 'string',
    required: true,
    default: 'data',
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['import'],
      },
    },
    description:
      'Name of the binary property containing the CSV file to import. Use a "Read Binary File" or "HTTP Request" node to provide the file.',
  },
];
