# n8n-nodes-chatwoot

This is an n8n community node for [Chatwoot](https://www.chatwoot.com/), the open-source customer engagement platform. It allows you to automate conversations, messages, and contacts in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

- **Conversations**: List, get, and update conversation status (open, resolved, pending, snoozed)
- **Messages**: Send messages and retrieve message history from conversations
- **Contacts**: Full CRUD operations (create, read, update, delete) plus search functionality
- **Pagination**: Automatic handling of paginated results with "Return All" option
- **Error Handling**: Clear error messages for common issues (authentication, rate limits, not found)

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `n8n-nodes-chatwoot` in the input field
4. Agree to the risks and select **Install**

### Manual Installation

To install this node manually in a self-hosted n8n instance:

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-chatwoot
```

Then restart n8n.

### Local Development

```bash
# Clone the repository
git clone https://github.com/RenatoAscencio/n8n-nodes-chatwoot.git
cd n8n-nodes-chatwoot

# Install dependencies
npm install

# Build the node
npm run build

# Link for local development
npm link

# In your n8n installation directory
npm link n8n-nodes-chatwoot
```

## Configuration

### Setting Up Credentials

1. In n8n, go to **Credentials > Add Credential > Search for "Chatwoot API"**
2. Configure the following fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Base URL** | Your Chatwoot instance URL | `https://app.chatwoot.com` (cloud) or `https://chatwoot.yourdomain.com` (self-hosted) |
| **Account ID** | Your Chatwoot account ID | Found in Settings → Account Settings or in URL (`/app/accounts/1/...`) |
| **API Access Token** | Your API token | Found in Profile Settings → Access Token |

### Getting Your API Access Token

1. Log in to your Chatwoot instance
2. Click on your profile icon (bottom left)
3. Go to **Profile Settings**
4. Find the **Access Token** section
5. Copy or generate your token

## Resources & Operations

### Conversation

| Operation | Description |
|-----------|-------------|
| **Get** | Get a single conversation by ID |
| **Get Many** | List conversations with filters (status, inbox, team, labels, search) |
| **Update Status** | Change conversation status (open, resolved, pending, snoozed) |

### Message

| Operation | Description |
|-----------|-------------|
| **Create** | Send a message to a conversation |
| **Get Many** | Get all messages from a conversation |

### Contact

| Operation | Description |
|-----------|-------------|
| **Create** | Create a new contact |
| **Get** | Get a single contact by ID |
| **Get Many** | List all contacts with sorting options |
| **Update** | Update contact information |
| **Delete** | Delete a contact |
| **Search** | Search contacts by name, email, phone, or identifier |

## Usage Examples

### Example 1: Auto-reply to New Conversations

```
Webhook → Chatwoot (Create Message)
```

When a new conversation is created in Chatwoot (via webhook), automatically send a welcome message.

### Example 2: Sync Contacts from CRM

```
CRM Trigger → Chatwoot (Create Contact)
```

When a new lead is created in your CRM, automatically create a contact in Chatwoot.

### Example 3: Close Old Conversations

```
Schedule Trigger → Chatwoot (Get Many) → Filter → Chatwoot (Update Status)
```

Run daily to find conversations older than 7 days and mark them as resolved.

### Example 4: Search and Update Customer Data

```
HTTP Request → Chatwoot (Search Contact) → IF → Chatwoot (Update Contact)
```

Search for a customer by email and update their information.

## Troubleshooting

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| **401 Unauthorized** | Invalid API token | Verify your API Access Token is correct |
| **403 Forbidden** | Insufficient permissions | Check your user role (Administrator vs Agent) |
| **404 Not Found** | Resource doesn't exist | Verify the ID exists in Chatwoot |
| **429 Rate Limited** | Too many requests | Wait before retrying (limit: 60 requests/minute) |

### Base URL Issues

- **Cloud users**: Use `https://app.chatwoot.com`
- **Self-hosted**: Use your custom domain (e.g., `https://chatwoot.yourdomain.com`)
- **Don't** include trailing slashes or `/api/v1`

### Agent vs Administrator Permissions

- **Administrators**: Can access all conversations and contacts
- **Agents**: Can only access conversations in their assigned inboxes

## API Reference

This node uses the [Chatwoot Application API v1](https://www.chatwoot.com/developers/api/).

## Contributing

Contributions are welcome! Please read the [CLAUDE.md](./CLAUDE.md) file for development guidelines.

```bash
# Development workflow
npm install        # Install dependencies
npm run build      # Build the node
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm test           # Run tests
npm run format     # Format code with Prettier
```

## License

[MIT](./LICENSE)

## Support

- **Issues**: [GitHub Issues](https://github.com/RenatoAscencio/n8n-nodes-chatwoot/issues)
- **Chatwoot Docs**: [developers.chatwoot.com](https://developers.chatwoot.com/)
- **n8n Community**: [community.n8n.io](https://community.n8n.io/)
