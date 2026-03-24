import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['profile'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Display name',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        description: 'Email address',
      },
      {
        displayName: 'Availability',
        name: 'availability',
        type: 'options',
        options: [
          { name: 'Online', value: 'online' },
          { name: 'Offline', value: 'offline' },
          { name: 'Busy', value: 'busy' },
        ],
        default: 'online',
        description: 'Availability status',
      },
      {
        displayName: 'Auto Offline',
        name: 'auto_offline',
        type: 'boolean',
        default: true,
        description: 'Whether to automatically go offline',
      },
    ],
  },
];
