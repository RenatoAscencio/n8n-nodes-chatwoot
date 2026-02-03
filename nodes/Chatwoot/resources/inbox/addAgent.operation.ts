import type { INodeProperties } from 'n8n-workflow';

export const addAgentOperation: INodeProperties[] = [
  {
    displayName: 'Inbox ID',
    name: 'inboxId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['inbox'],
        operation: ['addAgent'],
      },
    },
    description: 'ID of the inbox',
  },
  {
    displayName: 'User IDs',
    name: 'userIds',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['inbox'],
        operation: ['addAgent'],
      },
    },
    description: 'Comma-separated list of user IDs to add to the inbox',
  },
];
