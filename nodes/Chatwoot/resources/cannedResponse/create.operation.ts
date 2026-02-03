import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Short Code',
    name: 'shortCode',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'greeting',
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
        operation: ['create'],
      },
    },
    description: 'Short code to trigger this response (e.g., "greeting" can be triggered by typing "/greeting")',
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
        resource: ['cannedResponse'],
        operation: ['create'],
      },
    },
    description: 'The message content of the canned response',
  },
];
