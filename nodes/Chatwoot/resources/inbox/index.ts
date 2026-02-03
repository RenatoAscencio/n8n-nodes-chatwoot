import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { getOperation } from './get.operation';
import { updateOperation } from './update.operation';
import { createOperation } from './create.operation';
import { addAgentOperation } from './addAgent.operation';
import { deleteAgentOperation } from './deleteAgent.operation';
import { getMembersOperation } from './getMembers.operation';
import { getAgentBotOperation } from './getAgentBot.operation';
import { setAgentBotOperation } from './setAgentBot.operation';

export const inboxOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['inbox'],
    },
  },
  options: [
    {
      name: 'Add Agent',
      value: 'addAgent',
      description: 'Add agents to an inbox',
      action: 'Add agents to inbox',
    },
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new inbox',
      action: 'Create an inbox',
    },
    {
      name: 'Delete Agent',
      value: 'deleteAgent',
      description: 'Remove agents from an inbox',
      action: 'Remove agents from inbox',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get an inbox by ID',
      action: 'Get an inbox',
    },
    {
      name: 'Get Agent Bot',
      value: 'getAgentBot',
      description: 'Get the agent bot assigned to an inbox',
      action: 'Get inbox agent bot',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get all inboxes in the account',
      action: 'Get all inboxes',
    },
    {
      name: 'Get Members',
      value: 'getMembers',
      description: 'Get all agents assigned to an inbox',
      action: 'Get inbox members',
    },
    {
      name: 'Set Agent Bot',
      value: 'setAgentBot',
      description: 'Set or remove agent bot for an inbox',
      action: 'Set inbox agent bot',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update inbox settings',
      action: 'Update an inbox',
    },
  ],
  default: 'getAll',
};

export const inboxFields: INodeProperties[] = [
  ...getAllOperation,
  ...getOperation,
  ...updateOperation,
  ...createOperation,
  ...addAgentOperation,
  ...deleteAgentOperation,
  ...getMembersOperation,
  ...getAgentBotOperation,
  ...setAgentBotOperation,
];
