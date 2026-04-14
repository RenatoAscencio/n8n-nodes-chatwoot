# Chatwoot API Expansion v0.5.0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add missing Chatwoot API resources (Macros, Notifications, Campaigns, Contact Notes, Conversation Participants) and missing operations on existing resources (conversation mute/unmute/delete/search, contact notes, profile update) — bringing the node from 27 to 32 resources and ~160 to ~200+ operations.

**Architecture:** Each new resource follows the established pattern: a folder under `resources/<name>/` with `index.ts` + `*.operation.ts` files. Execute logic goes in `Chatwoot.node.ts` using `chatwootApiRequest()`. All new resources use the Application API credential (`chatwootApi`). Missing operations on existing resources get new `*.operation.ts` files in their existing folder.

**Tech Stack:** TypeScript, n8n-workflow types, Jest for testing

---

## File Structure

### New resource folders to create:
- `nodes/Chatwoot/resources/macro/` — Macros CRUD + execute
- `nodes/Chatwoot/resources/notification/` — Notifications management
- `nodes/Chatwoot/resources/campaign/` — Campaigns CRUD
- `nodes/Chatwoot/resources/contactNote/` — Contact Notes CRUD
- `nodes/Chatwoot/resources/conversationParticipant/` — Conversation Participants CRUD

### Existing files to modify:
- `nodes/Chatwoot/Chatwoot.node.ts` — Add new resources + operations to description + execute
- `nodes/Chatwoot/resources/conversation/index.ts` — Add mute, unmute, delete, search operations
- `nodes/Chatwoot/resources/profile/index.ts` — Add update operation
- `nodes/Chatwoot/ChatwootTrigger.node.ts` — Add typing_on/typing_off events

### Test files:
- `test/GenericFunctions.test.ts` — Existing tests (must stay green)

---

## Phase 0: Preparation & Audit Fix

### Task 0.1: Fix npm audit vulnerabilities

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Run npm audit fix**

```bash
npm audit fix
```

- [ ] **Step 2: Verify tests still pass**

```bash
npm test
```

Expected: All 66 tests pass

- [ ] **Step 3: Verify build still works**

```bash
npm run build
```

Expected: Clean build, no errors

- [ ] **Step 4: Verify lint passes**

```bash
npm run lint
```

Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: fix npm audit vulnerabilities (flatted, minimatch, ajv)"
```

---

## Phase 1: New Resource — Macros (6 operations)

Macros are reusable action sequences agents can execute on conversations. Full CRUD + execute.

**Endpoints:**
- `GET /api/v1/accounts/{id}/macros` — List all
- `POST /api/v1/accounts/{id}/macros` — Create
- `GET /api/v1/accounts/{id}/macros/{id}` — Get
- `PATCH /api/v1/accounts/{id}/macros/{id}` — Update
- `DELETE /api/v1/accounts/{id}/macros/{id}` — Delete
- `POST /api/v1/accounts/{id}/macros/{id}/execute` — Execute on conversation

### Task 1.1: Create macro resource operation files

**Files:**
- Create: `nodes/Chatwoot/resources/macro/get.operation.ts`
- Create: `nodes/Chatwoot/resources/macro/getAll.operation.ts`
- Create: `nodes/Chatwoot/resources/macro/create.operation.ts`
- Create: `nodes/Chatwoot/resources/macro/update.operation.ts`
- Create: `nodes/Chatwoot/resources/macro/delete.operation.ts`
- Create: `nodes/Chatwoot/resources/macro/execute.operation.ts`
- Create: `nodes/Chatwoot/resources/macro/index.ts`

- [ ] **Step 1: Create `get.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const getOperation: INodeProperties[] = [
  {
    displayName: 'Macro ID',
    name: 'macroId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['get'],
      },
    },
    description: 'The ID of the macro to retrieve',
  },
];
```

- [ ] **Step 2: Create `getAll.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [
  // No additional fields needed — GET /macros returns all macros
];
```

- [ ] **Step 3: Create `create.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['create'],
      },
    },
    description: 'Name of the macro',
  },
  {
    displayName: 'Actions (JSON)',
    name: 'actions',
    type: 'json',
    required: true,
    default: '[]',
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['create'],
      },
    },
    description: 'Array of action objects. Example: [{"action_name":"assign_team","action_params":[1]}]',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Visibility',
        name: 'visibility',
        type: 'options',
        options: [
          { name: 'Personal', value: 'personal' },
          { name: 'Global', value: 'global' },
        ],
        default: 'personal',
        description: 'Visibility scope of the macro',
      },
    ],
  },
];
```

- [ ] **Step 4: Create `update.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Macro ID',
    name: 'macroId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['update'],
      },
    },
    description: 'The ID of the macro to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the macro',
      },
      {
        displayName: 'Actions (JSON)',
        name: 'actions',
        type: 'json',
        default: '[]',
        description: 'Array of action objects',
      },
      {
        displayName: 'Visibility',
        name: 'visibility',
        type: 'options',
        options: [
          { name: 'Personal', value: 'personal' },
          { name: 'Global', value: 'global' },
        ],
        default: 'personal',
        description: 'Visibility scope of the macro',
      },
    ],
  },
];
```

- [ ] **Step 5: Create `delete.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
  {
    displayName: 'Macro ID',
    name: 'macroId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['delete'],
      },
    },
    description: 'The ID of the macro to delete',
  },
];
```

- [ ] **Step 6: Create `execute.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const executeOperation: INodeProperties[] = [
  {
    displayName: 'Macro ID',
    name: 'macroId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['execute'],
      },
    },
    description: 'The ID of the macro to execute',
  },
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['macro'],
        operation: ['execute'],
      },
    },
    description: 'The ID of the conversation to execute the macro on',
  },
];
```

- [ ] **Step 7: Create `index.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';
import { getOperation } from './get.operation';
import { getAllOperation } from './getAll.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';
import { executeOperation } from './execute.operation';

