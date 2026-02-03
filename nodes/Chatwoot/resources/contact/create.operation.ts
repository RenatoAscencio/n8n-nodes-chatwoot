import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Inbox ID',
    name: 'inboxId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    description:
      'The inbox ID to associate the contact with. Find this in Chatwoot under Settings → Inboxes.',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    description: 'Full name of the contact',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Email address of the contact',
      },
      {
        displayName: 'Identifier',
        name: 'identifier',
        type: 'string',
        default: '',
        description:
          'A unique external identifier for the contact from your system (e.g., user ID)',
      },
      {
        displayName: 'Phone Number',
        name: 'phone_number',
        type: 'string',
        placeholder: '+1234567890',
        default: '',
        description: 'Phone number with country code',
      },
      {
        displayName: 'Custom Attributes',
        name: 'custom_attributes',
        type: 'json',
        default: '{}',
        description:
          'Custom attributes as a JSON object (e.g., {"plan": "premium", "company": "Acme Inc"})',
      },
    ],
  },
];
