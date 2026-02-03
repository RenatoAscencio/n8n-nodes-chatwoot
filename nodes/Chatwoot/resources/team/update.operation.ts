import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Team',
    name: 'teamId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getTeams',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['team'],
        operation: ['update'],
      },
    },
    description: 'Select the team to update. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['team'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the team',
      },
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
