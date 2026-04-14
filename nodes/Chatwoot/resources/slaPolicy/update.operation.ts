import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'SLA Policy ID',
    name: 'slaPolicyId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['slaPolicy'], operation: ['update'] } },
    description: 'The ID of the SLA policy to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['slaPolicy'], operation: ['update'] } },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the SLA policy',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the SLA policy',
      },
      {
        displayName: 'First Response Time (seconds)',
        name: 'first_response_time_threshold',
        type: 'number',
        default: 0,
        description: 'Max seconds for first response',
      },
      {
        displayName: 'Next Response Time (seconds)',
        name: 'next_response_time_threshold',
        type: 'number',
        default: 0,
        description: 'Max seconds for subsequent responses',
      },
      {
        displayName: 'Resolution Time (seconds)',
        name: 'resolution_time_threshold',
        type: 'number',
        default: 0,
        description: 'Max seconds for full resolution',
      },
      {
        displayName: 'Only During Business Hours',
        name: 'only_during_business_hours',
        type: 'boolean',
        default: false,
        description: 'Whether to only count business hours',
      },
    ],
  },
];
