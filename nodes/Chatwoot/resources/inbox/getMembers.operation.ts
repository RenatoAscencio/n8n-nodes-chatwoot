import type { INodeProperties } from 'n8n-workflow';

export const getMembersOperation: INodeProperties[] = [
  {
    displayName: 'Inbox ID',
    name: 'inboxId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['inbox'],
        operation: ['getMembers'],
      },
    },
    description: 'ID of the inbox to get members from',
  },
];
