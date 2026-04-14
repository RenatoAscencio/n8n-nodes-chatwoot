import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['company'], operation: ['create'] } },
    description: 'Name of the company',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['company'], operation: ['create'] } },
    options: [
      {
        displayName: 'Domain',
        name: 'domain',
        type: 'string',
        default: '',
        description: 'Company domain (e.g., company.com)',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        typeOptions: { rows: 3 },
        description: 'Company description',
      },
    ],
  },
];
