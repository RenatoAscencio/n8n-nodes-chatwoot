import type { INodeProperties } from 'n8n-workflow';

export const automationRuleOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['automationRule'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create an automation rule',
      action: 'Create an automation rule',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete an automation rule',
      action: 'Delete an automation rule',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get an automation rule by ID',
      action: 'Get an automation rule',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get all automation rules',
      action: 'Get all automation rules',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update an automation rule',
      action: 'Update an automation rule',
    },
  ],
  default: 'getAll',
};

export const automationRuleFields: INodeProperties[] = [
  // Get/Update/Delete
  {
    displayName: 'Automation Rule ID',
    name: 'automationRuleId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['automationRule'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'ID of the automation rule',
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
        resource: ['automationRule'],
        operation: ['create'],
      },
    },
    description: 'Name of the automation rule',
  },
  {
    displayName: 'Event Name',
    name: 'eventName',
    type: 'options',
    required: true,
    options: [
      { name: 'Conversation Created', value: 'conversation_created' },
      { name: 'Conversation Updated', value: 'conversation_updated' },
      { name: 'Conversation Opened', value: 'conversation_opened' },
      { name: 'Message Created', value: 'message_created' },
    ],
    default: 'conversation_created',
    displayOptions: {
      show: {
        resource: ['automationRule'],
        operation: ['create'],
      },
    },
    description: 'Event that triggers the automation',
  },
  {
    displayName: 'Conditions (JSON)',
    name: 'conditions',
    type: 'json',
    required: true,
    default: '[]',
    displayOptions: {
      show: {
        resource: ['automationRule'],
        operation: ['create'],
      },
    },
    description: 'Array of conditions in JSON format',
  },
  {
    displayName: 'Actions (JSON)',
    name: 'actions',
    type: 'json',
    required: true,
    default: '[]',
    displayOptions: {
      show: {
        resource: ['automationRule'],
        operation: ['create'],
      },
    },
    description: 'Array of actions in JSON format',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['automationRule'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the automation rule',
      },
      {
        displayName: 'Active',
        name: 'active',
        type: 'boolean',
        default: true,
        description: 'Whether the rule is active',
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
        resource: ['automationRule'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the automation rule',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the automation rule',
      },
      {
        displayName: 'Active',
        name: 'active',
        type: 'boolean',
        default: true,
        description: 'Whether the rule is active',
      },
      {
        displayName: 'Conditions (JSON)',
        name: 'conditions',
        type: 'json',
        default: '',
        description: 'Array of conditions in JSON format',
      },
      {
        displayName: 'Actions (JSON)',
        name: 'actions',
        type: 'json',
        default: '',
        description: 'Array of actions in JSON format',
      },
    ],
  },
];
