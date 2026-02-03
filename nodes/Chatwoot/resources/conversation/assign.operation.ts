import type { INodeProperties } from 'n8n-workflow';

export const assignOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['assign'],
      },
    },
    description: 'ID of the conversation to assign',
  },
  {
    displayName: 'Assignment Type',
    name: 'assignmentType',
    type: 'options',
    required: true,
    options: [
      {
        name: 'Agent',
        value: 'agent',
        description: 'Assign to a specific agent',
      },
      {
        name: 'Team',
        value: 'team',
        description: 'Assign to a team',
      },
      {
        name: 'Unassign',
        value: 'unassign',
        description: 'Remove current assignment',
      },
    ],
    default: 'agent',
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['assign'],
      },
    },
    description: 'Type of assignment to make',
  },
  {
    displayName: 'Agent',
    name: 'assigneeId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getAgents',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['assign'],
        assignmentType: ['agent'],
      },
    },
    description: 'Select the agent to assign. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Team',
    name: 'teamId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getTeams',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['conversation'],
        operation: ['assign'],
        assignmentType: ['team'],
      },
    },
    description: 'Select the team to assign. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
];
