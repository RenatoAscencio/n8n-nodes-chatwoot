import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Inbox',
    name: 'inboxId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getInboxes',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['inbox'],
        operation: ['update'],
      },
    },
    description: 'Select the inbox to update. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['inbox'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the inbox',
      },
      {
        displayName: 'Enable Auto Assignment',
        name: 'enable_auto_assignment',
        type: 'boolean',
        default: true,
        description: 'Whether to automatically assign conversations to agents',
      },
      {
        displayName: 'Greeting Enabled',
        name: 'greeting_enabled',
        type: 'boolean',
        default: false,
        description: 'Whether to show a greeting message to visitors',
      },
      {
        displayName: 'Greeting Message',
        name: 'greeting_message',
        type: 'string',
        typeOptions: {
          rows: 3,
        },
        default: '',
        description: 'Greeting message shown to visitors',
      },
      {
        displayName: 'Enable Email Collect',
        name: 'enable_email_collect',
        type: 'boolean',
        default: true,
        description: 'Whether to prompt visitors for email before starting a conversation',
      },
      {
        displayName: 'CSAT Survey Enabled',
        name: 'csat_survey_enabled',
        type: 'boolean',
        default: false,
        description: 'Whether to show customer satisfaction survey after conversation resolution',
      },
      {
        displayName: 'Allow Messages After Resolved',
        name: 'allow_messages_after_resolved',
        type: 'boolean',
        default: true,
        description: 'Whether contacts can send messages after conversation is resolved',
      },
      {
        displayName: 'Working Hours Enabled',
        name: 'working_hours_enabled',
        type: 'boolean',
        default: false,
        description: 'Whether to enable working hours for this inbox',
      },
      {
        displayName: 'Out of Office Message',
        name: 'out_of_office_message',
        type: 'string',
        typeOptions: {
          rows: 3,
        },
        default: '',
        description: 'Message shown to visitors outside working hours',
      },
      {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
        default: '',
        placeholder: 'America/New_York',
        description: 'Timezone for working hours (e.g., America/New_York, Europe/London)',
      },
      {
        displayName: 'Business Name',
        name: 'business_name',
        type: 'string',
        default: '',
        description: 'Business name displayed in the widget',
      },
      {
        displayName: 'Welcome Title',
        name: 'welcome_title',
        type: 'string',
        default: '',
        description: 'Welcome title shown in the widget',
      },
      {
        displayName: 'Welcome Tagline',
        name: 'welcome_tagline',
        type: 'string',
        default: '',
        description: 'Welcome tagline shown in the widget',
      },
      {
        displayName: 'Website URL',
        name: 'website_url',
        type: 'string',
        default: '',
        description: 'Website URL associated with this inbox',
      },
    ],
  },
];
