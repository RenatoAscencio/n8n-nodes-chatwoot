# CLAUDE.md - Development Guide for n8n-nodes-chatwoot

## Project Overview

This is an n8n community node package for integrating with Chatwoot, an open-source customer engagement platform. The node provides access to **three Chatwoot APIs**:

- **Application API** (20 resources) — Core operations for conversations, contacts, messages, agents, teams, etc.
- **Platform API** (4 resources) — Super admin operations for accounts, users, and agent bots
- **Public API** (3 resources) — Client-side/widget operations for external integrations

**Stats:** 27 resources, 130+ operations, 3 credential types

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
│   ├── ChatwootApi.credentials.ts         # Application API auth
│   ├── ChatwootPlatformApi.credentials.ts # Platform API auth (super admin)
│   └── ChatwootPublicApi.credentials.ts   # Public API auth (inbox identifier)
├── nodes/
│   └── Chatwoot/
│       ├── Chatwoot.node.ts               # Main node with execute logic
│       ├── ChatwootTrigger.node.ts        # Webhook trigger node
│       ├── Chatwoot.node.json             # Node metadata
│       ├── chatwoot.svg                   # Node icon
│       ├── GenericFunctions.ts            # API helpers for all 3 APIs
│       ├── types.ts                       # TypeScript interfaces
│       └── resources/
│           ├── # Application API (20 resources)
│           ├── account/                   # Account operations
│           ├── agent/                     # Agent operations
│           ├── agentBot/                  # Agent Bot operations
│           ├── automationRule/            # Automation Rule operations
│           ├── cannedResponse/            # Canned Response operations
│           ├── contact/                   # Contact operations
│           ├── conversation/              # Conversation operations
│           ├── customAttribute/           # Custom Attribute operations
│           ├── customFilter/              # Custom Filter operations
│           ├── inbox/                     # Inbox operations
│           ├── label/                     # Label operations
│           ├── message/                   # Message operations
│           ├── team/                      # Team operations
│           ├── webhook/                   # Webhook operations
│           ├── profile/                   # Profile operations
│           ├── helpCenter/                # Help Center operations
│           ├── integration/               # Integration operations
│           ├── auditLog/                  # Audit Log operations
│           ├── csatSurvey/                # CSAT Survey operations
│           ├── report/                    # Report operations
│           ├── # Platform API (4 resources)
│           ├── platformAccount/           # Platform Account operations
│           ├── platformUser/              # Platform User operations
│           ├── accountUser/               # Account User operations
│           ├── accountAgentBot/           # Account Agent Bot operations
│           ├── # Public API (3 resources)
│           ├── publicContact/             # Public Contact operations
│           ├── publicConversation/        # Public Conversation operations
│           └── publicMessage/             # Public Message operations
├── test/
│   └── GenericFunctions.test.ts           # Unit tests
├── dist/                                  # Compiled output (generated)
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
Shared utilities for all three APIs:
- `chatwootApiRequest()` - Make Application API calls (uses ChatwootApi credential)
- `chatwootPlatformApiRequest()` - Make Platform API calls (uses ChatwootPlatformApi credential)
- `chatwootPublicApiRequest()` - Make Public API calls (uses ChatwootPublicApi credential)
- `chatwootApiRequestAllItems()` - Handle page-based pagination
- `chatwootApiRequestAllMessages()` - Handle cursor-based message pagination
- `validateId()` - Validate positive integer IDs
- Error message mapping for HTTP status codes

## Multi-Credential Architecture

The node supports three credential types for different API scopes:

| Credential | API Type | Auth Header | Base URL Pattern |
|------------|----------|-------------|------------------|
| ChatwootApi | Application | `api_access_token` | `{baseUrl}/api/v1/accounts/{accountId}/...` |
| ChatwootPlatformApi | Platform | `api_access_token` | `{baseUrl}/platform/api/v1/...` |
| ChatwootPublicApi | Public | None (inbox in URL) | `{baseUrl}/public/api/v1/inboxes/{inboxIdentifier}/...` |

### Credential Selection in Chatwoot.node.ts

Resources are mapped to credentials using `displayOptions`:

```typescript
credentials: [
  {
    name: 'chatwootApi',
    required: true,
    displayOptions: {
      show: {
        resource: ['account', 'agent', 'contact', 'conversation', ...], // Application API
      },
    },
  },
  {
    name: 'chatwootPlatformApi',
    required: true,
    displayOptions: {
      show: {
        resource: ['platformAccount', 'platformUser', 'accountUser', 'accountAgentBot'],
      },
    },
  },
  {
    name: 'chatwootPublicApi',
    required: true,
    displayOptions: {
      show: {
        resource: ['publicContact', 'publicConversation', 'publicMessage'],
      },
    },
  },
],
```

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

### Application API
```
Base URL: {baseUrl}/api/v1/accounts/{accountId}/{endpoint}
Header: api_access_token: YOUR_TOKEN
```

### Platform API
```
Base URL: {baseUrl}/platform/api/v1/{endpoint}
Header: api_access_token: PLATFORM_TOKEN
```

### Public API
```
Base URL: {baseUrl}/public/api/v1/inboxes/{inboxIdentifier}/{endpoint}
No auth header (inbox identifier in URL)
```

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

### Key Endpoints by API

**Application API:**
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
| Profile | `/profile` | GET |
| Help Center Portal | `/portals/{slug}` | GET |
| Audit Logs | `/audit_logs` | GET |

**Platform API:**
| Resource | Endpoint | Method |
|----------|----------|--------|
| Accounts List | `/accounts` | GET |
| Account Create | `/accounts` | POST |
| Account Get | `/accounts/{id}` | GET |
| Users List | `/users` | GET |
| User Create | `/users` | POST |
| User SSO URL | `/users/{id}/login` | GET |
| Account Users | `/accounts/{id}/account_users` | GET |

**Public API:**
| Resource | Endpoint | Method |
|----------|----------|--------|
| Contact Create | `/contacts` | POST |
| Contact Get | `/contacts/{source_id}` | GET |
| Conversation Create | `/contacts/{source_id}/conversations` | POST |
| Conversations List | `/contacts/{source_id}/conversations` | GET |
| Message Create | `/contacts/{source_id}/conversations/{id}/messages` | POST |
| Toggle Typing | `/contacts/{source_id}/conversations/{id}/toggle_typing` | POST |

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
