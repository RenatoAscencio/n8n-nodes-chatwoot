import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
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
        operation: ['delete'],
      },
    },
    description: 'Select the team to delete. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
];
