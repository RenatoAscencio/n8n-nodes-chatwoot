# n8n-nodes-chatwoot

[![npm version](https://img.shields.io/npm/v/@renatoascencio/n8n-nodes-chatwoot.svg)](https://www.npmjs.com/package/@renatoascencio/n8n-nodes-chatwoot)
[![npm downloads](https://img.shields.io/npm/dm/@renatoascencio/n8n-nodes-chatwoot.svg)](https://www.npmjs.com/package/@renatoascencio/n8n-nodes-chatwoot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n community node](https://img.shields.io/badge/n8n-community%20node-orange)](https://docs.n8n.io/integrations/community-nodes/)

<p align="center">
  <img src="https://www.chatwoot.com/images/logo/logo.svg" alt="Chatwoot Logo" width="200">
</p>

A comprehensive n8n community node for [Chatwoot](https://www.chatwoot.com/) - the open-source customer engagement platform. Automate your customer support workflows with full access to conversations, messages, contacts, agents, teams, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

---

## Highlights

- **11 Resources** - Full coverage of the Chatwoot API
- **45+ Operations** - Complete CRUD operations for all resources
- **Trigger Node** - Real-time webhook events from Chatwoot
- **Dynamic Dropdowns** - Auto-populated lists for agents, teams, inboxes, and labels
- **Smart Pagination** - Automatic handling with "Return All" option
- **Detailed Error Messages** - Clear feedback for troubleshooting

---

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Nodes](#nodes)
  - [Chatwoot Node](#chatwoot-node)
  - [Chatwoot Trigger](#chatwoot-trigger)
- [Resources & Operations](#resources--operations)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `@renatoascencio/n8n-nodes-chatwoot`
4. Accept the risks and select **Install**

### Manual Installation

```bash
# For self-hosted n8n
cd ~/.n8n/nodes
npm install @renatoascencio/n8n-nodes-chatwoot

# Restart n8n
```

### Docker

Add to your `docker-compose.yml`:

```yaml
environment:
  - N8N_CUSTOM_EXTENSIONS=@renatoascencio/n8n-nodes-chatwoot
```

Or install in a running container:

```bash
docker exec -it n8n npm install -g @renatoascencio/n8n-nodes-chatwoot
docker restart n8n
```

---

## Configuration

### Creating Credentials

1. In n8n, go to **Credentials > Add Credential**
2. Search for **Chatwoot API**
3. Fill in the required fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Base URL** | Your Chatwoot instance URL | `https://app.chatwoot.com` or `https://chatwoot.yourdomain.com` |
| **Account ID** | Your Chatwoot account ID | Found in URL: `/app/accounts/1/...` |
| **API Access Token** | Your personal API token | Found in Profile Settings |

### Getting Your API Access Token

1. Log in to Chatwoot
2. Click your **profile icon** (bottom left)
3. Go to **Profile Settings**
4. Scroll to **Access Token**
5. Copy or regenerate your token

> **Note**: Keep your API token secure. It provides full access to your Chatwoot account.

---

## Nodes

### Chatwoot Node

The main node for interacting with the Chatwoot API. Supports 11 resources with full CRUD operations.

### Chatwoot Trigger

Webhook-based trigger that starts workflows when events occur in Chatwoot. Automatically registers and manages webhooks in your Chatwoot account.

**Supported Events:**
- `conversation_created` - New conversation started
- `conversation_status_changed` - Status changed (open/resolved/pending/snoozed)
- `conversation_updated` - Conversation modified
- `message_created` - New message sent or received
- `message_updated` - Message edited
- `contact_created` - New contact added
- `contact_updated` - Contact information changed
- `webwidget_triggered` - Web widget interaction

---

## Resources & Operations

### Account

Manage your Chatwoot account settings.

| Operation | Description |
|-----------|-------------|
| **Get** | Get account information |
| **Update** | Update account settings (name, locale, support email, auto-resolve duration) |

### Agent

Manage team members and their settings.

| Operation | Description |
|-----------|-------------|
| **Get Many** | List all agents in the account |
| **Create** | Add a new agent (requires email, name, role) |
| **Update** | Modify agent settings (role, availability, auto-offline) |
| **Delete** | Remove an agent from the account |

### Canned Response

Manage pre-saved response templates.

| Operation | Description |
|-----------|-------------|
| **Get Many** | List all canned responses |
| **Create** | Create a new canned response (short code + content) |
| **Update** | Modify an existing canned response |
| **Delete** | Remove a canned response |

### Contact

Full contact management with search and merge capabilities.

| Operation | Description |
|-----------|-------------|
| **Create** | Create a new contact (requires inbox_id) |
| **Get** | Retrieve a contact by ID |
| **Get Many** | List all contacts with pagination |
| **Update** | Modify contact details |
| **Delete** | Remove a contact |
| **Search** | Find contacts by name, email, phone, or identifier |
| **Get Conversations** | List all conversations for a contact |
| **Merge** | Merge two contacts into one |

### Conversation

Manage customer conversations with assignment and labeling.

| Operation | Description |
|-----------|-------------|
| **Get** | Get a single conversation with full details |
| **Get Many** | List conversations with filters (status, inbox, team, labels, search) |
| **Update Status** | Change status to open, resolved, pending, or snoozed |
| **Assign** | Assign to an agent or team (with dynamic dropdowns) |
| **Add Labels** | Set labels on a conversation |

### Custom Attribute

Manage custom fields for contacts and conversations.

| Operation | Description |
|-----------|-------------|
| **Get Many** | List all custom attributes |
| **Get** | Get a specific attribute by key |
| **Create** | Create a new custom attribute |
| **Update** | Modify an existing attribute |
| **Delete** | Remove a custom attribute |

### Inbox

Manage communication channels.

| Operation | Description |
|-----------|-------------|
| **Get Many** | List all inboxes |
| **Get** | Get inbox details |
| **Update** | Modify inbox settings (name, greeting, auto-assignment, etc.) |

### Label

Organize conversations and contacts with labels.

| Operation | Description |
|-----------|-------------|
| **Get Many** | List all labels |
| **Create** | Create a new label (title, color, description) |
| **Update** | Modify label properties |
| **Delete** | Remove a label |

### Message

Send and retrieve messages in conversations.

| Operation | Description |
|-----------|-------------|
| **Create** | Send a message (supports private notes) |
| **Get Many** | Retrieve message history with cursor-based pagination |

### Team

Manage agent teams for conversation routing.

| Operation | Description |
|-----------|-------------|
| **Get Many** | List all teams |
| **Get** | Get team details |
| **Create** | Create a new team |
| **Update** | Modify team settings |
| **Delete** | Remove a team |

### Webhook

Manage webhook subscriptions programmatically.

| Operation | Description |
|-----------|-------------|
| **Get Many** | List all webhooks |
| **Create** | Register a new webhook URL with event subscriptions |
| **Update** | Modify webhook URL or subscriptions |
| **Delete** | Remove a webhook |

---

## Usage Examples

### Auto-Reply to New Conversations

```
Chatwoot Trigger (conversation_created)
  → Chatwoot (Create Message)
```

Automatically send a welcome message when a new conversation is created.

### Sync Contacts from Your CRM

```
CRM Trigger (new lead)
  → Chatwoot (Create Contact)
```

Keep your Chatwoot contacts in sync with your CRM.

### Close Stale Conversations

```
Schedule Trigger (daily)
  → Chatwoot (Get Many Conversations: status=pending)
  → Filter (older than 7 days)
  → Chatwoot (Update Status: resolved)
```

Automatically resolve conversations that have been inactive.

### Route Conversations by Label

```
Chatwoot Trigger (conversation_updated)
  → IF (label = "urgent")
    → Chatwoot (Assign to specific team)
  → ELSE
    → Chatwoot (Assign to general team)
```

Auto-assign conversations based on labels.

### Daily Agent Performance Report

```
Schedule Trigger (daily)
  → Chatwoot (Get Many Conversations: resolved today)
  → Aggregate by agent
  → Email (send report)
```

Generate daily performance metrics.

### Contact Merge Deduplication

```
Webhook (CRM update)
  → Chatwoot (Search Contact by email)
  → IF (multiple found)
    → Chatwoot (Merge Contacts)
```

Automatically merge duplicate contacts.

---

## Troubleshooting

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| **401 Unauthorized** | Invalid API token | Regenerate your API Access Token |
| **403 Forbidden** | Insufficient permissions | Use an Administrator account or check inbox access |
| **404 Not Found** | Resource doesn't exist | Verify the ID is correct |
| **422 Unprocessable Entity** | Invalid data format | Check required fields and data types |
| **429 Rate Limited** | Too many requests | Wait 60 seconds (limit: 60 req/min) |

### Base URL Configuration

| Instance Type | Base URL |
|--------------|----------|
| Chatwoot Cloud | `https://app.chatwoot.com` |
| Self-hosted | `https://your-domain.com` |

> **Important**: Do not include `/api/v1` or trailing slashes.

### Permission Levels

| Role | Access |
|------|--------|
| **Administrator** | All resources, all inboxes |
| **Agent** | Only assigned inboxes, limited operations |

### Webhook Issues

If the Chatwoot Trigger isn't receiving events:

1. Check that your n8n instance is publicly accessible
2. Verify the webhook was created in Chatwoot (Settings > Integrations > Webhooks)
3. Ensure the selected events match what Chatwoot is sending
4. Check n8n's execution log for incoming requests

---

## API Reference

This node uses the [Chatwoot Application API v1](https://www.chatwoot.com/developers/api/).

### API Documentation

- [Chatwoot API Reference](https://www.chatwoot.com/developers/api/)
- [Webhooks Documentation](https://www.chatwoot.com/docs/product/features/webhooks)
- [API Authentication](https://www.chatwoot.com/hc/user-guide/articles/1684764-api-access)

---

## Contributing

Contributions are welcome! See [CLAUDE.md](./CLAUDE.md) for development guidelines.

```bash
# Clone and setup
git clone https://github.com/RenatoAscencio/n8n-nodes-chatwoot.git
cd n8n-nodes-chatwoot
npm install

# Development
npm run build      # Compile TypeScript
npm run lint       # Check code style
npm run lint:fix   # Auto-fix issues
npm test           # Run tests
npm run format     # Format with Prettier

# Link for local testing
npm link
cd ~/.n8n/nodes && npm link @renatoascencio/n8n-nodes-chatwoot
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

---

## License

[MIT](./LICENSE) - See LICENSE file for details.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/RenatoAscencio/n8n-nodes-chatwoot/issues)
- **Chatwoot Docs**: [chatwoot.com/developers](https://www.chatwoot.com/developers/api/)
- **n8n Community**: [community.n8n.io](https://community.n8n.io/)

---

<p align="center">
  Made with care for the n8n and Chatwoot communities
</p>
