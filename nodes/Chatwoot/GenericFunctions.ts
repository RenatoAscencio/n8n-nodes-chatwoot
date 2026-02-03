import type {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  ILoadOptionsFunctions,
  IRequestOptions,
  JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

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

/**
 * Make an authenticated request to the Chatwoot API
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