export const macroOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['macro'],
    },
  },
  options: [
    {
      name: 'Create',
      value: 'create',
      description: 'Create a new macro',
      action: 'Create a macro',
    },
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete a macro',
      action: 'Delete a macro',
    },
    {
      name: 'Execute',
      value: 'execute',
      description: 'Execute a macro on a conversation',
      action: 'Execute a macro',
    },
    {
      name: 'Get',
      value: 'get',
      description: 'Get a macro by ID',
      action: 'Get a macro',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get all macros',
      action: 'Get many macros',
    },
    {
      name: 'Update',
      value: 'update',
      description: 'Update a macro',
      action: 'Update a macro',
    },
  ],
  default: 'getAll',
};

export const macroFields: INodeProperties[] = [
  ...getOperation,
  ...getAllOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
  ...executeOperation,
];
```

- [ ] **Step 8: Verify build compiles**

```bash
npm run build
```

Expected: May show warnings about unused imports (macro not wired yet), but no TypeScript errors in the new files.

### Task 1.2: Wire macro resource into Chatwoot.node.ts

**Files:**
- Modify: `nodes/Chatwoot/Chatwoot.node.ts`

- [ ] **Step 1: Add import at top of file (after line 47, with the other Application API imports)**

```typescript
import { macroOperations, macroFields } from './resources/macro';
```

- [ ] **Step 2: Add `'macro'` to the resource options array (alphabetical, around line 146)**

Add after the `label` entry:
```typescript
{ name: 'Macro', value: 'macro' },
```

- [ ] **Step 3: Add `'macro'` to the `chatwootApi` credential displayOptions.show.resource array (around line 80-101)**

Add `'macro'` to the array alongside the other Application API resources.

- [ ] **Step 4: Add operations and fields to properties array**

In the Application API Operations section (around line 183):
```typescript
macroOperations,
```

In the Application API Fields section (around line 213):
```typescript
...macroFields,
```

- [ ] **Step 5: Add execute logic block**

Add this block in the execute function, after the last Application API resource block and before the Platform API blocks:

```typescript
// =====================================================================
// MACRO
// =====================================================================
else if (resource === 'macro') {
  if (operation === 'getAll') {
    responseData = await chatwootApiRequest.call(this, 'GET', '/macros');
  } else if (operation === 'get') {
    const macroId = validateId(this.getNodeParameter('macroId', i), 'Macro ID');
    responseData = await chatwootApiRequest.call(this, 'GET', `/macros/${macroId}`);
  } else if (operation === 'create') {
    const name = this.getNodeParameter('name', i) as string;
    const actions = this.getNodeParameter('actions', i) as string;
    const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

    const body: IDataObject = {
      name,
      actions: typeof actions === 'string' ? JSON.parse(actions) : actions,
    };
    if (additionalFields.visibility) body.visibility = additionalFields.visibility;

    responseData = await chatwootApiRequest.call(this, 'POST', '/macros', body);
  } else if (operation === 'update') {
    const macroId = validateId(this.getNodeParameter('macroId', i), 'Macro ID');
    const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

    const body: IDataObject = {};
    if (updateFields.name) body.name = updateFields.name;
    if (updateFields.visibility) body.visibility = updateFields.visibility;
    if (updateFields.actions) {
      body.actions = typeof updateFields.actions === 'string'
        ? JSON.parse(updateFields.actions as string)
        : updateFields.actions;
    }

    responseData = await chatwootApiRequest.call(this, 'PATCH', `/macros/${macroId}`, body);
  } else if (operation === 'delete') {
    const macroId = validateId(this.getNodeParameter('macroId', i), 'Macro ID');
    await chatwootApiRequest.call(this, 'DELETE', `/macros/${macroId}`);
    responseData = { success: true, id: macroId };
  } else if (operation === 'execute') {
    const macroId = validateId(this.getNodeParameter('macroId', i), 'Macro ID');
    const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');

    const body: IDataObject = { conversation_ids: [conversationId] };
    responseData = await chatwootApiRequest.call(this, 'POST', `/macros/${macroId}/execute`, body);
  } else {
    throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
  }
}
```

- [ ] **Step 6: Build and verify**

```bash
npm run build && npm test && npm run lint
```

Expected: Build clean, 66 tests pass, lint clean.

- [ ] **Step 7: Commit**

```bash
git add nodes/Chatwoot/resources/macro/ nodes/Chatwoot/Chatwoot.node.ts
git commit -m "feat(macro): add Macro resource with CRUD + execute operations"
```

---

## Phase 2: New Resource — Notifications (6 operations)

Notifications are in-app alerts for agents. Every agent uses these.

**Endpoints (verified from Chatwoot routes.rb + controller):**
- `GET /notifications` — List notifications (paginated, 15/page). Response: `{ data: { meta: {...}, payload: [...] } }`
- `PATCH /notifications/{id}` — Mark as read (controller sets `read_at = now`, ignores body)
- `DELETE /notifications/{id}` — Delete notification (returns `head :ok`)
- `POST /notifications/read_all` — Mark all as read (returns `head :ok`)
- `GET /notifications/unread_count` — Get unread count (returns bare integer, e.g. `2`)
- `POST /notifications/{id}/unread` — Mark as unread (sets `read_at: nil`)

**Query params for GET /notifications:** `page` (integer), `includes[]` (array: `"read"`, `"snoozed"`), `sort_order` (`"asc"` | `"desc"`)

### Task 2.1: Create notification resource operation files

**Files:**
- Create: `nodes/Chatwoot/resources/notification/getAll.operation.ts`
- Create: `nodes/Chatwoot/resources/notification/markRead.operation.ts`
- Create: `nodes/Chatwoot/resources/notification/delete.operation.ts`
- Create: `nodes/Chatwoot/resources/notification/readAll.operation.ts`
- Create: `nodes/Chatwoot/resources/notification/unreadCount.operation.ts`
- Create: `nodes/Chatwoot/resources/notification/markUnread.operation.ts`
- Create: `nodes/Chatwoot/resources/notification/index.ts`

- [ ] **Step 1: Create `getAll.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['notification'],
        operation: ['getAll'],
      },
    },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 50,
    typeOptions: { minValue: 1 },
    displayOptions: {
      show: {
        resource: ['notification'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['notification'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Include Read',
        name: 'includes_read',
        type: 'boolean',
        default: false,
        description: 'Whether to include already-read notifications',
      },
      {
        displayName: 'Include Snoozed',
        name: 'includes_snoozed',
        type: 'boolean',
        default: false,
        description: 'Whether to include snoozed notifications',
      },
      {
        displayName: 'Sort Order',
        name: 'sort_order',
        type: 'options',
        options: [
          { name: 'Descending', value: 'desc' },
          { name: 'Ascending', value: 'asc' },
        ],
        default: 'desc',
        description: 'Sort order by last activity',
      },
    ],
  },
];
```

- [ ] **Step 2: Create `markRead.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const markReadOperation: INodeProperties[] = [
  {
    displayName: 'Notification ID',
    name: 'notificationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['notification'],
        operation: ['markRead'],
      },
    },
    description: 'The ID of the notification to mark as read',
  },
];
```

- [ ] **Step 3: Create `delete.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
  {
    displayName: 'Notification ID',
    name: 'notificationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['notification'],
        operation: ['delete'],
      },
    },
    description: 'The ID of the notification to delete',
  },
];
```

- [ ] **Step 4: Create `readAll.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const readAllOperation: INodeProperties[] = [
  // No additional fields — POST /notifications/read_all marks all as read
];
```

- [ ] **Step 5: Create `unreadCount.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const unreadCountOperation: INodeProperties[] = [
  // No additional fields — GET /notifications/unread_count returns count
];
```

- [ ] **Step 6: Create `markUnread.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const markUnreadOperation: INodeProperties[] = [
  {
    displayName: 'Notification ID',
    name: 'notificationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['notification'],
        operation: ['markUnread'],
      },
    },
    description: 'The ID of the notification to mark as unread',
  },
];
```

- [ ] **Step 7: Create `index.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { markReadOperation } from './markRead.operation';
import { deleteOperation } from './delete.operation';
import { readAllOperation } from './readAll.operation';
import { unreadCountOperation } from './unreadCount.operation';
import { markUnreadOperation } from './markUnread.operation';

