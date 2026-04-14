import type { INodeProperties } from 'n8n-workflow';
import { searchAllOperation } from './searchAll.operation';
import { searchConversationsOperation } from './searchConversations.operation';
import { searchContactsOperation } from './searchContacts.operation';
import { searchMessagesOperation } from './searchMessages.operation';

export const searchOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['search'] } },
  options: [
    { name: 'Search All', value: 'searchAll', description: 'Search across all entities', action: 'Search all' },
    { name: 'Search Contacts', value: 'searchContacts', description: 'Search contacts', action: 'Search contacts' },
    { name: 'Search Conversations', value: 'searchConversations', description: 'Search conversations', action: 'Search conversations' },
    { name: 'Search Messages', value: 'searchMessages', description: 'Search messages', action: 'Search messages' },
  ],
  default: 'searchAll',
};

export const searchFields: INodeProperties[] = [
  ...searchAllOperation,
  ...searchConversationsOperation,
  ...searchContactsOperation,
  ...searchMessagesOperation,
];
