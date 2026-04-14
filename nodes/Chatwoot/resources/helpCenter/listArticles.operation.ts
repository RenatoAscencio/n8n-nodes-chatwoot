import type { INodeProperties } from 'n8n-workflow';

export const listArticlesOperation: INodeProperties[] = [
  {
    displayName: 'Portal Slug or ID',
    name: 'portalSlug',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['listArticles'],
      },
    },
    description: 'The slug or ID of the portal',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['listArticles'],
      },
    },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 25,
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['listArticles'],
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
        resource: ['helpCenter'],
        operation: ['listArticles'],
      },
    },
    options: [
      {
        displayName: 'Locale',
        name: 'locale',
        type: 'string',
        default: 'en',
        description: 'Filter articles by locale',
      },
      {
        displayName: 'Category Slug',
        name: 'category_slug',
        type: 'string',
        default: '',
        description: 'Filter articles by category slug',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'All', value: '' },
          { name: 'Draft', value: 'draft' },
          { name: 'Published', value: 'published' },
          { name: 'Archived', value: 'archived' },
        ],
        default: '',
        description: 'Filter articles by status',
      },
    ],
  },
];
