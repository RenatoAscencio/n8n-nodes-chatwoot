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
        resource: ['macro'],
        operation: ['create'],
      },
    },
    description: 'Name of the macro',
  },
  {
    displayName: 'Actions (JSON)',
    name: 'actions',
    type: 'json',
    required: true,
    default: '[]',
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['create'],
      },
    },
    description: 'Array of action objects. Example: [{"action_name":"assign_team","action_params":[1]}]',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Visibility',
        name: 'visibility',
        type: 'options',
        options: [
          { name: 'Personal', value: 'personal' },
          { name: 'Global', value: 'global' },
        ],
        default: 'personal',
        description: 'Visibility scope of the macro',
      },
    ],
  },
];
