import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['campaign'], operation: ['create'] } },
    description: 'Title of the campaign',
  },
  {
    displayName: 'Message',
    name: 'message',
    type: 'string',
    required: true,
    default: '',
    typeOptions: { rows: 3 },
    displayOptions: { show: { resource: ['campaign'], operation: ['create'] } },
    description: 'Campaign message content',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['campaign'], operation: ['create'] } },
    options: [
      {
        displayName: 'Inbox ID',
        name: 'inbox_id',
        type: 'number',
        default: 0,
        description: 'Inbox ID for the campaign',
      },
      {
        displayName: 'Scheduled At',
        name: 'scheduled_at',
        type: 'dateTime',
        default: '',
        description: 'When to send the campaign',
      },
      {
        displayName: 'Audience (JSON)',
        name: 'audience',
        type: 'json',
        default: '[]',
        description: 'Target audience filter conditions',
      },
    ],
  },
];