export const notificationOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['notification'],
    },
  },
  options: [
    {
      name: 'Delete',
      value: 'delete',
      description: 'Delete a notification',
      action: 'Delete a notification',
    },
    {
      name: 'Get Many',
      value: 'getAll',
      description: 'Get all notifications',
      action: 'Get many notifications',
    },
    {
      name: 'Mark All Read',
      value: 'readAll',
      description: 'Mark all notifications as read',
      action: 'Mark all notifications read',
    },
    {
      name: 'Mark Read',
      value: 'markRead',
      description: 'Mark a notification as read',
      action: 'Mark notification read',
    },
    {
      name: 'Mark Unread',
      value: 'markUnread',
      description: 'Mark a notification as unread',
      action: 'Mark notification unread',
    },
    {
      name: 'Unread Count',
      value: 'unreadCount',
      description: 'Get count of unread notifications',
      action: 'Get unread notification count',
    },
  ],
  default: 'getAll',
};

export const notificationFields: INodeProperties[] = [
  ...getAllOperation,
  ...markReadOperation,
  ...deleteOperation,
  ...readAllOperation,
  ...unreadCountOperation,
  ...markUnreadOperation,
];
```

### Task 2.2: Wire notification resource into Chatwoot.node.ts

**Files:**
- Modify: `nodes/Chatwoot/Chatwoot.node.ts`

- [ ] **Step 1: Wire all 4 integration points** (same pattern as Task 1.2):

1. **Import** (top of file, Application API imports section):
   ```typescript
   import { notificationOperations, notificationFields } from './resources/notification';
   ```
2. **Resource option** (in the `resource` property `options` array, alphabetical):
   ```typescript
   { name: 'Notification', value: 'notification' },
   ```
3. **Credential array** (add `'notification'` to the `chatwootApi` credential `displayOptions.show.resource` array)
4. **Operations + Fields** (in the properties array):
   ```typescript
   notificationOperations,  // in Application API Operations section
   ...notificationFields,   // in Application API Fields section
   ```

- [ ] **Step 2: Add execute logic block**

```typescript
// =====================================================================
// NOTIFICATION
// =====================================================================
else if (resource === 'notification') {
  if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const options = this.getNodeParameter('options', i) as IDataObject;

    const qs: IDataObject = {};
    // Build includes[] array for the API
    const includes: string[] = [];
    if (options.includes_read) includes.push('read');
    if (options.includes_snoozed) includes.push('snoozed');
    if (includes.length > 0) qs['includes[]'] = includes;
    if (options.sort_order) qs.sort_order = options.sort_order;

    if (returnAll) {
      // Response format: { data: { meta: {...}, payload: [...] } }
      // We need custom pagination since the nested structure doesn't match chatwootApiRequestAllItems
      const allItems: IDataObject[] = [];
      let page = 1;
      let hasMore = true;
      while (hasMore) {
        qs.page = page;
        const result = (await chatwootApiRequest.call(this, 'GET', '/notifications', {}, qs)) as IDataObject;
        const data = result.data as IDataObject;
        const payload = (data?.payload || []) as IDataObject[];
        allItems.push(...payload);
        const meta = data?.meta as IDataObject;
        const currentPage = (meta?.current_page as number) || page;
        const count = (meta?.count as number) || 0;
        // 15 items per page is Chatwoot's default for notifications
        hasMore = payload.length > 0 && allItems.length < count;
        page = currentPage + 1;
        if (page > 100) break; // safety limit
      }
      responseData = allItems;
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      qs.page = 1;
      const result = (await chatwootApiRequest.call(this, 'GET', '/notifications', {}, qs)) as IDataObject;
      const data = result.data as IDataObject;
      const payload = (data?.payload || []) as IDataObject[];
      responseData = payload.slice(0, limit);
    }
  } else if (operation === 'markRead') {
    const notificationId = validateId(this.getNodeParameter('notificationId', i), 'Notification ID');
    // Controller ignores body and sets read_at = DateTime.now automatically
    responseData = await chatwootApiRequest.call(this, 'PATCH', `/notifications/${notificationId}`);
  } else if (operation === 'delete') {
    const notificationId = validateId(this.getNodeParameter('notificationId', i), 'Notification ID');
    await chatwootApiRequest.call(this, 'DELETE', `/notifications/${notificationId}`);
    responseData = { success: true, id: notificationId };
  } else if (operation === 'readAll') {
    responseData = await chatwootApiRequest.call(this, 'POST', '/notifications/read_all');
  } else if (operation === 'unreadCount') {
    responseData = await chatwootApiRequest.call(this, 'GET', '/notifications/unread_count');
  } else if (operation === 'markUnread') {
    const notificationId = validateId(this.getNodeParameter('notificationId', i), 'Notification ID');
    responseData = await chatwootApiRequest.call(this, 'POST', `/notifications/${notificationId}/unread`);
  } else {
    throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
  }
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build && npm test && npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add nodes/Chatwoot/resources/notification/ nodes/Chatwoot/Chatwoot.node.ts
git commit -m "feat(notification): add Notification resource with 6 operations"
```

---

## Phase 3: New Resource — Campaigns (5 operations)

Campaigns are outbound messaging campaigns.

**Endpoints:**
- `GET /campaigns` — List all
- `POST /campaigns` — Create
- `GET /campaigns/{id}` — Get
- `PATCH /campaigns/{id}` — Update
- `DELETE /campaigns/{id}` — Delete

### Task 3.1: Create campaign resource (same pattern as macro)

**Files:**
- Create: `nodes/Chatwoot/resources/campaign/get.operation.ts`
- Create: `nodes/Chatwoot/resources/campaign/getAll.operation.ts`
- Create: `nodes/Chatwoot/resources/campaign/create.operation.ts`
- Create: `nodes/Chatwoot/resources/campaign/update.operation.ts`
- Create: `nodes/Chatwoot/resources/campaign/delete.operation.ts`
- Create: `nodes/Chatwoot/resources/campaign/index.ts`

- [ ] **Step 1: Create all operation files**

`get.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const getOperation: INodeProperties[] = [
  {
    displayName: 'Campaign ID',
    name: 'campaignId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['campaign'], operation: ['get'] } },
    description: 'The ID of the campaign to retrieve',
  },
];
```

`getAll.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [];
```

`create.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['campaign'], operation: ['create'] } },
    description: 'Title of the campaign',
  },
  {
    displayName: 'Message',
    name: 'message',
    type: 'string',
    required: true,
    default: '',
    typeOptions: { rows: 3 },
    displayOptions: { show: { resource: ['campaign'], operation: ['create'] } },
    description: 'Campaign message content',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['campaign'], operation: ['create'] } },
    options: [
      {
        displayName: 'Inbox ID',
        name: 'inbox_id',
        type: 'number',
        default: 0,
        description: 'Inbox ID for the campaign',
      },
      {
        displayName: 'Scheduled At',
        name: 'scheduled_at',
        type: 'dateTime',
        default: '',
        description: 'When to send the campaign',
      },
      {
        displayName: 'Audience (JSON)',
        name: 'audience',
        type: 'json',
        default: '[]',
        description: 'Target audience filter conditions',
      },
    ],
  },
];
```

`update.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Campaign ID',
    name: 'campaignId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['campaign'], operation: ['update'] } },
    description: 'The ID of the campaign to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['campaign'], operation: ['update'] } },
    options: [
      {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        description: 'Title of the campaign',
      },
      {
        displayName: 'Message',
        name: 'message',
        type: 'string',
        default: '',
        description: 'Campaign message content',
      },
      {
        displayName: 'Scheduled At',
        name: 'scheduled_at',
        type: 'dateTime',
        default: '',
        description: 'When to send the campaign',
      },
    ],
  },
];
```

`delete.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
  {
    displayName: 'Campaign ID',
    name: 'campaignId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['campaign'], operation: ['delete'] } },
    description: 'The ID of the campaign to delete',
  },
];
```

`index.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';
import { getOperation } from './get.operation';
import { getAllOperation } from './getAll.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';

