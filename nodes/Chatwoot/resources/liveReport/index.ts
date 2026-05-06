import type { INodeProperties } from 'n8n-workflow';

export const liveReportOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['liveReport'],
    },
  },
  options: [
    {
      name: 'Conversation Metrics',
      value: 'conversationMetrics',
      description: 'Get real-time conversation counts (open, unattended, unassigned, pending)',
      action: 'Get live conversation metrics',
    },
    {
      name: 'Grouped Conversation Metrics',
      value: 'groupedConversationMetrics',
      description: 'Get real-time conversation counts grouped by team or agent',
      action: 'Get grouped live conversation metrics',
    },
  ],
  default: 'conversationMetrics',
};

export const liveReportFields: INodeProperties[] = [
  {
    displayName: 'Group By',
    name: 'groupBy',
    type: 'options',
    required: true,
    options: [
      { name: 'Team', value: 'team_id' },
      { name: 'Agent', value: 'assignee_id' },
    ],
    default: 'team_id',
    displayOptions: {
      show: {
        resource: ['liveReport'],
        operation: ['groupedConversationMetrics'],
      },
    },
    description: 'How to group the metrics',
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['liveReport'],
        operation: ['conversationMetrics', 'groupedConversationMetrics'],
      },
    },
    options: [
      {
        displayName: 'Team ID',
        name: 'team_id',
        type: 'number',
        default: 0,
        description: 'Filter by team',
      },
    ],
  },
];
