import type { INodeProperties } from 'n8n-workflow';
import { createPortalOperation } from './createPortal.operation';
import { getPortalOperation } from './getPortal.operation';
import { updatePortalOperation } from './updatePortal.operation';
import { createCategoryOperation } from './createCategory.operation';
import { createArticleOperation } from './createArticle.operation';

export const helpCenterOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['helpCenter'],
    },
  },
  options: [
    {
      name: 'Create Article',
      value: 'createArticle',
      description: 'Create a new help center article',
      action: 'Create article',
    },
    {
      name: 'Create Category',
      value: 'createCategory',
      description: 'Create a new help center category',
      action: 'Create category',
    },
    {
      name: 'Create Portal',
      value: 'createPortal',
      description: 'Create a new help center portal',
      action: 'Create portal',
    },
    {
      name: 'Get Portal',
      value: 'getPortal',
      description: 'Get a help center portal',
      action: 'Get portal',
    },
    {
      name: 'Update Portal',
      value: 'updatePortal',
      description: 'Update a help center portal',
      action: 'Update portal',
    },
  ],
  default: 'getPortal',
};

export const helpCenterFields: INodeProperties[] = [
  ...createPortalOperation,
  ...getPortalOperation,
  ...updatePortalOperation,
  ...createCategoryOperation,
  ...createArticleOperation,
];
