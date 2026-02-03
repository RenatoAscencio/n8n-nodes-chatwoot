import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';

export const auditLogOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['auditLog'],
    },
  },
  options: [
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get audit logs for the account',
      action: 'Get audit logs',
    },
  ],
  default: 'getAll',
};

export const auditLogFields: INodeProperties[] = [...getAllOperation];
