import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
  {
    displayName: 'SLA Policy ID',
    name: 'slaPolicyId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['slaPolicy'], operation: ['delete'] } },
    description: 'The ID of the SLA policy to delete',
  },
];
