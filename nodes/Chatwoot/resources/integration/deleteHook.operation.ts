import type { INodeProperties } from 'n8n-workflow';

export const deleteHookOperation: INodeProperties[] = [
  {
    displayName: 'App ID',
    name: 'appId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['deleteHook'],
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
        operation: ['deleteHook'],
      },
    },
    description: 'ID of the hook to delete',
  },
];
