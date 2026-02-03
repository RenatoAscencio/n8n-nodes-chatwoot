import type { INodeProperties } from 'n8n-workflow';

export const updateHookOperation: INodeProperties[] = [
  {
    displayName: 'App ID',
    name: 'appId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['updateHook'],
      },
    },
    description: 'ID of the integration app',
  },
  {
    displayName: 'Hook ID',
    name: 'hookId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['updateHook'],
      },
    },
    description: 'ID of the hook to update',
  },
  {
    displayName: 'Settings',
    name: 'settings',
    type: 'json',
    default: '{}',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['updateHook'],
      },
    },
    description: 'Updated integration-specific settings as JSON',
  },
];
