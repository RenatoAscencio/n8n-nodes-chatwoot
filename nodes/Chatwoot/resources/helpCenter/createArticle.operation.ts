import type { INodeProperties } from 'n8n-workflow';

export const createArticleOperation: INodeProperties[] = [
  {
    displayName: 'Portal Slug',
    name: 'portalSlug',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['createArticle'],
      },
    },
    description: 'Slug of the portal to create article in',
  },
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['createArticle'],
      },
    },
    description: 'Title of the article',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    typeOptions: {
      rows: 10,
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['createArticle'],
      },
    },
    description: 'Content of the article (supports HTML)',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['createArticle'],
      },
    },
    options: [
      {
        displayName: 'Author ID',
        name: 'author_id',
        type: 'number',
        default: 0,
        description: 'ID of the author',
      },
      {
        displayName: 'Category Name or ID',
        name: 'category_id',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getCategories',
        },
        default: '',
        description: 'Category to assign the article to. Requires Portal Slug to be filled first. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Short description of the article',
      },
      {
        displayName: 'Position',
        name: 'position',
        type: 'number',
        default: 0,
        description: 'Position of the article',
      },
      {
        displayName: 'Slug',
        name: 'slug',
        type: 'string',
        default: '',
        description: 'Unique slug for the article',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Draft', value: 'draft' },
          { name: 'Published', value: 'published' },
          { name: 'Archived', value: 'archived' },
        ],
        default: 'draft',
        description: 'Status of the article',
      },
    ],
  },
];
