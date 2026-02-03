import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { getOperation } from './get.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';
import { addAgentOperation } from './addAgent.operation';
import { deleteAgentOperation } from './deleteAgent.operation';
import { getMembersOperation } from './getMembers.operation';
import { updateAgentsOperation } from './updateAgents.operation';

export const teamOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['team'],
    },
  },
  options: [
    {
      name: 'Add Agent',
      value: 'addAgent',
      description: 'Add agents to a team',
      action: 'Add agents to team',
    },
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new team',
      action: 'Create a team',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete a team',
      action: 'Delete a team',
    },
    {
      name: 'Delete Agent',
      value: 'deleteAgent',
      description: 'Remove agents from a team',
      action: 'Remove agents from team',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get a team by ID',
      action: 'Get a team',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get all teams in the account',
      action: 'Get all teams',
    },
    {
      name: 'Get Members',
      value: 'getMembers',
      description: 'Get all members of a team',
      action: 'Get team members',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update a team',
      action: 'Update a team',
    },
    {
      name: 'Update Agents',
      value: 'updateAgents',
      description: 'Replace all team members with new list',
      action: 'Update team agents',
    },
  ],
  default: 'getAll',
};

export const teamFields: INodeProperties[] = [
  ...getAllOperation,
  ...getOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
  ...addAgentOperation,
  ...deleteAgentOperation,
  ...getMembersOperation,
  ...updateAgentsOperation,
];
