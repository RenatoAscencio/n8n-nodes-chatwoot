# E2E Testing Guide

## Prerequisites

- Node.js >= 18
- A running Chatwoot instance with API access
- A running n8n instance with API access (optional, for workflow tests)
- `npm install` completed in the project root

## Environment Setup

1. Copy the example env file:

```bash
cp .env.example .env.local
```

2. Fill in your credentials in `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `CHATWOOT_BASE_URL` | Yes | Base URL of your Chatwoot instance |
| `CHATWOOT_ACCOUNT_ID` | Yes | Chatwoot account ID (usually `1` for self-hosted) |
| `CHATWOOT_TOKEN` | Yes | API Access Token from Chatwoot Profile Settings |
| `CHATWOOT_PLATFORM_TOKEN` | No | Platform API token (super admin only) |
| `CHATWOOT_INBOX_IDENTIFIER` | No | Inbox identifier for Public API tests |
| `N8N_BASE_URL` | No | Base URL of your n8n instance |
| `N8N_API_KEY` | No | n8n API key for workflow tests |

3. Verify `.env.local` is in `.gitignore` (it already is).

## Running E2E Tests

### Full Suite

```bash
npx tsx scripts/e2e-runner.ts
```

### Specific API Only

```bash
# Application API only
npx tsx scripts/e2e-runner.ts --suite application

# Platform API only
npx tsx scripts/e2e-runner.ts --suite platform

# Public API only
npx tsx scripts/e2e-runner.ts --suite public
```

## What the E2E Runner Tests

### Application API
| Resource | Operations | Notes |
|----------|-----------|-------|
| Contact | Create, Get, Get Many, Update, Search | Creates test contact, cleans up after |
| Conversation | Get Many, Get, Update Status | Uses existing or newly created conversation |
| Message | Create, Get Many | Sends test message to a conversation |
| Agent | Get Many | Lists agents in the account |
| Team | Get Many | Lists teams in the account |
| Inbox | Get Many | Lists inboxes in the account |
| Label | Get Many | Lists labels in the account |
| Canned Response | Get Many, Create, Delete | Creates and cleans up test response |
| Account | Get | Gets account information |

### Platform API
| Resource | Operations | Notes |
|----------|-----------|-------|
| Platform Account | Get, List | Requires super admin token |
| Platform User | List | Requires super admin token |
| Account User | List | Lists users in an account |

### Public API
| Resource | Operations | Notes |
|----------|-----------|-------|
| Public Contact | Create | Creates contact via public API |
| Public Conversation | Create, Get Many | Creates conversation for public contact |
| Public Message | Create, Get Many | Sends message via public API |

## Test Data Management

- The E2E runner creates test data with identifiable prefixes (`[E2E-TEST]`)
- Cleanup runs automatically at the end of each suite
- If cleanup fails, test data can be identified and removed manually

## Troubleshooting

### Common Issues

**401 Unauthorized**
- Verify your `CHATWOOT_TOKEN` is correct
- Check that the token has not expired
- Ensure the token belongs to the correct account

**404 Not Found**
- Verify `CHATWOOT_BASE_URL` is correct (no trailing slash)
- Check `CHATWOOT_ACCOUNT_ID` matches your account

**Platform API 403**
- Platform API requires a super admin token
- Regular user tokens will not work for platform endpoints

**Public API failures**
- Ensure `CHATWOOT_INBOX_IDENTIFIER` is a valid website channel inbox identifier
- The inbox must be of type `web_widget` for public API to work

### Debugging

Set `DEBUG=true` in `.env.local` to enable verbose request/response logging:

```bash
DEBUG=true npx tsx scripts/e2e-runner.ts
```

## Results

After running, results are saved to `docs/E2E_RESULTS.md` with a table of all operations tested and their PASS/FAIL status.
