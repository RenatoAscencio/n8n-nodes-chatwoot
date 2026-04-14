import type { INodeProperties } from 'n8n-workflow';

export const snoozeOperation: INodeProperties[] = [
  {
    displayName: 'Notification ID',
    name: 'notificationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['notification'],
        operation: ['snooze'],
      },
    },
    description: 'The ID of the notification to snooze',
  },
  {
    displayName: 'Snoozed Until',
    name: 'snoozedUntil',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['notification'],
        operation: ['snooze'],
      },
    },
    description: 'When the notification should un-snooze',
  },
];
