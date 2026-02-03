import type { INodeProperties } from 'n8n-workflow';

export const getAgentBotOperation: INodeProperties[] = [
  {
    displayName: 'Inbox ID',
    name: 'inboxId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['inbox'],
        operation: ['getAgentBot'],
      },
    },
    description: 'ID of the inbox to get agent bot from',
  },
];
