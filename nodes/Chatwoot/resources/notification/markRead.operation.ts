import type { INodeProperties } from 'n8n-workflow';

export const markReadOperation: INodeProperties[] = [
  {
    displayName: 'Notification ID',
    name: 'notificationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['notification'],
        operation: ['markRead'],
      },
    },
    description: 'The ID of the notification to mark as read',
  },
];
