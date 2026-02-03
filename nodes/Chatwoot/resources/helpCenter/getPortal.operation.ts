import type { INodeProperties } from 'n8n-workflow';

export const getPortalOperation: INodeProperties[] = [
  {
    displayName: 'Portal Slug',
    name: 'portalSlug',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['helpCenter'],
        operation: ['getPortal'],
      },
    },
    description: 'Slug of the portal to retrieve',
  },
];
