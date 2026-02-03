import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Account ID',
    name: 'accountId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['accountAgentBot'],
        operation: ['update'],
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
        operation: ['update'],
      },
    },
    description: 'ID of the agent bot to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['accountAgentBot'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the agent bot',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the agent bot',
      },
      {
        displayName: 'Outgoing URL',
        name: 'outgoing_url',
        type: 'string',
        default: '',
        description: 'Webhook URL for the agent bot',
      },
    ],
  },
];
