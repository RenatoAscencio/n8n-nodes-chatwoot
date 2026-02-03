import type { INodeProperties } from 'n8n-workflow';

export const agentBotOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['agentBot'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new agent bot',
      action: 'Create an agent bot',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete an agent bot',
      action: 'Delete an agent bot',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get an agent bot by ID',
      action: 'Get an agent bot',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get all agent bots',
      action: 'Get all agent bots',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update an agent bot',
      action: 'Update an agent bot',
    },
  ],
  default: 'getAll',
};

export const agentBotFields: INodeProperties[] = [
  // Get
  {
    displayName: 'Agent Bot ID',
    name: 'agentBotId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['agentBot'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'ID of the agent bot',
  },
  // Create
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['agentBot'],
        operation: ['create'],
      },
    },
    description: 'Name of the agent bot',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['agentBot'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the agent bot',
      },
      {
        displayName: 'Outgoing URL',
        name: 'outgoing_url',
        type: 'string',
        default: '',
        description: 'Webhook URL for the agent bot',
      },
    ],
  },
  // Update
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['agentBot'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the agent bot',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the agent bot',
      },
      {
        displayName: 'Outgoing URL',
        name: 'outgoing_url',
        type: 'string',
        default: '',
        description: 'Webhook URL for the agent bot',
      },
    ],
  },
];
