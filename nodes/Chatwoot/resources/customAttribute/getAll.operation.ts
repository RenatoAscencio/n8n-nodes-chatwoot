import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [
  {
    displayName: 'Attribute Model',
    name: 'attributeModel',
    type: 'options',
    required: true,
    options: [
      {
        name: 'Contact Attribute',
        value: 'contact_attribute',
        description: 'Custom attributes for contacts',
      },
      {
        name: 'Conversation Attribute',
        value: 'conversation_attribute',
        description: 'Custom attributes for conversations',
      },
    ],
    default: 'contact_attribute',
    displayOptions: {
      show: {
        resource: ['customAttribute'],
        operation: ['getAll'],
      },
    },
    description: 'The model type for custom attributes',
  },
];
