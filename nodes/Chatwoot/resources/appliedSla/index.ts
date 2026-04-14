import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { metricsOperation } from './metrics.operation';
import { downloadOperation } from './download.operation';

export const appliedSlaOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['appliedSla'] } },
  options: [
    { name: 'Download', value: 'download', description: 'Download breached conversations CSV (Enterprise)', action: 'Download applied SLAs' },
    { name: 'Get Many', value: 'getAll', description: 'List applied SLAs (Enterprise)', action: 'Get many applied SLAs' },
    { name: 'Metrics', value: 'metrics', description: 'Get SLA hit rate metrics (Enterprise)', action: 'Get SLA metrics' },
  ],
  default: 'getAll',
};

export const appliedSlaFields: INodeProperties[] = [
  ...getAllOperation,
  ...metricsOperation,
  ...downloadOperation,
];
