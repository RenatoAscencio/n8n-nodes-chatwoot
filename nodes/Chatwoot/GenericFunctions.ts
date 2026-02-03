import type {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  ILoadOptionsFunctions,
  INodePropertyOptions,
  IRequestOptions,
  JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

// ============================================================================
// Types
// ============================================================================

export type ApiType = 'application' | 'platform' | 'public';

export interface ApiRequestOptions {
  apiType?: ApiType;
  inboxIdentifier?: string;
  contactIdentifier?: string;
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Normalize base URL by removing trailing slashes and whitespace
 */
function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.trim().replace(/\/+$/, '');
}

/**
 * Map Chatwoot HTTP error codes to user-friendly messages
 */
function getErrorMessage(statusCode: number, defaultMessage: string): string {
  const errorMessages: Record<number, string> = {
    400: 'Bad Request: The request was invalid. Please check your input parameters.',
    401: 'Unauthorized: Invalid API token. Please verify your API Access Token in Chatwoot Profile Settings.',
    403: 'Forbidden: You do not have permission to access this resource. Check your user role and inbox permissions.',
    404: 'Not Found: The requested resource does not exist. Please verify the ID is correct.',
    422: 'Unprocessable Entity: The request data is invalid. Please check required fields and data formats.',
    429: 'Rate Limited: Too many requests. Please wait before making more requests (limit: 60/minute).',
    500: 'Server Error: Chatwoot server encountered an error. Please try again later.',
    502: 'Bad Gateway: Chatwoot server is temporarily unavailable. Please try again later.',
    503: 'Service Unavailable: Chatwoot is undergoing maintenance. Please try again later.',
  };

  return errorMessages[statusCode] || defaultMessage;
}

// ============================================================================
// Application API (Account-level operations)
// ============================================================================

/**
 * Make an authenticated request to the Chatwoot Application API
 */
export async function chatwootApiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
  const credentials = await this.getCredentials('chatwootApi');

  const baseUrl = normalizeBaseUrl(credentials.baseUrl as string);
  const accountId = credentials.accountId as number;

  const options: IRequestOptions = {
    method,
    uri: `${baseUrl}/api/v1/accounts/${accountId}${endpoint}`,
    headers: {
      api_access_token: credentials.apiAccessToken as string,
      'Content-Type': 'application/json',
    },
    qs,
    body,
    json: true,
  };

  // Remove empty body for GET/DELETE requests
  if (method === 'GET' || method === 'DELETE' || Object.keys(body).length === 0) {
    delete options.body;
  }

  // Remove empty query string parameters
  if (Object.keys(qs).length === 0) {
    delete options.qs;
  }

  try {
    const response = await this.helpers.request(options);
    return response as IDataObject | IDataObject[];
  } catch (error) {
    const statusCode = (error as JsonObject).statusCode as number;
    const message = getErrorMessage(
      statusCode,
      (error as Error).message || 'An unexpected error occurred',
    );

    throw new NodeApiError(this.getNode(), error as JsonObject, {
      message,
      description: `Failed to ${method} ${endpoint}`,
      httpCode: statusCode?.toString(),
    });
  }
}

// ============================================================================
// Platform API (Super Admin operations)
// ============================================================================

/**
 * Make an authenticated request to the Chatwoot Platform API
 * Platform API is used for super admin operations (creating accounts, users, etc.)
 */
export async function chatwootPlatformApiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
  const credentials = await this.getCredentials('chatwootPlatformApi');

  const baseUrl = normalizeBaseUrl(credentials.baseUrl as string);

  const options: IRequestOptions = {
    method,
    uri: `${baseUrl}/platform/api/v1${endpoint}`,
    headers: {
      api_access_token: credentials.apiAccessToken as string,
      'Content-Type': 'application/json',
    },
    qs,
    body,
    json: true,
  };

  // Remove empty body for GET/DELETE requests
  if (method === 'GET' || method === 'DELETE' || Object.keys(body).length === 0) {
    delete options.body;
  }

  // Remove empty query string parameters
  if (Object.keys(qs).length === 0) {
    delete options.qs;
  }

  try {
    const response = await this.helpers.request(options);
    return response as IDataObject | IDataObject[];
  } catch (error) {
    const statusCode = (error as JsonObject).statusCode as number;
    const message = getErrorMessage(
      statusCode,
      (error as Error).message || 'An unexpected error occurred',
    );

    throw new NodeApiError(this.getNode(), error as JsonObject, {
      message,
      description: `Platform API: Failed to ${method} ${endpoint}`,
      httpCode: statusCode?.toString(),
    });
  }
}

// ============================================================================
// Public API (Client/Widget operations)
// ============================================================================

/**
 * Make a request to the Chatwoot Public API
 * Public API is used for client-facing operations (website widgets, etc.)
 */
