import type { INodeProperties } from 'n8n-workflow';

export const toggleTypingOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['toggleTyping'],
      },
    },
    description: 'The ID of the conversation',
  },
  {
    displayName: 'Typing Status',
    name: 'typingStatus',
    type: 'options',
    options: [
      { name: 'On', value: 'on' },
      { name: 'Off', value: 'off' },
    ],
    required: true,
    default: 'on',
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['toggleTyping'],
      },
    },
    description: 'Whether to show or hide the typing indicator',
  },
  {
    displayName: 'Is Private',
    name: 'isPrivate',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['toggleTyping'],
      },
    },
    description: 'Whether the typing indicator is for a private note',
  },
];
