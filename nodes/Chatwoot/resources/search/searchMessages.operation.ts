import type { INodeProperties } from 'n8n-workflow';

export const searchMessagesOperation: INodeProperties[] = [
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['search'], operation: ['searchMessages'] } },
    description: 'Search query for messages',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: { show: { resource: ['search'], operation: ['searchMessages'] } },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 25,
    typeOptions: { minValue: 1 },
    displayOptions: { show: { resource: ['search'], operation: ['searchMessages'], returnAll: [false] } },
    description: 'Max number of results to return',
  },
];
