import type { INodeProperties } from 'n8n-workflow';

export const setAgentBotOperation: INodeProperties[] = [
  {
    displayName: 'Inbox ID',
    name: 'inboxId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['inbox'],
        operation: ['setAgentBot'],
      },
    },
    description: 'ID of the inbox',
  },
  {
    displayName: 'Agent Bot',
    name: 'agentBotId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getAgentBots',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['inbox'],
        operation: ['setAgentBot'],
      },
    },
    description: 'Agent bot to assign to the inbox. Leave empty to remove the agent bot.',
  },
];
