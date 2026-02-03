import type { INodeProperties } from 'n8n-workflow';
import { fetchOperation } from './fetch.operation';

export const profileOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['profile'],
    },
  },
  options: [
    {
      name: 'Fetch',
      value: 'fetch',
      description: 'Get the authenticated user profile',
      action: 'Fetch profile',
    },
  ],
  default: 'fetch',
};

export const profileFields: INodeProperties[] = [...fetchOperation];
