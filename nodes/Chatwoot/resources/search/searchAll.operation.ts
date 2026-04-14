import type { INodeProperties } from 'n8n-workflow';

export const searchAllOperation: INodeProperties[] = [
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['search'], operation: ['searchAll'] } },
    description: 'Search query string',
  },
];
