import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
  {
    displayName: 'Agent',
    name: 'agentId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getAgents',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['agent'],
        operation: ['delete'],
      },
    },
    description: 'Select the agent to delete. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
];
