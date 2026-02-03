import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Contact Identifier',
    name: 'contactIdentifier',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['publicMessage'],
        operation: ['create'],
      },
    },
    description: 'The source_id of the contact',
  },
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['publicMessage'],
        operation: ['create'],
      },
    },
    description: 'ID of the conversation',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    typeOptions: {
      rows: 4,
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['publicMessage'],
        operation: ['create'],
      },
    },
    description: 'Content of the message',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['publicMessage'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Echo ID',
        name: 'echo_id',
        type: 'string',
        default: '',
        description: 'Temporary ID for deduplication',
      },
    ],
  },
];
