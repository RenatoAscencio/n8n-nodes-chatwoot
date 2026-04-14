import type { INodeProperties } from 'n8n-workflow';

export const listCategoriesOperation: INodeProperties[] = [
  {
    displayName: 'Portal Slug or ID',
    name: 'portalSlug',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['listCategories'],
      },
    },
    description: 'The slug or ID of the portal',
  },
  {
    displayName: 'Locale',
    name: 'locale',
    type: 'string',
    default: 'en',
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['listCategories'],
      },
    },
    description: 'The locale for categories (e.g., en, es, fr)',
  },
];
