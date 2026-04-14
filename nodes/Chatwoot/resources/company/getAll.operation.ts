import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: { show: { resource: ['company'], operation: ['getAll'] } },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 25,
    typeOptions: { minValue: 1 },
    displayOptions: { show: { resource: ['company'], operation: ['getAll'], returnAll: [false] } },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { resource: ['company'], operation: ['getAll'] } },
    options: [
      {
        displayName: 'Sort By',
        name: 'sort',
        type: 'options',
        options: [
          { name: 'Name', value: 'name' },
          { name: 'Domain', value: 'domain' },
          { name: 'Created At', value: 'created_at' },
          { name: 'Contacts Count', value: 'contacts_count' },
        ],
        default: 'name',
        description: 'Field to sort by',
      },
    ],
  },
];
