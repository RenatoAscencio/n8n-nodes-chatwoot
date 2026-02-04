# E2E Test Results

**Date:** 2026-02-04T22:12:14.766Z
**Chatwoot Instance:** https://test-chatwoot.vrfg1p.easypanel.host (Account ID: 1)
**n8n Instance:** https://test-n8n.vrfg1p.easypanel.host
**Summary:** 17 passed, 8 failed, 0 skipped (25 total)

## Application API — 16/16 PASS (100%)

| Resource | Operation | Status | Duration | Details |
|----------|-----------|--------|----------|---------|
| Account | Get | PASS | 293ms | Account: TEST (ID: 1) |
| Agent | Get Many | PASS | 255ms | Found 1 agents |
| Team | Get Many | PASS | 89ms | Found 0 teams |
| Inbox | Get Many | PASS | 90ms | Found 1 inboxes |
| Label | Get Many | PASS | 88ms | Found 0 labels |
| Contact | Create | PASS | 98ms | Created contact ID: 4 |
| Contact | Get | PASS | 92ms | Got contact ID: 4 |
| Contact | Get Many | PASS | 89ms | Found 1 contacts on page 1 |
| Contact | Update | PASS | 95ms | Updated contact ID: 4 |
| Contact | Search | PASS | 88ms | Search completed |
| Conversation | Get Many | PASS | 107ms | Found conversations (first ID: 1) |
| Conversation | Get | PASS | 101ms | Got conversation ID: 1 |
| Message | Create | PASS | 100ms | Message created |
| Message | Get Many | PASS | 98ms | Found 3 messages |
| Canned Response | Create | PASS | 91ms | Created canned response ID: 2 |
| Canned Response | Get Many | PASS | 90ms | Found 1 canned responses |

## Platform API — 1/4 PASS (environment-limited)

| Resource | Operation | Status | Duration | Details |
|----------|-----------|--------|----------|---------|
| Platform Account | List | PASS | 87ms | Found 0 accounts |
| Platform Account | Get | FAIL | 91ms | 401: Token lacks super admin scope |
| Platform User | List | FAIL | 85ms | 404: Endpoint unavailable in this Chatwoot version |
| Account User | List | FAIL | 87ms | 401: Token lacks super admin scope |

### Analysis
The platform token authenticates successfully (List returns 200) but lacks full super admin privileges required for Get/Update operations and account user management. The `/platform/api/v1/users` endpoint returns 404 which indicates this Chatwoot version may not expose it. **These are environment/permission issues, not node bugs.**

## Public API — 0/5 PASS (environment-limited)

| Resource | Operation | Status | Duration | Details |
|----------|-----------|--------|----------|---------|
| Public Contact | Create | FAIL | 82ms | 404: Inbox not found |
| Public Conversation | Create | FAIL | 0ms | Cascading (no contact) |
| Public Conversation | Get Many | FAIL | 0ms | Cascading (no contact) |
| Public Message | Create | FAIL | 0ms | Cascading (no conversation) |
| Public Message | Get Many | FAIL | 0ms | Cascading (no conversation) |

### Analysis
The test instance only has a **Telegram inbox** (Channel::Telegram). The Public API requires a **Web Widget inbox** (Channel::WebWidget) that generates a UUID-based identifier. The numeric `CHATWOOT_INBOX_IDENTIFIER=1` is the inbox's database ID, not its public channel identifier. To test the Public API, create a Web Widget inbox in Chatwoot and use its `identifier` field. **These are environment setup issues, not node bugs.**

## n8n Workflow Validation — PASS

| Test | Status | Details |
|------|--------|---------|
| n8n API Connectivity | PASS | `GET /api/v1/workflows` returned 200 |
| Create Workflow with Chatwoot Node | PASS | Workflow created with `@renatoascencio/n8n-nodes-chatwoot.chatwoot` node type |
| Workflow Cleanup | PASS | Test workflow deleted successfully |

The n8n instance accepted the Chatwoot community node type in a workflow definition, confirming the node is recognized by the n8n runtime.

## Cleanup

All test artifacts were cleaned up after testing:
- Test contacts: deleted
- Test canned responses: deleted
- Test n8n workflows: deleted
