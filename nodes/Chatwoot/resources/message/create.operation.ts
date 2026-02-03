import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['create'],
      },
    },
    description: 'The ID of the conversation to send the message to',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    required: true,
    default: '',
    typeOptions: {
      rows: 4,
    },
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['create'],
      },
    },
    description: 'The message content to send',
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Content Type',
        name: 'content_type',
        type: 'options',
        default: 'text',
        options: [
          {
            name: 'Text',
            value: 'text',
            description: 'Plain text message',
          },
          {
            name: 'Article',
            value: 'article',
            description: 'Article/rich content',
          },
          {
            name: 'Cards',
            value: 'cards',
            description: 'Card-based layout',
          },
          {
            name: 'Form',
            value: 'form',
            description: 'Form input',
          },
          {
            name: 'Input Email',
            value: 'input_email',
            description: 'Email input request',
          },
          {
            name: 'Input Select',
            value: 'input_select',
            description: 'Selection input',
          },
        ],
        description: 'The type of content being sent',
      },
      {
        displayName: 'Message Type',
        name: 'message_type',
        type: 'options',
        default: 'outgoing',
        options: [
          {
            name: 'Outgoing',
            value: 'outgoing',
            description: 'Message sent by agent (default)',
          },
          {
            name: 'Incoming',
            value: 'incoming',
            description: 'Message received from contact',
          },
        ],
        description: 'The direction of the message',
      },
      {
        displayName: 'Private Note',
        name: 'private',
        type: 'boolean',
        default: false,
        description: 'Whether to send as a private note (only visible to agents)',
      },
    ],
  },
];
