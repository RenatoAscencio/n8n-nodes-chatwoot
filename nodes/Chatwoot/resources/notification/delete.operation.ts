import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
  {
    displayName: 'Notification ID',
    name: 'notificationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['notification'],
        operation: ['delete'],
      },
    },
    description: 'The ID of the notification to delete',
  },
];
