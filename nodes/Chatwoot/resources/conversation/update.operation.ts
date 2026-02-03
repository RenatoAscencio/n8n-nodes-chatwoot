import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['update'],
      },
    },
    description: 'ID of the conversation to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Priority',
        name: 'priority',
        type: 'options',
        options: [
          { name: 'Urgent', value: 'urgent' },
          { name: 'High', value: 'high' },
          { name: 'Medium', value: 'medium' },
          { name: 'Low', value: 'low' },
          { name: 'None', value: 'none' },
        ],
        default: 'none',
        description: 'Priority level of the conversation',
      },
      {
        displayName: 'Snoozed Until',
        name: 'snoozed_until',
        type: 'dateTime',
        default: '',
        description: 'When to un-snooze the conversation (only applies when status is snoozed)',
      },
    ],
  },
];
