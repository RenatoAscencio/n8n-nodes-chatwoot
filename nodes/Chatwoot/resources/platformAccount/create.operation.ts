import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Account Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['platformAccount'],
        operation: ['create'],
      },
    },
    description: 'Name of the account',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['platformAccount'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Domain',
        name: 'domain',
        type: 'string',
        default: '',
        description: 'Domain for the account',
      },
      {
        displayName: 'Locale',
        name: 'locale',
        type: 'string',
        default: 'en',
        description: 'Locale for the account',
      },
      {
        displayName: 'Support Email',
        name: 'support_email',
        type: 'string',
        default: '',
        description: 'Support email for the account',
      },
    ],
  },
];
