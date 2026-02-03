import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Custom Attribute ID',
    name: 'customAttributeId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['customAttribute'],
        operation: ['update'],
      },
    },
    description: 'ID of the custom attribute to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['customAttribute'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Display Name',
        name: 'attribute_display_name',
        type: 'string',
        default: '',
        description: 'Display name of the custom attribute',
      },
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
