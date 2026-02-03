import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['account'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the account',
      },
      {
        displayName: 'Locale',
        name: 'locale',
        type: 'options',
        options: [
          { name: 'English', value: 'en' },
          { name: 'Spanish', value: 'es' },
          { name: 'Portuguese', value: 'pt' },
          { name: 'French', value: 'fr' },
          { name: 'German', value: 'de' },
          { name: 'Italian', value: 'it' },
          { name: 'Japanese', value: 'ja' },
          { name: 'Korean', value: 'ko' },
          { name: 'Chinese', value: 'zh' },
          { name: 'Arabic', value: 'ar' },
          { name: 'Hindi', value: 'hi' },
          { name: 'Russian', value: 'ru' },
        ],
        default: 'en',
        description: 'Account locale/language',
      },
      {
        displayName: 'Domain',
        name: 'domain',
        type: 'string',
        default: '',
        description: 'Domain associated with the account',
      },
      {
        displayName: 'Support Email',
        name: 'support_email',
        type: 'string',
        placeholder: 'support@example.com',
        default: '',
        description: 'Support email address for the account',
      },
      {
        displayName: 'Auto Resolve Duration (Days)',
        name: 'auto_resolve_duration',
        type: 'number',
        typeOptions: {
          minValue: 1,
          maxValue: 999,
        },
        default: 0,
        description: 'Number of days after which conversations are auto-resolved. Set to 0 to disable.',
      },
    ],
  },
];
