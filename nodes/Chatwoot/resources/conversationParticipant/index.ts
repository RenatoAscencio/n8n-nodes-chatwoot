import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { addOperation } from './add.operation';
import { removeOperation } from './remove.operation';

export const conversationParticipantOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['conversationParticipant'] } },
  options: [
    { name: 'Add', value: 'add', description: 'Add participants to a conversation', action: 'Add conversation participants' },
    { name: 'Get Many', value: 'getAll', description: 'Get all participants of a conversation', action: 'Get conversation participants' },
    { name: 'Remove', value: 'remove', description: 'Remove participants from a conversation', action: 'Remove conversation participants' },
  ],
  default: 'getAll',
};

export const conversationParticipantFields: INodeProperties[] = [
  ...getAllOperation,
  ...addOperation,
  ...removeOperation,
];
