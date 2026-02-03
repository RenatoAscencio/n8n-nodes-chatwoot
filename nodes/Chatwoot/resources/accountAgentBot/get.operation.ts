import type { INodeProperties } from 'n8n-workflow';

export const getOperation: INodeProperties[] = [
  {
    displayName: 'Account ID',
    name: 'accountId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['accountAgentBot'],
        operation: ['get'],
      },
    },
    description: 'ID of the account',
  },
  {
    displayName: 'Agent Bot ID',
    name: 'agentBotId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['accountAgentBot'],
        operation: ['get'],
      },
    },
    description: 'ID of the agent bot',
  },
];
