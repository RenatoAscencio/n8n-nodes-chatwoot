import type { INodeProperties } from 'n8n-workflow';

export const getOperation: INodeProperties[] = [
  {
    displayName: 'Custom Attribute ID',
    name: 'customAttributeId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['customAttribute'],
        operation: ['get'],
      },
    },
    description: 'ID of the custom attribute to retrieve',
  },
];