export const campaignOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['campaign'] } },
  options: [
    { name: 'Create', value: 'create', description: 'Create a new campaign', action: 'Create a campaign' },
    { name: 'Delete', value: 'delete', description: 'Delete a campaign', action: 'Delete a campaign' },
    { name: 'Get', value: 'get', description: 'Get a campaign by ID', action: 'Get a campaign' },
    { name: 'Get Many', value: 'getAll', description: 'Get all campaigns', action: 'Get many campaigns' },
    { name: 'Update', value: 'update', description: 'Update a campaign', action: 'Update a campaign' },
  ],
  default: 'getAll',
};

export const campaignFields: INodeProperties[] = [
  ...getOperation,
  ...getAllOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
];
```

### Task 3.2: Wire campaign into Chatwoot.node.ts

**Files:**
- Modify: `nodes/Chatwoot/Chatwoot.node.ts`

- [ ] **Step 1: Wire all 4 integration points** (same pattern as Task 1.2):

1. **Import**: `import { campaignOperations, campaignFields } from './resources/campaign';`
2. **Resource option**: `{ name: 'Campaign', value: 'campaign' },`
3. **Credential array**: add `'campaign'` to `chatwootApi` displayOptions.show.resource
4. **Operations + Fields**: `campaignOperations,` and `...campaignFields,`

- [ ] **Step 2: Add execute logic**

```typescript
// =====================================================================
// CAMPAIGN
// =====================================================================
else if (resource === 'campaign') {
  if (operation === 'getAll') {
    responseData = await chatwootApiRequest.call(this, 'GET', '/campaigns');
  } else if (operation === 'get') {
    const campaignId = validateId(this.getNodeParameter('campaignId', i), 'Campaign ID');
    responseData = await chatwootApiRequest.call(this, 'GET', `/campaigns/${campaignId}`);
  } else if (operation === 'create') {
    const title = this.getNodeParameter('title', i) as string;
    const message = this.getNodeParameter('message', i) as string;
    const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

    const body: IDataObject = { title, message };
    if (additionalFields.inbox_id) body.inbox_id = additionalFields.inbox_id;
    if (additionalFields.scheduled_at) body.scheduled_at = additionalFields.scheduled_at;
    if (additionalFields.audience) {
      body.audience = typeof additionalFields.audience === 'string'
        ? JSON.parse(additionalFields.audience as string)
        : additionalFields.audience;
    }

    responseData = await chatwootApiRequest.call(this, 'POST', '/campaigns', body);
  } else if (operation === 'update') {
    const campaignId = validateId(this.getNodeParameter('campaignId', i), 'Campaign ID');
    const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

    const body: IDataObject = {};
    if (updateFields.title) body.title = updateFields.title;
    if (updateFields.message) body.message = updateFields.message;
    if (updateFields.scheduled_at) body.scheduled_at = updateFields.scheduled_at;

    responseData = await chatwootApiRequest.call(this, 'PATCH', `/campaigns/${campaignId}`, body);
  } else if (operation === 'delete') {
    const campaignId = validateId(this.getNodeParameter('campaignId', i), 'Campaign ID');
    await chatwootApiRequest.call(this, 'DELETE', `/campaigns/${campaignId}`);
    responseData = { success: true, id: campaignId };
  } else {
    throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
  }
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build && npm test && npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add nodes/Chatwoot/resources/campaign/ nodes/Chatwoot/Chatwoot.node.ts
git commit -m "feat(campaign): add Campaign resource with CRUD operations"
```

---

## Phase 4: New Resource — Contact Notes (4 operations)

Notes on contacts — important for CRM workflows.

**Endpoints:**
- `GET /contacts/{contact_id}/notes` — List notes
- `POST /contacts/{contact_id}/notes` — Create note
- `PATCH /contacts/{contact_id}/notes/{id}` — Update note
- `DELETE /contacts/{contact_id}/notes/{id}` — Delete note

### Task 4.1: Create contactNote resource

**Files:**
- Create: `nodes/Chatwoot/resources/contactNote/getAll.operation.ts`
- Create: `nodes/Chatwoot/resources/contactNote/create.operation.ts`
- Create: `nodes/Chatwoot/resources/contactNote/update.operation.ts`
- Create: `nodes/Chatwoot/resources/contactNote/delete.operation.ts`
- Create: `nodes/Chatwoot/resources/contactNote/index.ts`

- [ ] **Step 1: Create all operation files**

All operations need `contactId` field. `create` needs `content`. `update` and `delete` need `noteId`.

`getAll.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['contactNote'], operation: ['getAll'] } },
    description: 'The ID of the contact',
  },
];
```

`create.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const createOperation: INodeProperties[] = [
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['contactNote'], operation: ['create'] } },
    description: 'The ID of the contact',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    required: true,
    default: '',
    typeOptions: { rows: 3 },
    displayOptions: { show: { resource: ['contactNote'], operation: ['create'] } },
    description: 'The note content',
  },
];
```

`update.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['contactNote'], operation: ['update'] } },
    description: 'The ID of the contact',
  },
  {
    displayName: 'Note ID',
    name: 'noteId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['contactNote'], operation: ['update'] } },
    description: 'The ID of the note to update',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    required: true,
    default: '',
    typeOptions: { rows: 3 },
    displayOptions: { show: { resource: ['contactNote'], operation: ['update'] } },
    description: 'The updated note content',
  },
];
```

`delete.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const deleteOperation: INodeProperties[] = [
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['contactNote'], operation: ['delete'] } },
    description: 'The ID of the contact',
  },
  {
    displayName: 'Note ID',
    name: 'noteId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['contactNote'], operation: ['delete'] } },
    description: 'The ID of the note to delete',
  },
];
```

`index.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { createOperation } from './create.operation';
import { updateOperation } from './update.operation';
import { deleteOperation } from './delete.operation';

