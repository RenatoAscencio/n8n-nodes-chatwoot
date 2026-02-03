import type { INodeProperties } from 'n8n-workflow';

export const getOperation: INodeProperties[] = [
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
        operation: ['get'],
      },
    },
    description: 'Select the team to retrieve. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
];
