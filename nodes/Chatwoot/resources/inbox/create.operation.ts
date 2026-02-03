import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['inbox'],
        operation: ['create'],
      },
    },
    description: 'Name of the inbox',
  },
  {
    displayName: 'Channel Type',
    name: 'channelType',
    type: 'options',
    required: true,
    options: [
      { name: 'API', value: 'api' },
      { name: 'Email', value: 'email' },
      { name: 'Web Widget', value: 'web_widget' },
    ],
    default: 'api',
    displayOptions: {
      show: {
        resource: ['inbox'],
        operation: ['create'],
      },
    },
    description: 'Type of channel for this inbox',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['inbox'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Avatar URL',
        name: 'avatar_url',
        type: 'string',
        default: '',
        description: 'URL for the inbox avatar',
      },
      {
        displayName: 'Greeting Enabled',
        name: 'greeting_enabled',
        type: 'boolean',
        default: false,
        description: 'Whether to enable greeting messages',
      },
      {
        displayName: 'Greeting Message',
        name: 'greeting_message',
        type: 'string',
        default: '',
        description: 'The greeting message to display',
      },
      {
        displayName: 'Enable Email Collect',
        name: 'enable_email_collect',
        type: 'boolean',
        default: true,
        description: 'Whether to collect email from visitors',
      },
      {
        displayName: 'CSAT Survey Enabled',
        name: 'csat_survey_enabled',
        type: 'boolean',
        default: false,
        description: 'Whether to enable CSAT survey',
      },
      {
        displayName: 'Allow Messages After Resolved',
        name: 'allow_messages_after_resolved',
        type: 'boolean',
        default: true,
        description: 'Whether to allow messages after conversation is resolved',
      },
      {
        displayName: 'Working Hours Enabled',
        name: 'working_hours_enabled',
        type: 'boolean',
        default: false,
        description: 'Whether to enable working hours',
      },
      {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
        default: 'UTC',
        description: 'Timezone for the inbox',
      },
    ],
  },
];
