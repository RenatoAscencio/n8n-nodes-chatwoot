import type { INodeProperties } from 'n8n-workflow';

export const summaryReportOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['summaryReport'],
    },
  },
  options: [
    {
      name: 'Agent Summary',
      value: 'agent',
      description: 'Get per-agent summary metrics (JSON)',
      action: 'Get agent summary',
    },
    {
      name: 'Channel Summary',
      value: 'channel',
      description: 'Get per-channel summary metrics (max 6-month range)',
      action: 'Get channel summary',
    },
    {
      name: 'Inbox Summary',
      value: 'inbox',
      description: 'Get per-inbox summary metrics (JSON)',
      action: 'Get inbox summary',
    },
    {
      name: 'Label Summary',
      value: 'label',
      description: 'Get per-label summary metrics (JSON)',
      action: 'Get label summary',
    },
    {
      name: 'Team Summary',
      value: 'team',
      description: 'Get per-team summary metrics (JSON)',
      action: 'Get team summary',
    },
  ],
  default: 'agent',
};

export const summaryReportFields: INodeProperties[] = [
  {
    displayName: 'Since',
    name: 'since',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['summaryReport'],
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
        resource: ['summaryReport'],
      },
    },
    description: 'End date for the report',
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['summaryReport'],
      },
    },
    options: [
      {
        displayName: 'Business Hours',
        name: 'business_hours',
        type: 'boolean',
        default: false,
        description: 'Whether to filter by business hours only',
      },
    ],
  },
];
