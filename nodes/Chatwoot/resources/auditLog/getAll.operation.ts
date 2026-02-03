import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['auditLog'],
        operation: ['getAll'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['auditLog'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    default: 25,
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
        resource: ['auditLog'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Auditable Type',
        name: 'auditable_type',
        type: 'options',
        options: [
          { name: 'Account', value: 'Account' },
          { name: 'Agent Bot', value: 'AgentBot' },
          { name: 'Automation Rule', value: 'AutomationRule' },
          { name: 'Contact', value: 'Contact' },
          { name: 'Inbox', value: 'Inbox' },
          { name: 'Team', value: 'Team' },
          { name: 'User', value: 'User' },
          { name: 'Webhook', value: 'Webhook' },
        ],
        default: '',
        description: 'Filter by auditable type',
      },
      {
        displayName: 'User ID',
        name: 'user_id',
        type: 'number',
        default: 0,
        description: 'Filter by user who performed the action',
      },
    ],
  },
];