export async function chatwootPublicApiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
  const credentials = await this.getCredentials('chatwootPublicApi');

  const baseUrl = normalizeBaseUrl(credentials.baseUrl as string);

  const options: IRequestOptions = {
    method,
    uri: `${baseUrl}/public/api/v1${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
    },
    qs,
    body,
    json: true,
  };

  // Remove empty body for GET/DELETE requests
  if (method === 'GET' || method === 'DELETE' || Object.keys(body).length === 0) {
    delete options.body;
  }

  // Remove empty query string parameters
  if (Object.keys(qs).length === 0) {
    delete options.qs;
  }

  try {
    const response = await this.helpers.request(options);
    return response as IDataObject | IDataObject[];
  } catch (error) {
    const statusCode = (error as JsonObject).statusCode as number;
    const message = getErrorMessage(
      statusCode,
      (error as Error).message || 'An unexpected error occurred',
    );

    throw new NodeApiError(this.getNode(), error as JsonObject, {
      message,
      description: `Public API: Failed to ${method} ${endpoint}`,
      httpCode: statusCode?.toString(),
    });
  }
}

// ============================================================================
// Pagination Helpers
// ============================================================================

/**
 * Handle page-based pagination for list endpoints
 * Returns all items across all pages
 */
export async function chatwootApiRequestAllItems(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
  propertyName = 'payload',
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];
  let page = 1;
  const perPage = 25; // Use a reasonable page size

  qs.page = page;

  let responseData: IDataObject;
  let items: IDataObject[];

  do {
    qs.page = page;
    responseData = (await chatwootApiRequest.call(this, method, endpoint, body, qs)) as IDataObject;

    // Handle different response formats
    if (responseData[propertyName] && Array.isArray(responseData[propertyName])) {
      items = responseData[propertyName] as IDataObject[];
    } else if (responseData.data && Array.isArray(responseData.data)) {
      items = responseData.data as IDataObject[];
    } else if (Array.isArray(responseData)) {
      items = responseData;
    } else {
      items = [];
    }

    returnData.push(...items);
    page++;

    // Check if we've reached the end based on meta information or item count
    const meta = responseData.meta as IDataObject | undefined;
    if (meta) {
      const totalPages = meta.total_pages as number | undefined;
      const currentPage = meta.current_page as number | undefined;
      if (totalPages && currentPage && currentPage >= totalPages) {
        break;
      }
    }

    // If we got fewer items than the page size, we've reached the end
    if (items.length < perPage) {
      break;
    }

    // Safety limit to prevent infinite loops
    if (page > 100) {
      break;
    }
  } while (items.length > 0);

  return returnData;
}

/**
 * Handle page-based pagination for Platform API endpoints
 */
export async function chatwootPlatformApiRequestAllItems(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
  propertyName = 'payload',
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];
  let page = 1;
  const perPage = 25;

  qs.page = page;

  let responseData: IDataObject;
  let items: IDataObject[];

  do {
    qs.page = page;
    responseData = (await chatwootPlatformApiRequest.call(this, method, endpoint, body, qs)) as IDataObject;

    if (responseData[propertyName] && Array.isArray(responseData[propertyName])) {
      items = responseData[propertyName] as IDataObject[];
    } else if (responseData.data && Array.isArray(responseData.data)) {
      items = responseData.data as IDataObject[];
    } else if (Array.isArray(responseData)) {
      items = responseData;
    } else {
      items = [];
    }

    returnData.push(...items);
    page++;

    if (items.length < perPage || page > 100) {
      break;
    }
  } while (items.length > 0);

  return returnData;
}

/**
 * Handle cursor-based pagination for messages endpoint
 * Uses 'before' parameter with message ID
 */
export async function chatwootApiRequestAllMessages(
  this: IExecuteFunctions,
  conversationId: number,
  limit?: number,
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];
  let before: number | undefined;
  const perRequest = 20; // Chatwoot returns 20 messages per request
  let hasMore = true;

  while (hasMore) {
    const qs: IDataObject = {};
    if (before) {
      qs.before = before;
    }

    const response = (await chatwootApiRequest.call(
      this,
      'GET',
      `/conversations/${conversationId}/messages`,
      {},
      qs,
    )) as IDataObject;

    // Extract messages from response
    let messages: IDataObject[];
    if (response.payload && Array.isArray(response.payload)) {
      messages = response.payload as IDataObject[];
    } else if (Array.isArray(response)) {
      messages = response;
    } else {
      messages = [];
    }

    if (messages.length === 0) {
      hasMore = false;
      break;
    }

    returnData.push(...messages);

    // Get the ID of the oldest message for the next cursor
    const oldestMessage = messages[messages.length - 1];
    before = oldestMessage.id as number;

    // Check if we've reached the limit
    if (limit && returnData.length >= limit) {
      return returnData.slice(0, limit);
    }

    // If we got fewer messages than expected, we've reached the beginning
    if (messages.length < perRequest) {
      hasMore = false;
    }

    // Safety limit
    if (returnData.length > 10000) {
      hasMore = false;
    }
  }

  return returnData;
}

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Simplify the response by extracting only essential fields
 */
export function simplifyResponse(items: IDataObject[], fieldsToKeep: string[]): IDataObject[] {
  return items.map((item) => {
    const simplified: IDataObject = {};
    for (const field of fieldsToKeep) {
      if (item[field] !== undefined) {
        simplified[field] = item[field];
      }
    }
    return simplified;
  });
}

/**
 * Validate that a required number parameter is a positive integer
 */
export function validateId(value: unknown, fieldName: string): number {
  const num = Number(value);
  if (isNaN(num) || num < 1 || !Number.isInteger(num)) {
    throw new Error(`${fieldName} must be a positive integer`);
  }
  return num;
}

/**
 * Validate that a string is not empty
 */
export function validateString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${fieldName} must be a non-empty string`);
  }
  return value.trim();
}

