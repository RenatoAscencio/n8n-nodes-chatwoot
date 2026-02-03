import type { INodeProperties } from 'n8n-workflow';

export const getMembersOperation: INodeProperties[] = [
  {
    displayName: 'Team ID',
    name: 'teamId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['team'],
        operation: ['getMembers'],
      },
    },
    description: 'ID of the team to get members from',
  },
];
