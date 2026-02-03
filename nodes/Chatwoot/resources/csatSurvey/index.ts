import type { INodeProperties } from 'n8n-workflow';
import { getOperation } from './get.operation';

export const csatSurveyOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['csatSurvey'],
    },
  },
  options: [
    {
      name: 'Get',
      value: 'get',
      description: 'Get CSAT survey for a conversation',
      action: 'Get CSAT survey',
    },
  ],
  default: 'get',
};

export const csatSurveyFields: INodeProperties[] = [...getOperation];