export const contactNoteOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['contactNote'] } },
  options: [
    { name: 'Create', value: 'create', description: 'Create a note on a contact', action: 'Create a contact note' },
    { name: 'Delete', value: 'delete', description: 'Delete a contact note', action: 'Delete a contact note' },
    { name: 'Get Many', value: 'getAll', description: 'Get all notes for a contact', action: 'Get many contact notes' },
    { name: 'Update', value: 'update', description: 'Update a contact note', action: 'Update a contact note' },
  ],
  default: 'getAll',
};

export const contactNoteFields: INodeProperties[] = [
  ...getAllOperation,
  ...createOperation,
  ...updateOperation,
  ...deleteOperation,
];
```

### Task 4.2: Wire contactNote into Chatwoot.node.ts

**Files:**
- Modify: `nodes/Chatwoot/Chatwoot.node.ts`

- [ ] **Step 1: Wire all 4 integration points** (same pattern as Task 1.2):

1. **Import**: `import { contactNoteOperations, contactNoteFields } from './resources/contactNote';`
2. **Resource option**: `{ name: 'Contact Note', value: 'contactNote' },`
3. **Credential array**: add `'contactNote'` to `chatwootApi` displayOptions.show.resource
4. **Operations + Fields**: `contactNoteOperations,` and `...contactNoteFields,`

- [ ] **Step 2: Add execute logic**

```typescript
// =====================================================================
// CONTACT NOTE
// =====================================================================
else if (resource === 'contactNote') {
  if (operation === 'getAll') {
    const contactId = validateId(this.getNodeParameter('contactId', i), 'Contact ID');
    responseData = await chatwootApiRequest.call(this, 'GET', `/contacts/${contactId}/notes`);
  } else if (operation === 'create') {
    const contactId = validateId(this.getNodeParameter('contactId', i), 'Contact ID');
    const content = this.getNodeParameter('content', i) as string;
    responseData = await chatwootApiRequest.call(this, 'POST', `/contacts/${contactId}/notes`, { content });
  } else if (operation === 'update') {
    const contactId = validateId(this.getNodeParameter('contactId', i), 'Contact ID');
    const noteId = validateId(this.getNodeParameter('noteId', i), 'Note ID');
    const content = this.getNodeParameter('content', i) as string;
    responseData = await chatwootApiRequest.call(this, 'PATCH', `/contacts/${contactId}/notes/${noteId}`, { content });
  } else if (operation === 'delete') {
    const contactId = validateId(this.getNodeParameter('contactId', i), 'Contact ID');
    const noteId = validateId(this.getNodeParameter('noteId', i), 'Note ID');
    await chatwootApiRequest.call(this, 'DELETE', `/contacts/${contactId}/notes/${noteId}`);
    responseData = { success: true, id: noteId };
  } else {
    throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
  }
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build && npm test && npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add nodes/Chatwoot/resources/contactNote/ nodes/Chatwoot/Chatwoot.node.ts
git commit -m "feat(contactNote): add Contact Note resource with CRUD operations"
```

---

## Phase 5: New Resource — Conversation Participants (3 operations)

Manage watchers/participants on conversations.

**Endpoints:**
- `GET /conversations/{id}/participants` — Get participants
- `POST /conversations/{id}/participants` — Add participants
- `DELETE /conversations/{id}/participants` — Remove participants

### Task 5.1: Create conversationParticipant resource

**Files:**
- Create: `nodes/Chatwoot/resources/conversationParticipant/getAll.operation.ts`
- Create: `nodes/Chatwoot/resources/conversationParticipant/add.operation.ts`
- Create: `nodes/Chatwoot/resources/conversationParticipant/remove.operation.ts`
- Create: `nodes/Chatwoot/resources/conversationParticipant/index.ts`

- [ ] **Step 1: Create all operation files**

All need `conversationId`. `add` and `remove` need `userIds` (comma-separated).

`getAll.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const getAllOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['conversationParticipant'], operation: ['getAll'] } },
    description: 'The ID of the conversation',
  },
];
```

`add.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const addOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['conversationParticipant'], operation: ['add'] } },
    description: 'The ID of the conversation',
  },
  {
    displayName: 'User IDs',
    name: 'userIds',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['conversationParticipant'], operation: ['add'] } },
    description: 'Comma-separated list of user IDs to add as participants',
  },
];
```

`remove.operation.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';

