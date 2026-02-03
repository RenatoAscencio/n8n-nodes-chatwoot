import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Attribute Display Name',
    name: 'attributeDisplayName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['customAttribute'],
        operation: ['create'],
      },
    },
    description: 'Display name of the custom attribute (shown in UI)',
  },
  {
    displayName: 'Attribute Key',
    name: 'attributeKey',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'company_size',
    displayOptions: {
      show: {
        resource: ['customAttribute'],
        operation: ['create'],
      },
    },
    description: 'Unique key for the attribute (snake_case, no spaces)',
  },
  {
    displayName: 'Attribute Model',
    name: 'attributeModel',
    type: 'options',
    required: true,
    options: [
      {
        name: 'Contact Attribute',
        value: 'contact_attribute',
        description: 'Custom attribute for contacts',
      },
      {
        name: 'Conversation Attribute',
        value: 'conversation_attribute',
        description: 'Custom attribute for conversations',
      },
    ],
    default: 'contact_attribute',
    displayOptions: {
      show: {
        resource: ['customAttribute'],
        operation: ['create'],
      },
    },
    description: 'The model this attribute applies to',
  },
  {
    displayName: 'Attribute Type',
    name: 'attributeDisplayType',
    type: 'options',
    required: true,
    options: [
      { name: 'Text', value: 'text' },
      { name: 'Number', value: 'number' },
      { name: 'Currency', value: 'currency' },
      { name: 'Percent', value: 'percent' },
      { name: 'Link', value: 'link' },
      { name: 'Date', value: 'date' },
      { name: 'List', value: 'list' },
      { name: 'Checkbox', value: 'checkbox' },
    ],
    default: 'text',
    displayOptions: {
      show: {
        resource: ['customAttribute'],
        operation: ['create'],
      },
    },
    description: 'The data type of the attribute',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['customAttribute'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'attribute_description',
        type: 'string',
        default: '',
        description: 'Description of the custom attribute',
      },
      {
        displayName: 'Default Value',
        name: 'default_value',
        type: 'string',
        default: '',
        description: 'Default value for the attribute',
      },
      {
        displayName: 'List Values',
        name: 'attribute_values',
        type: 'string',
        default: '',
        placeholder: 'value1,value2,value3',
        description: 'Comma-separated list of values (only for "List" type)',
      },
    ],
  },
];
