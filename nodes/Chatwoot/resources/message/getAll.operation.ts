import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['getAll'],
      },
    },
    description: 'The ID of the conversation to get messages from',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['getAll'],
      },
    },
    description: 'Whether to return all messages or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 50,
    typeOptions: {
      minValue: 1,
      maxValue: 500,
    },
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of messages to return',
  },
];
