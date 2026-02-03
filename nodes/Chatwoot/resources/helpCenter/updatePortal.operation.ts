import type { INodeProperties } from 'n8n-workflow';

export const updatePortalOperation: INodeProperties[] = [
  {
    displayName: 'Portal Slug',
    name: 'portalSlug',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['updatePortal'],
      },
    },
    description: 'Slug of the portal to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['updatePortal'],
      },
    },
    options: [
      {
        displayName: 'Archived',
        name: 'archived',
        type: 'boolean',
        default: false,
        description: 'Whether the portal is archived',
      },
      {
        displayName: 'Custom Domain',
        name: 'custom_domain',
        type: 'string',
        default: '',
        description: 'Custom domain for the portal',
      },
      {
        displayName: 'Header Text',
        name: 'header_text',
        type: 'string',
        default: '',
        description: 'Header text displayed on the portal',
      },
      {
        displayName: 'Homepage Link',
        name: 'homepage_link',
        type: 'string',
        default: '',
        description: 'Link to the homepage',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the portal',
      },
      {
        displayName: 'Page Title',
        name: 'page_title',
        type: 'string',
        default: '',
        description: 'Title of the portal page',
      },
    ],
  },
];
