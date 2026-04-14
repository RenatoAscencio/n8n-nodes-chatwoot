import type { INodeProperties } from 'n8n-workflow';

export const getOperation: INodeProperties[] = [
  {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['company'], operation: ['get'] } },
    description: 'The ID of the company to retrieve',
  },
];
