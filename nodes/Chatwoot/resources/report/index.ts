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
      description: 'Get account reports summary with previous-period comparison',
      action: 'Get account summary report',
    },
    {
      name: 'Agent Statistics',
      value: 'agentStatistics',
      description: 'Get per-agent summary metrics (CSV)',
      action: 'Get agent statistics',
    },
    {
      name: 'Bot Metrics',
      value: 'botMetrics',
      description: 'Get bot performance metrics',
      action: 'Get bot metrics',
    },
    {
      name: 'Bot Summary',
      value: 'botSummary',
      description: 'Get bot-specific summary metrics',
      action: 'Get bot summary',
    },
    {
      name: 'Conversation Counts',
      value: 'conversationCounts',
      description: 'Get conversation counts by status (uses v1 /conversations/meta)',
      action: 'Get conversation counts',
    },
    {
      name: 'Conversation Statistics',
      value: 'conversationStatistics',
      description: 'Get conversation metrics by type',
      action: 'Get conversation statistics',
    },
    {
      name: 'Conversation Traffic',
      value: 'conversationTraffic',
      description: 'Get hourly heatmap of conversation traffic (CSV)',
      action: 'Get conversation traffic',
    },
    {
      name: 'Conversations Summary',
      value: 'conversationsSummary',
      description: 'Get conversation summary (CSV)',
      action: 'Get conversations summary',
    },
    {
      name: 'First Response Time Distribution',
      value: 'firstResponseTimeDistribution',
      description: 'Get distribution of first response times',
      action: 'Get first response time distribution',
    },
    {
      name: 'Inbox Label Matrix',
      value: 'inboxLabelMatrix',
      description: 'Get cross-tabulation of inboxes vs labels',
      action: 'Get inbox label matrix',
    },
    {
      name: 'Inbox Statistics',
      value: 'inboxStatistics',
      description: 'Get per-inbox summary metrics (CSV)',
      action: 'Get inbox statistics',
    },
    {
      name: 'Label Statistics',
      value: 'labelStatistics',
      description: 'Get per-label summary metrics (CSV)',
      action: 'Get label statistics',
    },
    {
      name: 'Outgoing Messages Count',
      value: 'outgoingMessagesCount',
      description: 'Get outgoing message counts grouped by entity',
      action: 'Get outgoing messages count',
    },
    {
      name: 'Team Statistics',
      value: 'teamStatistics',
      description: 'Get per-team summary metrics (CSV)',
      action: 'Get team statistics',
    },
    {
      name: 'Timeseries',
      value: 'timeseries',
      description: 'Get timeseries data for a metric',
      action: 'Get timeseries report',
    },
    {
      name: 'Year in Review',
      value: 'yearInReview',
      description: 'Get annual review statistics',
      action: 'Get year in review',
    },
  ],
  default: 'accountSummary',
};

const dateRangeFields: INodeProperties[] = [
  {
    displayName: 'Since',
    name: 'since',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['report'],
        operation: [
          'accountSummary',
          'agentStatistics',
          'botSummary',
          'botMetrics',
          'conversationStatistics',
          'conversationsSummary',
          'conversationTraffic',
          'firstResponseTimeDistribution',
          'inboxLabelMatrix',
          'inboxStatistics',
          'labelStatistics',
          'outgoingMessagesCount',
          'teamStatistics',
          'timeseries',
        ],
      },
    },
    description: 'Start date for the report',
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
        operation: [
          'accountSummary',
          'agentStatistics',
          'botSummary',
          'botMetrics',
          'conversationStatistics',
          'conversationsSummary',
          'conversationTraffic',
          'firstResponseTimeDistribution',
          'inboxLabelMatrix',
          'inboxStatistics',
          'labelStatistics',
          'outgoingMessagesCount',
          'teamStatistics',
          'timeseries',
        ],
      },
    },
    description: 'End date for the report',
  },
];

export const reportFields: INodeProperties[] = [
  ...dateRangeFields,
  // Timeseries fields
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    required: true,
    options: [
      { name: 'Account', value: 'account' },
      { name: 'Agent', value: 'agent' },
      { name: 'Inbox', value: 'inbox' },
      { name: 'Label', value: 'label' },
      { name: 'Team', value: 'team' },
    ],
    default: 'account',
    displayOptions: {
      show: {
        resource: ['report'],
        operation: ['timeseries', 'accountSummary', 'botSummary'],
      },
    },
    description: 'Entity type for the report',
  },
  {
    displayName: 'Metric',
    name: 'metric',
    type: 'options',
    required: true,
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
        operation: ['timeseries'],
      },
    },
    description: 'Metric to retrieve',
  },
  // Conversations report params
  {
    displayName: 'Type',
    name: 'conversationType',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['report'],
        operation: ['conversationStatistics'],
      },
    },
    description: 'Conversation type (e.g., agent, inbox, team, label)',
  },
  // Outgoing messages count - group_by required
  {
    displayName: 'Group By',
    name: 'groupBy',
    type: 'options',
    required: true,
    options: [
      { name: 'Agent', value: 'agent' },
      { name: 'Inbox', value: 'inbox' },
      { name: 'Label', value: 'label' },
      { name: 'Team', value: 'team' },
    ],
    default: 'agent',
    displayOptions: {
      show: {
        resource: ['report'],
        operation: ['outgoingMessagesCount'],
      },
    },
    description: 'Group counts by this entity',
  },
  // Year in review
  {
    displayName: 'Year',
    name: 'year',
    type: 'number',
    default: 2025,
    displayOptions: {
      show: {
        resource: ['report'],
        operation: ['yearInReview'],
      },
    },
    description: 'Year for the review',
  },
  // Common options
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['report'],
        operation: [
          'accountSummary',
          'agentStatistics',
          'botSummary',
          'botMetrics',
          'conversationStatistics',
          'conversationsSummary',
          'conversationTraffic',
          'firstResponseTimeDistribution',
          'inboxLabelMatrix',
          'inboxStatistics',
          'labelStatistics',
          'outgoingMessagesCount',
          'teamStatistics',
          'timeseries',
        ],
      },
    },
    options: [
      {
        displayName: 'Entity ID',
        name: 'id',
        type: 'number',
        default: 0,
        description: 'ID of the agent/inbox/team/label (when type is not account)',
      },
      {
        displayName: 'Group By Period',
        name: 'group_by',
        type: 'options',
        options: [
          { name: 'Hour', value: 'hour' },
          { name: 'Day', value: 'day' },
          { name: 'Week', value: 'week' },
          { name: 'Month', value: 'month' },
          { name: 'Year', value: 'year' },
        ],
        default: 'day',
        description: 'Group results by time period',
      },
      {
        displayName: 'Timezone Offset',
        name: 'timezone_offset',
        type: 'number',
        default: 0,
        description: 'Timezone offset in seconds',
      },
      {
        displayName: 'Business Hours',
        name: 'business_hours',
        type: 'boolean',
        default: false,
        description: 'Whether to filter by business hours only',
      },
      {
        displayName: 'Days Before',
        name: 'days_before',
        type: 'number',
        default: 6,
        description: 'Number of days to look back (for conversation traffic)',
      },
      {
        displayName: 'Inbox IDs',
        name: 'inbox_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated inbox IDs (for inbox label matrix)',
      },
      {
        displayName: 'Label IDs',
        name: 'label_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated label IDs (for inbox label matrix)',
      },
      {
        displayName: 'User ID',
        name: 'user_id',
        type: 'number',
        default: 0,
        description: 'Filter by user (for conversation statistics)',
      },
    ],
  },
];