export const removeOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['conversationParticipant'], operation: ['remove'] } },
    description: 'The ID of the conversation',
  },
  {
    displayName: 'User IDs',
    name: 'userIds',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['conversationParticipant'], operation: ['remove'] } },
    description: 'Comma-separated list of user IDs to remove from participants',
  },
];
```

`index.ts`:
```typescript
import type { INodeProperties } from 'n8n-workflow';
import { getAllOperation } from './getAll.operation';
import { addOperation } from './add.operation';
import { removeOperation } from './remove.operation';

export const conversationParticipantOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['conversationParticipant'] } },
  options: [
    { name: 'Add', value: 'add', description: 'Add participants to a conversation', action: 'Add conversation participants' },
    { name: 'Get Many', value: 'getAll', description: 'Get all participants of a conversation', action: 'Get conversation participants' },
    { name: 'Remove', value: 'remove', description: 'Remove participants from a conversation', action: 'Remove conversation participants' },
  ],
  default: 'getAll',
};

export const conversationParticipantFields: INodeProperties[] = [
  ...getAllOperation,
  ...addOperation,
  ...removeOperation,
];
```

### Task 5.2: Wire conversationParticipant into Chatwoot.node.ts

**Files:**
- Modify: `nodes/Chatwoot/Chatwoot.node.ts`

- [ ] **Step 1: Wire all 4 integration points** (same pattern as Task 1.2):

1. **Import**: `import { conversationParticipantOperations, conversationParticipantFields } from './resources/conversationParticipant';`
2. **Resource option**: `{ name: 'Conversation Participant', value: 'conversationParticipant' },`
3. **Credential array**: add `'conversationParticipant'` to `chatwootApi` displayOptions.show.resource
4. **Operations + Fields**: `conversationParticipantOperations,` and `...conversationParticipantFields,`

- [ ] **Step 2: Add execute logic**

```typescript
// =====================================================================
// CONVERSATION PARTICIPANT
// =====================================================================
else if (resource === 'conversationParticipant') {
  if (operation === 'getAll') {
    const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
    responseData = await chatwootApiRequest.call(this, 'GET', `/conversations/${conversationId}/participants`);
  } else if (operation === 'add') {
    const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
    const userIdsStr = this.getNodeParameter('userIds', i) as string;
    const userIds = userIdsStr.split(',').map((id) => parseInt(id.trim(), 10));
    responseData = await chatwootApiRequest.call(this, 'POST', `/conversations/${conversationId}/participants`, { user_ids: userIds });
  } else if (operation === 'remove') {
    const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
    const userIdsStr = this.getNodeParameter('userIds', i) as string;
    const userIds = userIdsStr.split(',').map((id) => parseInt(id.trim(), 10));
    responseData = await chatwootApiRequest.call(this, 'DELETE', `/conversations/${conversationId}/participants`, { user_ids: userIds });
  } else {
    throw new NodeOperationError(this.getNode(), `Operation "${operation}" not supported`, { itemIndex: i });
  }
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build && npm test && npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add nodes/Chatwoot/resources/conversationParticipant/ nodes/Chatwoot/Chatwoot.node.ts
git commit -m "feat(conversationParticipant): add Conversation Participant resource"
```

---

## Phase 6: Missing Operations on Existing Resources

### Task 6.1: Add conversation mute, unmute, delete, search operations

**Files:**
- Create: `nodes/Chatwoot/resources/conversation/mute.operation.ts`
- Create: `nodes/Chatwoot/resources/conversation/unmute.operation.ts`
- Create: `nodes/Chatwoot/resources/conversation/delete.operation.ts`
- Create: `nodes/Chatwoot/resources/conversation/search.operation.ts`
- Modify: `nodes/Chatwoot/resources/conversation/index.ts`
- Modify: `nodes/Chatwoot/Chatwoot.node.ts`

- [ ] **Step 1: Create `mute.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const muteOperation: INodeProperties[] = [
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: { show: { resource: ['conversation'], operation: ['mute'] } },
    description: 'The ID of the conversation to mute',
  },
];
```

- [ ] **Step 2: Create `unmute.operation.ts`** (same pattern, operation: `['unmute']`)

- [ ] **Step 3: Create `delete.operation.ts`** (same pattern, operation: `['delete']`)

- [ ] **Step 4: Create `search.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const searchOperation: INodeProperties[] = [
  {
    displayName: 'Query',
    name: 'query',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['conversation'], operation: ['search'] } },
    description: 'Search query string',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: { show: { resource: ['conversation'], operation: ['search'] } },
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 25,
    typeOptions: { minValue: 1 },
    displayOptions: { show: { resource: ['conversation'], operation: ['search'], returnAll: [false] } },
    description: 'Max number of results to return',
  },
];
```

- [ ] **Step 5: Update `conversation/index.ts`** — add imports for new operations, add to options array (alphabetical), spread into fields array

New options to add:
```typescript
{ name: 'Delete', value: 'delete', description: 'Delete a conversation', action: 'Delete a conversation' },
{ name: 'Mute', value: 'mute', description: 'Mute a conversation', action: 'Mute a conversation' },
{ name: 'Search', value: 'search', description: 'Search conversations by query', action: 'Search conversations' },
{ name: 'Unmute', value: 'unmute', description: 'Unmute a conversation', action: 'Unmute a conversation' },
```

- [ ] **Step 6: Add execute logic in Chatwoot.node.ts** (inside the conversation resource block)

```typescript
} else if (operation === 'mute') {
  const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
  responseData = await chatwootApiRequest.call(this, 'POST', `/conversations/${conversationId}/mute`);
} else if (operation === 'unmute') {
  const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
  responseData = await chatwootApiRequest.call(this, 'POST', `/conversations/${conversationId}/unmute`);
} else if (operation === 'delete') {
  const conversationId = validateId(this.getNodeParameter('conversationId', i), 'Conversation ID');
  await chatwootApiRequest.call(this, 'DELETE', `/conversations/${conversationId}`);
  responseData = { success: true, id: conversationId };
} else if (operation === 'search') {
  const query = this.getNodeParameter('query', i) as string;
  const returnAll = this.getNodeParameter('returnAll', i) as boolean;
  const qs: IDataObject = { q: query };

  if (returnAll) {
    responseData = await chatwootApiRequestAllItems.call(this, 'GET', '/conversations/search', {}, qs, 'payload');
  } else {
    const limit = this.getNodeParameter('limit', i) as number;
    qs.page = 1;
    const result = (await chatwootApiRequest.call(this, 'GET', '/conversations/search', {}, qs)) as IDataObject;
    const payload = (result.payload || []) as IDataObject[];
    responseData = payload.slice(0, limit);
  }
}
```

- [ ] **Step 7: Build and verify**

```bash
npm run build && npm test && npm run lint
```

- [ ] **Step 8: Commit**

```bash
git add nodes/Chatwoot/resources/conversation/ nodes/Chatwoot/Chatwoot.node.ts
git commit -m "feat(conversation): add mute, unmute, delete, search operations"
```

### Task 6.2: Add profile update operation

**Files:**
- Create: `nodes/Chatwoot/resources/profile/update.operation.ts`
- Modify: `nodes/Chatwoot/resources/profile/index.ts`
- Modify: `nodes/Chatwoot/Chatwoot.node.ts`

- [ ] **Step 1: Create `update.operation.ts`**

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const updateOperation: INodeProperties[] = [
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: { show: { resource: ['profile'], operation: ['update'] } },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Display name',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        description: 'Email address',
      },
      {
        displayName: 'Availability',
        name: 'availability',
        type: 'options',
        options: [
          { name: 'Online', value: 'online' },
          { name: 'Offline', value: 'offline' },
          { name: 'Busy', value: 'busy' },
        ],
        default: 'online',
        description: 'Availability status',
      },
      {
        displayName: 'Auto Offline',
        name: 'auto_offline',
        type: 'boolean',
        default: true,
        description: 'Whether to automatically go offline',
      },
    ],
  },
];
```

