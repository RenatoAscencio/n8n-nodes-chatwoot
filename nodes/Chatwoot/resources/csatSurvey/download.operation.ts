import type { INodeProperties } from 'n8n-workflow';

export const downloadOperation: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['csatSurvey'],
        operation: ['download'],
      },
    },
    options: [
      {
        displayName: 'Since',
        name: 'since',
        type: 'dateTime',
        default: '',
        description: 'Start date filter',
      },
      {
        displayName: 'Until',
        name: 'until',
        type: 'dateTime',
        default: '',
        description: 'End date filter',
      },
    ],
  },
];
