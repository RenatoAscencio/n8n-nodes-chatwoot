import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Macro ID',
    name: 'macroId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['update'],
      },
    },
    description: 'The ID of the macro to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the macro',
      },
      {
        displayName: 'Actions (JSON)',
        name: 'actions',
        type: 'json',
        default: '[]',
        description: 'Array of action objects',
      },
      {
        displayName: 'Visibility',
        name: 'visibility',
        type: 'options',
        options: [
          { name: 'Personal', value: 'personal' },
          { name: 'Global', value: 'global' },
        ],
        default: 'personal',
        description: 'Visibility scope of the macro',
      },
    ],
  },
];
