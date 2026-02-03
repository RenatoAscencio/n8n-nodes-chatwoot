import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['getAll'],
      },
    },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 50,
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Assignee Type',
        name: 'assignee_type',
        type: 'options',
        default: 'all',
        options: [
          {
            name: 'All',
            value: 'all',
            description: 'All conversations regardless of assignee',
          },
          {
            name: 'Assigned',
            value: 'assigned',
            description: 'Conversations assigned to any agent',
          },
          {
            name: 'Me',
            value: 'me',
            description: 'Conversations assigned to the current user',
          },
          {
            name: 'Unassigned',
            value: 'unassigned',
            description: 'Conversations without an assignee',
          },
        ],
        description: 'Filter by assignee type',
      },
      {
        displayName: 'Inbox ID',
        name: 'inbox_id',
        type: 'number',
        default: 0,
        description: 'Filter by specific inbox ID',
      },
      {
        displayName: 'Labels',
        name: 'labels',
        type: 'string',
        default: '',
        placeholder: 'bug, urgent, vip',
        description: 'Comma-separated list of labels to filter by',
      },
      {
        displayName: 'Search Query',
        name: 'q',
        type: 'string',
        default: '',
        placeholder: 'Search text...',
        description: 'Search conversations by message content',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        default: 'all',
        options: [
          {
            name: 'All',
            value: 'all',
            description: 'All conversations',
          },
          {
            name: 'Open',
            value: 'open',
            description: 'Active conversations',
          },
          {
            name: 'Pending',
            value: 'pending',
            description: 'Conversations awaiting response',
          },
          {
            name: 'Resolved',
            value: 'resolved',
            description: 'Completed conversations',
          },
          {
            name: 'Snoozed',
            value: 'snoozed',
            description: 'Temporarily hidden conversations',
          },
        ],
        description: 'Filter by conversation status',
      },
      {
        displayName: 'Team ID',
        name: 'team_id',
        type: 'number',
        default: 0,
        description: 'Filter by specific team ID',
      },
    ],
  },
];
