import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Canned Response ID',
    name: 'cannedResponseId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
        operation: ['update'],
      },
    },
    description: 'ID of the canned response to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['cannedResponse'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Short Code',
        name: 'short_code',
        type: 'string',
        default: '',
        description: 'Short code to trigger this response',
      },
      {
        displayName: 'Content',
        name: 'content',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'The message content of the canned response',
      },
    ],
  },
];