- [ ] **Step 2: Update `profile/index.ts`** — add import, add `Update` option, spread fields

- [ ] **Step 3: Add execute logic**

```typescript
} else if (operation === 'update') {
  const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
  const body: IDataObject = {};
  if (updateFields.name) body.name = updateFields.name;
  if (updateFields.email) body.email = updateFields.email;
  if (updateFields.availability) body.availability = updateFields.availability;
  if (updateFields.auto_offline !== undefined) body.auto_offline = updateFields.auto_offline;
  responseData = await chatwootApiRequest.call(this, 'PUT', '/profile', body);
}
```

- [ ] **Step 4: Build and verify**

```bash
npm run build && npm test && npm run lint
```

- [ ] **Step 5: Commit**

```bash
git add nodes/Chatwoot/resources/profile/ nodes/Chatwoot/Chatwoot.node.ts
git commit -m "feat(profile): add update operation"
```

---

## Phase 7: Trigger Node — Add Missing Webhook Events

### Task 7.1: Add typing_on and typing_off events

**Files:**
- Modify: `nodes/Chatwoot/ChatwootTrigger.node.ts`

- [ ] **Step 1: Add new event options** to the `events` property options array:

```typescript
{
  name: 'Conversation Typing Off',
  value: 'conversation_typing_off',
  description: 'Triggered when typing indicator stops',
},
{
  name: 'Conversation Typing On',
  value: 'conversation_typing_on',
  description: 'Triggered when typing indicator starts',
},
```

