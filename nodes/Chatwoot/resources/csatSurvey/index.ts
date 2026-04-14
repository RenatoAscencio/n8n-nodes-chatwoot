import type { INodeProperties } from 'n8n-workflow';
import { downloadOperation } from './download.operation';
import { getOperation } from './get.operation';
import { metricsOperation } from './metrics.operation';

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
      name: 'Download',
      value: 'download',
      description: 'Download CSAT survey responses as CSV',
      action: 'Download CSAT responses',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get CSAT survey for a conversation',
      action: 'Get CSAT survey',
    },
    {
      name: 'Metrics',
      value: 'metrics',
      description: 'Get CSAT survey metrics summary',
      action: 'Get CSAT metrics',
    },
  ],
  default: 'get',
};

export const csatSurveyFields: INodeProperties[] = [
  ...downloadOperation,
  ...getOperation,
  ...metricsOperation,
];
