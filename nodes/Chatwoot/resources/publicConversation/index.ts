import type { INodeProperties } from 'n8n-workflow';
import { createOperation } from './create.operation';
import { getOperation } from './get.operation';
import { getAllOperation } from './getAll.operation';
import { resolveOperation } from './resolve.operation';
import { toggleTypingOperation } from './toggleTyping.operation';
import { updateLastSeenOperation } from './updateLastSeen.operation';

export const publicConversationOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['publicConversation'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new conversation via public API',
      action: 'Create public conversation',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get a conversation',
      action: 'Get public conversation',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'List conversations for a contact',
      action: 'Get public conversations',
    },
    {
      name: 'Resolve',
      value: 'resolve',
      description: 'Toggle conversation resolved status',
      action: 'Resolve public conversation',
    },
    {
      name: 'Toggle Typing',
      value: 'toggleTyping',
      description: 'Toggle typing indicator',
      action: 'Toggle typing indicator',
    },
    {
      name: 'Update Last Seen',
      value: 'updateLastSeen',
      description: 'Update last seen timestamp',
      action: 'Update last seen',
    },
  ],
  default: 'getAll',
};

export const publicConversationFields: INodeProperties[] = [
  ...createOperation,
  ...getOperation,
  ...getAllOperation,
  ...resolveOperation,
  ...toggleTypingOperation,
  ...updateLastSeenOperation,
];
