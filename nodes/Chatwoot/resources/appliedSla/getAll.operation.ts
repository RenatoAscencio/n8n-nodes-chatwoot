import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: { show: { resource: ['appliedSla'], operation: ['getAll'] } },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 25,
    typeOptions: { minValue: 1 },
    displayOptions: { show: { resource: ['appliedSla'], operation: ['getAll'], returnAll: [false] } },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: { show: { resource: ['appliedSla'], operation: ['getAll'] } },
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
      {
        displayName: 'Inbox ID',
        name: 'inbox_id',
        type: 'number',
        default: 0,
        description: 'Filter by inbox',
      },
      {
        displayName: 'Team ID',
        name: 'team_id',
        type: 'number',
        default: 0,
        description: 'Filter by team',
      },
      {
        displayName: 'SLA Policy ID',
        name: 'sla_policy_id',
        type: 'number',
        default: 0,
        description: 'Filter by SLA policy',
      },
      {
        displayName: 'Assigned Agent ID',
        name: 'assigned_agent_id',
        type: 'number',
        default: 0,
        description: 'Filter by assigned agent',
      },
    ],
  },
];
