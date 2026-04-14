import type { INodeProperties } from 'n8n-workflow';

export const getOperation: INodeProperties[] = [
  {
    displayName: 'SLA Policy ID',
    name: 'slaPolicyId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['slaPolicy'], operation: ['get'] } },
    description: 'The ID of the SLA policy to retrieve',
  },
];
