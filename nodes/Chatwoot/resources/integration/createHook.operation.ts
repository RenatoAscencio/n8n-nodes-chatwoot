import type { INodeProperties } from 'n8n-workflow';

export const createHookOperation: INodeProperties[] = [
  {
    displayName: 'App ID',
    name: 'appId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['createHook'],
      },
    },
    description: 'ID of the integration app (e.g., "dialogflow", "slack")',
  },
  {
    displayName: 'Inbox ID',
    name: 'inboxId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['createHook'],
      },
    },
    description: 'ID of the inbox to attach the hook to',
  },
  {
    displayName: 'Settings',
    name: 'settings',
    type: 'json',
    default: '{}',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['createHook'],
      },
    },
    description: 'Integration-specific settings as JSON',
  },
];
