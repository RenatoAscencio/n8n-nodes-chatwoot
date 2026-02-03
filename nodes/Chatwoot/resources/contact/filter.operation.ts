import type { INodeProperties } from 'n8n-workflow';

export const filterOperation: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['filter'],
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
        operation: ['filter'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Filter Payload',
    name: 'filterPayload',
    type: 'json',
    default: '[]',
    required: true,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['filter'],
      },
    },
    description:
      'Filter conditions as JSON array. Example: [{"attribute_key": "email", "filter_operator": "contains", "values": ["@example.com"]}]',
  },
];
