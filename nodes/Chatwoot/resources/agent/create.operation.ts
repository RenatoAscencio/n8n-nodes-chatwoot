import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['create'],
      },
    },
    description: 'Full name of the agent',
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['create'],
      },
    },
    description: 'Email address of the agent (used for login)',
  },
  {
    displayName: 'Role',
    name: 'role',
    type: 'options',
    required: true,
    options: [
      {
        name: 'Agent',
        value: 'agent',
        description: 'Can manage assigned conversations and contacts',
      },
      {
        name: 'Administrator',
        value: 'administrator',
        description: 'Full access to all conversations, contacts, and settings',
      },
    ],
    default: 'agent',
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['create'],
      },
    },
    description: 'Role determines the permissions of the agent',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Availability Status',
        name: 'availability_status',
        type: 'options',
        options: [
          { name: 'Available', value: 'available' },
          { name: 'Busy', value: 'busy' },
          { name: 'Offline', value: 'offline' },
        ],
        default: 'available',
        description: 'Initial availability status of the agent',
      },
      {
        displayName: 'Auto Offline',
        name: 'auto_offline',
        type: 'boolean',
        default: true,
        description: 'Whether to automatically set agent offline when inactive',
      },
    ],
  },
];
