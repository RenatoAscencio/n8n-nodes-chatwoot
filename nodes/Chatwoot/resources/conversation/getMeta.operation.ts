import type { INodeProperties } from 'n8n-workflow';

export const getMetaOperation: INodeProperties[] = [
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['getMeta'],
      },
    },
    options: [
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'All', value: 'all' },
          { name: 'Open', value: 'open' },
          { name: 'Resolved', value: 'resolved' },
          { name: 'Pending', value: 'pending' },
          { name: 'Snoozed', value: 'snoozed' },
        ],
        default: 'all',
        description: 'Filter by conversation status',
      },
      {
        displayName: 'Inbox',
        name: 'inbox_id',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getInboxes',
        },
        default: '',
        description: 'Filter by inbox',
      },
      {
        displayName: 'Team',
        name: 'team_id',
        type: 'options',
        typeOptions: {
          loadOptionsMethod: 'getTeams',
        },
        default: '',
        description: 'Filter by team',
      },
    ],
  },
];
