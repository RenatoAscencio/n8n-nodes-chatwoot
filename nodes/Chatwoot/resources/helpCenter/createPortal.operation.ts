import type { INodeProperties } from 'n8n-workflow';

export const createPortalOperation: INodeProperties[] = [
  {
    displayName: 'Portal Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['createPortal'],
      },
    },
    description: 'Name of the portal',
  },
  {
    displayName: 'Slug',
    name: 'slug',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['createPortal'],
      },
    },
    description: 'Unique slug for the portal URL (e.g., "my-help-center")',
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
        operation: ['createPortal'],
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
        displayName: 'Page Title',
        name: 'page_title',
        type: 'string',
        default: '',
        description: 'Title of the portal page',
      },
    ],
  },
];
