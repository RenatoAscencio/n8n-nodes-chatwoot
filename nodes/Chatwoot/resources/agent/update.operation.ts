import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Agent',
    name: 'agentId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getAgents',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['update'],
      },
    },
    description: 'Select the agent to update. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Full name of the agent',
      },
      {
        displayName: 'Role',
        name: 'role',
        type: 'options',
        options: [
          { name: 'Agent', value: 'agent' },
          { name: 'Administrator', value: 'administrator' },
        ],
        default: 'agent',
        description: 'Role determines the permissions of the agent',
      },
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
        description: 'Availability status of the agent',
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
