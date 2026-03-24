import type { INodeProperties } from 'n8n-workflow';

export const markUnreadOperation: INodeProperties[] = [
  {
    displayName: 'Notification ID',
    name: 'notificationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['notification'],
        operation: ['markUnread'],
      },
    },
    description: 'The ID of the notification to mark as unread',
  },
];
