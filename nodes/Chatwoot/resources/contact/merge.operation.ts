import type { INodeProperties } from 'n8n-workflow';

export const mergeOperation: INodeProperties[] = [
  {
    displayName: 'Base Contact ID',
    name: 'baseContactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['merge'],
      },
    },
    description: 'ID of the contact that will be kept (primary contact)',
  },
  {
    displayName: 'Merge Contact ID',
    name: 'mergeeContactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['merge'],
      },
    },
    description: 'ID of the contact that will be merged and deleted',
  },
];
