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
        resource: ['team'],
        operation: ['create'],
      },
    },
    description: 'Name of the team',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['team'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the team',
      },
      {
        displayName: 'Allow Auto Assign',
        name: 'allow_auto_assign',
        type: 'boolean',
        default: true,
        description: 'Whether conversations can be automatically assigned to team members',
      },
    ],
  },
];
