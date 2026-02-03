# CLAUDE.md - Development Guide for n8n-nodes-chatwoot

## Project Overview

This is an n8n community node package for integrating with Chatwoot, an open-source customer engagement platform. The node provides access to Chatwoot's API for managing conversations, messages, and contacts.

## Quick Start

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint

# Format code
npm run format
```

## Directory Structure

```
n8n-nodes-chatwoot/
├── credentials/
│   └── ChatwootApi.credentials.ts    # Authentication configuration
├── nodes/
│   └── Chatwoot/
│       ├── Chatwoot.node.ts          # Main node with execute logic
│       ├── Chatwoot.node.json        # Node metadata
│       ├── chatwoot.svg              # Node icon
│       ├── GenericFunctions.ts       # API helpers, pagination, error handling
│       ├── types.ts                  # TypeScript interfaces
│       └── resources/
│           ├── conversation/         # Conversation operations
│           ├── message/              # Message operations
│           └── contact/              # Contact operations
├── test/
│   └── GenericFunctions.test.ts      # Unit tests
├── examples/
│   └── workflows/                    # Example n8n workflow JSONs
├── dist/                             # Compiled output (generated)
├── package.json
├── tsconfig.json
└── .eslintrc.js
```

## Key Files

### `Chatwoot.node.ts`
The main node file containing:
- Node description (displayName, icon, credentials, properties)
- Resource and operation definitions
- Execute function with all API logic

### `GenericFunctions.ts`
Shared utilities:
- `chatwootApiRequest()` - Make authenticated API calls
- `chatwootApiRequestAllItems()` - Handle page-based pagination
- `chatwootApiRequestAllMessages()` - Handle cursor-based message pagination
- `validateId()` - Validate positive integer IDs
- Error message mapping for HTTP status codes

### `resources/*/index.ts`
Each resource folder contains:
- `index.ts` - Exports operations and fields
- `*.operation.ts` - Individual operation field definitions

## Adding a New Resource

1. Create folder: `nodes/Chatwoot/resources/newresource/`

2. Create operation files:
```typescript
// get.operation.ts
import type { INodeProperties } from 'n8n-workflow';

export const getOperation: INodeProperties[] = [
  {
    displayName: 'Resource ID',
    name: 'resourceId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['newresource'],
        operation: ['get'],
      },
    },
    description: 'The ID of the resource',
  },
];
```

3. Create index file:
```typescript
// index.ts
import type { INodeProperties } from 'n8n-workflow';
import { getOperation } from './get.operation';

export const newresourceOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['newresource'] } },
  options: [
    { name: 'Get', value: 'get', description: '...', action: '...' },
  ],
  default: 'get',
};

export const newresourceFields: INodeProperties[] = [...getOperation];
```

4. Add to `Chatwoot.node.ts`:
```typescript
import { newresourceOperations, newresourceFields } from './resources/newresource';

// In description.properties:
{
  displayName: 'Resource',
  name: 'resource',
  options: [
    // ... existing options
    { name: 'New Resource', value: 'newresource' },
  ],
}

// Add operations and fields
newresourceOperations,
...newresourceFields,

// In execute function:
else if (resource === 'newresource') {
  if (operation === 'get') {
    // Implementation
  }
}
```

## Adding a New Operation

1. Create `nodes/Chatwoot/resources/resource/newoperation.operation.ts`

2. Define fields with proper `displayOptions`:
```typescript
export const newOperation: INodeProperties[] = [
  {
    displayName: 'Field Name',
    name: 'fieldName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['resource'],
        operation: ['newoperation'],
      },
    },
    description: 'Description here',
  },
];
```

3. Export from `index.ts`

4. Add operation to the operations selector

5. Implement in `Chatwoot.node.ts` execute function

## Chatwoot API Reference

### Base URL Pattern
```
{baseUrl}/api/v1/accounts/{accountId}/{endpoint}
```

### Authentication
Header: `api_access_token: YOUR_TOKEN`

### Pagination Patterns

**Page-based (Conversations, Contacts):**
```typescript
const response = await chatwootApiRequest(this, 'GET', '/contacts', {}, { page: 1 });
// Response: { meta: { current_page, total_pages }, payload: [...] }
```

**Cursor-based (Messages):**
```typescript
const response = await chatwootApiRequest(this, 'GET', `/conversations/${id}/messages`, {}, { before: messageId });
// Response: { payload: [...messages] }
```

### Key Endpoints

| Resource | Endpoint | Method |
|----------|----------|--------|
| Conversations List | `/conversations` | GET |
| Conversation Get | `/conversations/{id}` | GET |
| Conversation Status | `/conversations/{id}/toggle_status` | POST |
| Messages List | `/conversations/{id}/messages` | GET |
| Message Create | `/conversations/{id}/messages` | POST |
| Contacts List | `/contacts` | GET |
| Contact Get | `/contacts/{id}` | GET |
| Contact Create | `/contacts` | POST |
| Contact Update | `/contacts/{id}` | PUT |
| Contact Delete | `/contacts/{id}` | DELETE |
| Contact Search | `/contacts/search?q=` | GET |

## Testing

### Run Tests
```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### Test Structure
- Unit tests in `test/` folder
- Use Jest with ts-jest
- Focus on testing GenericFunctions utilities

## Code Conventions

### TypeScript
- Strict mode enabled
- No implicit any
- All exports typed with n8n-workflow types

### Naming
- Files: `camelCase.ts` for code, `PascalCase.credentials.ts` for credentials
- Operations: `verb.operation.ts` (get, create, update, delete, search)
- Types: `I` prefix for interfaces

### Error Handling
- Use `NodeApiError` for API errors
- Use `NodeOperationError` for validation errors
- Always include `itemIndex` in error context
- Support `continueOnFail()` pattern

### n8n Patterns
- Use `displayOptions.show` to conditionally show fields
- Use `collection` type for optional fields
- Implement `returnAll` + `limit` for list operations
- Validate IDs before API calls

## Publishing

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Build and test: `npm run build && npm test`
4. Publish: `npm publish`

## Resources

- [n8n Creating Nodes Docs](https://docs.n8n.io/integrations/creating-nodes/)
- [Chatwoot API Docs](https://www.chatwoot.com/developers/api/)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
