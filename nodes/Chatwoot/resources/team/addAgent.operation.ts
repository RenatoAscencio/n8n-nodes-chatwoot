import type { INodeProperties } from 'n8n-workflow';

export const addAgentOperation: INodeProperties[] = [
  {
    displayName: 'Team ID',
    name: 'teamId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['team'],
        operation: ['addAgent'],
      },
    },
    description: 'ID of the team',
  },
  {
    displayName: 'User IDs',
    name: 'userIds',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['team'],
        operation: ['addAgent'],
      },
    },
    description: 'Comma-separated list of user IDs to add to the team',
  },
];
