import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { markReadOperation } from './markRead.operation';
import { deleteOperation } from './delete.operation';
import { readAllOperation } from './readAll.operation';
import { unreadCountOperation } from './unreadCount.operation';
import { markUnreadOperation } from './markUnread.operation';
import { snoozeOperation } from './snooze.operation';

export const notificationOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['notification'],
    },
  },
  options: [
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete a notification',
      action: 'Delete a notification',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get all notifications',
      action: 'Get many notifications',
    },
    {
      name: 'Mark All Read',
      value: 'readAll',
      description: 'Mark all notifications as read',
      action: 'Mark all notifications read',
    },
    {
      name: 'Mark Read',
      value: 'markRead',
      description: 'Mark a notification as read',
      action: 'Mark notification read',
    },
    {
      name: 'Mark Unread',
      value: 'markUnread',
      description: 'Mark a notification as unread',
      action: 'Mark notification unread',
    },
    {
      name: 'Snooze',
      value: 'snooze',
      description: 'Snooze a notification until a specified time',
      action: 'Snooze a notification',
    },
    {
      name: 'Unread Count',
      value: 'unreadCount',
      description: 'Get count of unread notifications',
      action: 'Get unread notification count',
    },
  ],
  default: 'getAll',
};

export const notificationFields: INodeProperties[] = [
  ...getAllOperation,
  ...markReadOperation,
  ...deleteOperation,
  ...readAllOperation,
  ...unreadCountOperation,
  ...markUnreadOperation,
  ...snoozeOperation,
];
