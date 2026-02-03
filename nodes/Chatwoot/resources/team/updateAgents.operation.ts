import type { INodeProperties } from 'n8n-workflow';

export const updateAgentsOperation: INodeProperties[] = [
  {
    displayName: 'Team ID',
    name: 'teamId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['team'],
        operation: ['updateAgents'],
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
        operation: ['updateAgents'],
      },
    },
    description: 'Comma-separated list of all user IDs that should be members of this team (replaces existing members)',
  },
];
