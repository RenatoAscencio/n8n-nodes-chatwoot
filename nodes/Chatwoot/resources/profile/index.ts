import type { INodeProperties } from 'n8n-workflow';
import { fetchOperation } from './fetch.operation';
import { updateOperation } from './update.operation';
import { availabilityOperation } from './availability.operation';

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
    {
      name: 'Set Availability',
      value: 'availability',
      description: 'Set availability status (online, offline, busy)',
      action: 'Set availability',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update the authenticated user profile',
      action: 'Update profile',
    },
  ],
  default: 'fetch',
};

export const profileFields: INodeProperties[] = [
  ...fetchOperation,
  ...updateOperation,
  ...availabilityOperation,
];
