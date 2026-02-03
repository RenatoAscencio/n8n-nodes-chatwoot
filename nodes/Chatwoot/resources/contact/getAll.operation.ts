import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['getAll'],
      },
    },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 50,
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Sort By',
        name: 'sort',
        type: 'options',
        default: 'name',
        options: [
          {
            name: 'Email (A-Z)',
            value: 'email',
          },
          {
            name: 'Email (Z-A)',
            value: '-email',
          },
          {
            name: 'Last Activity (Newest)',
            value: '-last_activity_at',
          },
          {
            name: 'Last Activity (Oldest)',
            value: 'last_activity_at',
          },
          {
            name: 'Name (A-Z)',
            value: 'name',
          },
          {
            name: 'Name (Z-A)',
            value: '-name',
          },
          {
            name: 'Phone Number (A-Z)',
            value: 'phone_number',
          },
          {
            name: 'Phone Number (Z-A)',
            value: '-phone_number',
          },
        ],
        description: 'Sort contacts by field (prefix with - for descending)',
      },
    ],
  },
];
