import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Account ID',
    name: 'accountId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['accountAgentBot'],
        operation: ['create'],
      },
    },
    description: 'ID of the account',
  },
  {
    displayName: 'Bot Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['accountAgentBot'],
        operation: ['create'],
      },
    },
    description: 'Name of the agent bot',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['accountAgentBot'],
        operation: ['create'],
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
        displayName: 'Outgoing URL',
        name: 'outgoing_url',
        type: 'string',
        default: '',
        description: 'Webhook URL for the agent bot',
      },
    ],
  },
];
