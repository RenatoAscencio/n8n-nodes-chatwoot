import type { INodeProperties } from 'n8n-workflow';

export const executeOperation: INodeProperties[] = [
  {
    displayName: 'Macro ID',
    name: 'macroId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['execute'],
      },
    },
    description: 'The ID of the macro to execute',
  },
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['execute'],
      },
    },
    description: 'The ID of the conversation to execute the macro on',
  },
];
