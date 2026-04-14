import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
  {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['company'], operation: ['delete'] } },
    description: 'The ID of the company to delete',
  },
];
