import type { INodeProperties } from 'n8n-workflow';

export const contactableInboxesOperation: INodeProperties[] = [
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['contactableInboxes'],
      },
    },
    description: 'The ID of the contact to get contactable inboxes for',
  },
];