- [ ] **Step 2: Build and verify**

```bash
npm run build && npm test && npm run lint
```

- [ ] **Step 3: Commit**

```bash
git add nodes/Chatwoot/ChatwootTrigger.node.ts
git commit -m "feat(trigger): add conversation_typing_on/off webhook events"
```

---

## Phase 8: Version Bump & Final Verification

### Task 8.1: Update version and changelog

**Files:**
- Modify: `package.json` — bump version to `0.5.0`
- Modify: `CHANGELOG.md` — add v0.5.0 section

- [ ] **Step 1: Bump version in package.json**

Change `"version": "0.4.3"` to `"version": "0.5.0"`

- [ ] **Step 2: Add changelog entry**

```markdown
## [0.5.0] - 2026-03-24

### Added

#### New Application API Resources

- **Macro Resource** - NEW
  - Get Many: List all macros
  - Get: Retrieve a macro by ID
  - Create: Create a new macro with actions
  - Update: Modify macro settings
  - Delete: Remove a macro
  - Execute: Execute a macro on a conversation

- **Notification Resource** - NEW
  - Get Many: List notifications
  - Mark Read: Mark a notification as read
  - Mark Unread: Mark a notification as unread
  - Mark All Read: Mark all notifications as read
  - Delete: Remove a notification
  - Unread Count: Get count of unread notifications

- **Campaign Resource** - NEW
  - Get Many: List all campaigns
  - Get: Retrieve a campaign by ID
  - Create: Create a new campaign
  - Update: Modify campaign settings
  - Delete: Remove a campaign

- **Contact Note Resource** - NEW
  - Get Many: List all notes for a contact
  - Create: Create a note on a contact
  - Update: Modify a contact note
  - Delete: Remove a contact note

- **Conversation Participant Resource** - NEW
  - Get Many: List participants of a conversation
  - Add: Add participants to a conversation
  - Remove: Remove participants from a conversation

### Enhanced

- **Conversation Resource**
  - Mute: Mute a conversation
  - Unmute: Unmute a conversation
  - Delete: Delete a conversation
  - Search: Search conversations by query

- **Profile Resource**
  - Update: Update profile (name, email, availability, auto_offline)

- **Chatwoot Trigger Node**
  - Added conversation_typing_on and conversation_typing_off webhook events

### Fixed

- Fixed npm audit vulnerabilities (flatted, minimatch, ajv)

### Technical

- 32 total resources with 160+ operations
- 10 new webhook event types (total)
```

- [ ] **Step 3: Full verification**

```bash
npm run build && npm test && npm run lint
```

Expected: Build clean, all tests pass (66+), lint clean.

- [ ] **Step 4: Commit**

```bash
git add package.json CHANGELOG.md
git commit -m "chore: bump version to 0.5.0 + CHANGELOG"
```

---

## Verification Checkpoints

After each Phase, the executing agent MUST run:

1. `npm run build` — must exit 0 with no errors
2. `npm test` — all 66+ tests must pass
3. `npm run lint` — must exit 0 with no errors

If ANY check fails, stop and fix before proceeding to the next phase. Do NOT skip verification.

## Summary

| Phase | Resource/Change | Operations Added |
|-------|----------------|-----------------|
| 0 | npm audit fix | 0 |
| 1 | Macro | 6 (CRUD + execute) |
| 2 | Notification | 6 (list, read, unread, readAll, delete, count) |
| 3 | Campaign | 5 (CRUD) |
| 4 | Contact Note | 4 (CRUD) |
| 5 | Conversation Participant | 3 (list, add, remove) |
| 6 | Conversation ops + Profile update | 5 (mute, unmute, delete, search, profile update) |
| 7 | Trigger events | 2 new webhook events |
| 8 | Version bump | — |
| **Total** | **5 new resources, 7 new ops on existing** | **~31 new operations** |
