import type { INodeProperties } from 'n8n-workflow';

export const reportOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['report'],
    },
  },
  options: [
    {
      name: 'Account Summary',
      value: 'accountSummary',
      description: 'Get account reports summary',
      action: 'Get account summary report',
    },
    {
      name: 'Agent Statistics',
      value: 'agentStatistics',
      description: 'Get agent conversation metrics',
      action: 'Get agent statistics',
    },
    {
      name: 'Conversation Counts',
      value: 'conversationCounts',
      description: 'Get conversation counts by status',
      action: 'Get conversation counts',
    },
    {
      name: 'Conversation Statistics',
      value: 'conversationStatistics',
      description: 'Get conversation statistics grouped by various dimensions',
      action: 'Get conversation statistics',
    },
  ],
  default: 'accountSummary',
};

export const reportFields: INodeProperties[] = [
  // Common date range for all reports
  {
    displayName: 'Since',
    name: 'since',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['report'],
        operation: ['accountSummary', 'agentStatistics', 'conversationStatistics'],
      },
    },
    description: 'Start date for the report (Unix timestamp)',
  },
  {
    displayName: 'Until',
    name: 'until',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['report'],
        operation: ['accountSummary', 'agentStatistics', 'conversationStatistics'],
      },
    },
    description: 'End date for the report (Unix timestamp)',
  },
  // Metric selection for account summary
  {
    displayName: 'Metric',
    name: 'metric',
    type: 'options',
    options: [
      { name: 'Conversations Count', value: 'conversations_count' },
      { name: 'Incoming Messages Count', value: 'incoming_messages_count' },
      { name: 'Outgoing Messages Count', value: 'outgoing_messages_count' },
      { name: 'Average First Response Time', value: 'avg_first_response_time' },
      { name: 'Average Resolution Time', value: 'avg_resolution_time' },
      { name: 'Resolutions Count', value: 'resolutions_count' },
    ],
    default: 'conversations_count',
    displayOptions: {
      show: {
        resource: ['report'],
        operation: ['accountSummary'],
      },
    },
    description: 'Metric to retrieve',
  },
  // Group by for conversation statistics
  {
    displayName: 'Group By',
    name: 'groupBy',
    type: 'options',
    options: [
      { name: 'Agent', value: 'agent' },
      { name: 'Channel Type', value: 'channel_type' },
      { name: 'Inbox', value: 'inbox' },
      { name: 'Team', value: 'team' },
    ],
    default: 'agent',
    displayOptions: {
      show: {
        resource: ['report'],
        operation: ['conversationStatistics'],
      },
    },
    description: 'Group statistics by this dimension',
  },
  // Options
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['report'],
        operation: ['accountSummary', 'agentStatistics', 'conversationStatistics'],
      },
    },
    options: [
      {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        options: [
          { name: 'Account', value: 'account' },
          { name: 'Agent', value: 'agent' },
          { name: 'Inbox', value: 'inbox' },
          { name: 'Label', value: 'label' },
          { name: 'Team', value: 'team' },
        ],
        default: 'account',
        description: 'Type of report',
      },
      {
        displayName: 'ID',
        name: 'id',
        type: 'number',
        default: 0,
        description: 'ID of the agent/inbox/team/label for specific reports',
      },
      {
        displayName: 'Timezone Offset',
        name: 'timezone_offset',
        type: 'number',
        default: 0,
        description: 'Timezone offset in seconds',
      },
    ],
  },
];
