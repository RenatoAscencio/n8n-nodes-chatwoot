import type { INodeProperties } from 'n8n-workflow';

export const metricsOperation: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { resource: ['appliedSla'], operation: ['metrics'] } },
    options: [
      {
        displayName: 'Since',
        name: 'since',
        type: 'dateTime',
        default: '',
        description: 'Start date for metrics',
      },
      {
        displayName: 'Until',
        name: 'until',
        type: 'dateTime',
        default: '',
        description: 'End date for metrics',
      },
    ],
  },
];
