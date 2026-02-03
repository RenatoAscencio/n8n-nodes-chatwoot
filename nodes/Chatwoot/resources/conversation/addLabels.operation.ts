import type { INodeProperties } from 'n8n-workflow';

export const addLabelsOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['addLabels'],
      },
    },
    description: 'ID of the conversation',
  },
  {
    displayName: 'Labels',
    name: 'labels',
    type: 'multiOptions',
    typeOptions: {
      loadOptionsMethod: 'getLabels',
    },
    required: true,
    default: [],
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['addLabels'],
      },
    },
    description: 'Labels to set on the conversation (replaces existing labels). Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
];