// ============================================================================
// LoadOptions Methods
// ============================================================================

/**
 * Load agents for dropdown selection
 */
export async function getAgents(
  this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];

  try {
    const agents = (await chatwootApiRequest.call(this, 'GET', '/agents')) as IDataObject[];

    for (const agent of agents) {
      returnData.push({
        name: `${agent.name} (${agent.email})`,
        value: agent.id as number,
      });
    }
  } catch {
    // Return empty array on error, don't break the UI
  }

  return returnData;
}

/**
 * Load teams for dropdown selection
 */
export async function getTeams(
  this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];

  try {
    const teams = (await chatwootApiRequest.call(this, 'GET', '/teams')) as IDataObject[];

    for (const team of teams) {
      returnData.push({
        name: team.name as string,
        value: team.id as number,
      });
    }
  } catch {
    // Return empty array on error, don't break the UI
  }

  return returnData;
}

/**
 * Load inboxes for dropdown selection
 */
export async function getInboxes(
  this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];

  try {
    const response = (await chatwootApiRequest.call(this, 'GET', '/inboxes')) as IDataObject;
    const inboxes = (response.payload || response) as IDataObject[];

    if (Array.isArray(inboxes)) {
      for (const inbox of inboxes) {
        const channelType = inbox.channel_type as string;
        returnData.push({
          name: `${inbox.name} (${channelType})`,
          value: inbox.id as number,
        });
      }
    }
  } catch {
    // Return empty array on error, don't break the UI
  }

  return returnData;
}

/**
 * Load labels for dropdown selection
 */
export async function getLabels(
  this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];

  try {
    const response = (await chatwootApiRequest.call(this, 'GET', '/labels')) as IDataObject;
    const labels = (response.payload || response) as IDataObject[];

    if (Array.isArray(labels)) {
      for (const label of labels) {
        returnData.push({
          name: label.title as string,
          value: label.title as string, // Chatwoot uses label titles, not IDs
        });
      }
    }
  } catch {
    // Return empty array on error, don't break the UI
  }

  return returnData;
}

/**
 * Load portals for dropdown selection (Help Center)
 */
export async function getPortals(
  this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];

  try {
    const response = (await chatwootApiRequest.call(this, 'GET', '/portals')) as IDataObject;
    const portals = (response.payload || response) as IDataObject[];

    if (Array.isArray(portals)) {
      for (const portal of portals) {
        returnData.push({
          name: portal.name as string,
          value: portal.slug as string,
        });
      }
    }
  } catch {
    // Return empty array on error
  }

  return returnData;
}

/**
 * Load categories for dropdown selection (Help Center)
 */
export async function getCategories(
  this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];

  try {
    // This would need the portal slug to work, so we return empty for now
    // In practice, categories are loaded dynamically based on selected portal
  } catch {
    // Return empty array on error
  }

  return returnData;
}

/**
 * Load agent bots for dropdown selection
 */
export async function getAgentBots(
  this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];

  try {
    const agentBots = (await chatwootApiRequest.call(this, 'GET', '/agent_bots')) as IDataObject[];

    for (const bot of agentBots) {
      returnData.push({
        name: bot.name as string,
        value: bot.id as number,
      });
    }
  } catch {
    // Return empty array on error
  }

  return returnData;
}

/**
 * Load integrations for dropdown selection
 */
export async function getIntegrations(
  this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
  const returnData: INodePropertyOptions[] = [];

  try {
    const response = (await chatwootApiRequest.call(this, 'GET', '/integrations/apps')) as IDataObject;
    const integrations = (response.payload || response) as IDataObject[];

    if (Array.isArray(integrations)) {
      for (const integration of integrations) {
        returnData.push({
          name: integration.name as string,
          value: integration.id as string,
        });
      }
    }
  } catch {
    // Return empty array on error
  }

  return returnData;
}
