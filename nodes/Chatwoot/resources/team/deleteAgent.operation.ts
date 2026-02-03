import type { INodeProperties } from 'n8n-workflow';

export const deleteAgentOperation: INodeProperties[] = [
  {
    displayName: 'Team ID',
    name: 'teamId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['team'],
        operation: ['deleteAgent'],
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
        operation: ['deleteAgent'],
      },
    },
    description: 'Comma-separated list of user IDs to remove from the team',
  },
];
