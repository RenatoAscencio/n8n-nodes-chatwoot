import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Source ID',
    name: 'sourceId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['create'],
      },
    },
    description: 'Source identifier for the conversation (e.g., phone number, email)',
  },
  {
    displayName: 'Inbox',
    name: 'inboxId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getInboxes',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['create'],
      },
    },
    description: 'Inbox to create the conversation in. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Contact ID',
        name: 'contact_id',
        type: 'number',
        default: 0,
        description: 'ID of an existing contact to associate with the conversation',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Open', value: 'open' },
          { name: 'Pending', value: 'pending' },
          { name: 'Resolved', value: 'resolved' },
        ],
        default: 'open',
        description: 'Initial status of the conversation',
      },
      {
        displayName: 'Assignee ID',
        name: 'assignee_id',
        type: 'number',
        default: 0,
        description: 'Agent ID to assign the conversation to',
      },
      {
        displayName: 'Team ID',
        name: 'team_id',
        type: 'number',
        default: 0,
        description: 'Team ID to assign the conversation to',
      },
      {
        displayName: 'Custom Attributes (JSON)',
        name: 'custom_attributes',
        type: 'json',
        default: '{}',
        description: 'Custom attributes as JSON object',
      },
    ],
  },
];
