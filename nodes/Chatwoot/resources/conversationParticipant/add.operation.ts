import type { INodeProperties } from 'n8n-workflow';

export const addOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['conversationParticipant'], operation: ['add'] } },
    description: 'The ID of the conversation',
  },
  {
    displayName: 'User IDs',
    name: 'userIds',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['conversationParticipant'], operation: ['add'] } },
    description: 'Comma-separated list of user IDs to add as participants',
  },
];
