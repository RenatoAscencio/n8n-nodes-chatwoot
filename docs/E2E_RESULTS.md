# E2E Test Results

**Date:** 2026-02-04T22:33:50.152Z
**Summary:** 16 passed, 0 failed, 9 skipped (25 total)

## Application API

| Resource | Operation | Status | Duration | Details |
|----------|-----------|--------|----------|---------|
| Account | Get | PASS | 295ms | Account: TEST (ID: 1) |
| Agent | Get Many | PASS | 271ms | Found 1 agents |
| Team | Get Many | PASS | 90ms | Found 0 teams |
| Inbox | Get Many | PASS | 88ms | Found 1 inboxes |
| Label | Get Many | PASS | 85ms | Found 0 labels |
| Contact | Create | PASS | 99ms | Created contact ID: 5 |
| Contact | Get | PASS | 89ms | Got contact ID: 5 |
| Contact | Get Many | PASS | 92ms | Found 1 contacts on page 1 |
| Contact | Update | PASS | 99ms | Updated contact ID: 5 |
| Contact | Search | PASS | 91ms | Search completed |
| Conversation | Get Many | PASS | 101ms | Found conversations (first ID: 1) |
| Conversation | Get | PASS | 97ms | Got conversation ID: 1 |
| Message | Create | PASS | 100ms | Message created |
| Message | Get Many | PASS | 113ms | Found 4 messages |
| Canned Response | Create | PASS | 93ms | Created canned response ID: 3 |
| Canned Response | Get Many | PASS | 90ms | Found 1 canned responses |

## Platform API

| Resource | Operation | Status | Duration | Details |
|----------|-----------|--------|----------|---------|
| Platform Account | List | SKIP | 0ms | Platform token lacks super-admin privileges (got 401) |
| Platform Account | Get | SKIP | 0ms | Platform token lacks super-admin privileges (got 401) |
| Platform User | List | SKIP | 0ms | Platform token lacks super-admin privileges (got 401) |
| Account User | List | SKIP | 0ms | Platform token lacks super-admin privileges (got 401) |

## Public API

| Resource | Operation | Status | Duration | Details |
|----------|-----------|--------|----------|---------|
| Public Contact | Create | SKIP | 0ms | Inbox identifier invalid or not a Web Widget inbox (got 404) |
| Public Conversation | Create | SKIP | 0ms | Inbox identifier invalid or not a Web Widget inbox (got 404) |
| Public Conversation | Get Many | SKIP | 0ms | Inbox identifier invalid or not a Web Widget inbox (got 404) |
| Public Message | Create | SKIP | 0ms | Inbox identifier invalid or not a Web Widget inbox (got 404) |
| Public Message | Get Many | SKIP | 0ms | Inbox identifier invalid or not a Web Widget inbox (got 404) |

