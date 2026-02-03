# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-02-03

### Added

This is a **major expansion release** that brings the node to feature parity with ~130+ operations across Application, Platform, and Public APIs. Total resources increased from 15 to 27.

#### New Credentials

- **ChatwootPlatformApi** - Platform API token for managing accounts, users, and agent bots at the platform level
- **ChatwootPublicApi** - Public API authentication using inbox identifier for widget/client-side operations

#### New Application API Resources

- **Profile Resource** - NEW
  - Fetch: Get the authenticated user's profile

- **Help Center Resource** - NEW
  - Create Portal: Create a new help center portal
  - Get Portal: Retrieve portal details by slug
  - Update Portal: Modify portal settings
  - Create Category: Add a category to a portal
  - Create Article: Add an article to a portal

- **Integration Resource** - NEW
  - Get Many: List all integrations
  - Create Hook: Create an integration hook (Dialogflow, Slack, etc.)
  - Update Hook: Modify hook settings
  - Delete Hook: Remove an integration hook

- **Audit Log Resource** - NEW
  - Get Many: Retrieve account audit logs

- **CSAT Survey Resource** - NEW
  - Get: Get CSAT survey for a conversation

#### New Platform API Resources (requires ChatwootPlatformApi credential)

- **Platform Account Resource** - NEW
  - Create: Create a new account
  - Get: Retrieve account details
  - Update: Modify account settings
  - Delete: Remove an account

- **Platform User Resource** - NEW
  - Create: Create a new platform user
  - Get: Retrieve user details
  - Update: Modify user settings
  - Delete: Remove a user
  - Get SSO URL: Generate SSO login URL

- **Account User Resource** - NEW
  - Get Many: List all users in an account
  - Create: Add a user to an account
  - Delete: Remove a user from an account

- **Account Agent Bot Resource** - NEW
  - Get Many: List all account agent bots
  - Get: Retrieve an agent bot by ID
  - Create: Create a new account agent bot
  - Update: Modify agent bot settings
  - Delete: Remove an account agent bot

#### New Public API Resources (requires ChatwootPublicApi credential)

- **Public Contact Resource** - NEW
  - Create: Create a contact via public API
  - Get: Retrieve contact details
  - Update: Update contact information

- **Public Conversation Resource** - NEW
  - Create: Create a conversation via public API
  - Get: Retrieve a conversation
  - Get Many: List all conversations for a contact
  - Resolve: Resolve/toggle conversation status
  - Toggle Typing: Show typing indicator
  - Update Last Seen: Mark messages as seen

- **Public Message Resource** - NEW
  - Create: Send a message via public API
  - Get Many: List messages in a conversation
  - Update: Update a message

### Enhanced

- **Contact Resource**
  - Filter: Filter contacts with advanced criteria
  - Add Labels: Add labels to a contact
  - List Labels: Get all labels for a contact

- **Conversation Resource**
  - Update: Update conversation (custom attributes, team, etc.)
  - Filter: Filter conversations with advanced criteria
  - Update Custom Attributes: Set custom attributes on conversation
  - List Labels: Get all labels for a conversation
  - Get Meta: Get conversation metadata

- **Message Resource**
  - Update: Update an existing message

- **Team Resource**
  - Add Agent: Add an agent to a team
  - Delete Agent: Remove an agent from a team
  - Get Members: List team members
  - Update Agents: Update team agent memberships

- **Inbox Resource**
  - Create: Create a new inbox
  - Add Agent: Add an agent to an inbox
  - Delete Agent: Remove an agent from an inbox
  - Get Members: List inbox members
  - Get Agent Bot: Get associated agent bot
  - Set Agent Bot: Associate an agent bot with inbox

### Technical

- Multi-API architecture supporting Application, Platform, and Public APIs
- Conditional credential selection based on resource type
- Enhanced GenericFunctions for handling different API authentication patterns
- 27 total resources with 130+ operations

---

## [0.3.0] - 2026-02-03

### Added

This release adds 4 more resources and additional operations for existing resources, bringing the total to 15 resources with 55+ operations.

- **Agent Bot Resource** - NEW
  - Get Many: List all agent bots
  - Get: Retrieve an agent bot by ID
  - Create: Create a new agent bot
  - Update: Modify agent bot settings
  - Delete: Remove an agent bot

- **Automation Rule Resource** - NEW
  - Get Many: List all automation rules
  - Get: Retrieve an automation rule by ID
  - Create: Create a new automation rule with conditions and actions
  - Update: Modify automation rule settings
  - Delete: Remove an automation rule

- **Custom Filter Resource** - NEW
  - Get Many: List all custom filters (conversation, contact, report)
  - Get: Retrieve a custom filter by ID
  - Create: Create a new custom filter
  - Update: Modify filter settings
  - Delete: Remove a custom filter

- **Report Resource** - NEW
  - Account Summary: Get account-level report summary
  - Agent Statistics: Get agent conversation metrics
  - Conversation Counts: Get conversation counts by status
  - Conversation Statistics: Get statistics grouped by agent, inbox, team, or channel

### Enhanced

- **Conversation Resource**
  - Create: Create a new conversation
  - Toggle Priority: Set conversation priority (urgent, high, medium, low, none)

- **Message Resource**
  - Delete: Delete a message from a conversation

### Fixed

- **Icon**: Updated to official Chatwoot logo from Simple Icons for better display in n8n

---

## [0.2.0] - 2026-02-03

### Added

This is a major feature release that significantly expands the node's capabilities with 8 new resources, a trigger node, and improved UX.

- **Chatwoot Trigger Node** - NEW
  - Webhook-based trigger that starts workflows when events occur in Chatwoot
  - Auto-registers and manages webhooks in Chatwoot
  - Supports 8 event types: conversation_created, conversation_status_changed, conversation_updated, message_created, message_updated, contact_created, contact_updated, webwidget_triggered

- **Account Resource** - NEW
  - Get: Retrieve account information
  - Update: Modify account settings (name, locale, support email, auto-resolve duration)

- **Agent Resource** - NEW
  - Get Many: List all agents in the account
  - Create: Add a new agent with email, name, and role
  - Update: Modify agent settings (role, availability, auto-offline)
  - Delete: Remove an agent from the account

- **Team Resource** - NEW
  - Get Many: List all teams
  - Get: Retrieve team details
  - Create: Create a new team
  - Update: Modify team settings
  - Delete: Remove a team

- **Inbox Resource** - NEW
  - Get Many: List all inboxes
  - Get: Retrieve inbox details
  - Update: Modify inbox settings (name, greeting, auto-assignment, etc.)

- **Label Resource** - NEW
  - Get Many: List all labels
  - Create: Create a new label with title, color, and description
  - Update: Modify label properties
  - Delete: Remove a label

- **Canned Response Resource** - NEW
  - Get Many: List all canned responses
  - Create: Create a new canned response (short code + content)
  - Update: Modify an existing canned response
  - Delete: Remove a canned response

- **Custom Attribute Resource** - NEW
  - Get Many: List all custom attributes
  - Get: Retrieve a specific attribute by key
  - Create: Create a new custom attribute for contacts or conversations
  - Update: Modify an existing attribute
  - Delete: Remove a custom attribute

- **Webhook Resource** - NEW
  - Get Many: List all webhooks
  - Create: Register a new webhook URL with event subscriptions
  - Update: Modify webhook URL or subscriptions
  - Delete: Remove a webhook

- **Dynamic Dropdowns**
  - Agents: Auto-populated list of agents for assignment
  - Teams: Auto-populated list of teams for assignment
  - Inboxes: Auto-populated list of inboxes for filtering
  - Labels: Auto-populated list of labels for tagging

### Enhanced

- **Conversation Resource**
  - Assign: Assign conversations to agents or teams with dynamic dropdowns
  - Add Labels: Set labels on conversations with multi-select dropdown

- **Contact Resource**
  - Get Conversations: Retrieve all conversations for a specific contact
  - Merge: Merge two contacts into one

### Improved

- **TypeScript Types**: Comprehensive type definitions for all Chatwoot entities
- **Test Suite**: Expanded from 7 to 19 tests with coverage for simplifyResponse
- **README**: Complete redesign with badges, table of contents, Docker instructions, and comprehensive documentation
- **Error Messages**: Improved user-friendly error messages with actionable solutions

### Technical

- Official Chatwoot logo SVG from brand-assets repository
- Modular resource/operation architecture for maintainability
- LoadOptions methods for dynamic dropdown population
- Support for both page-based and cursor-based pagination

## [0.1.2] - 2026-02-03

### Fixed

- Republished package after npm token revocation

## [0.1.1] - 2025-02-03

### Changed

- Renamed package to `@renatoascencio/n8n-nodes-chatwoot` (original name was already taken on npm)
- Added `publishConfig` for scoped public package

## [0.1.0] - 2025-02-03

### Added

- Initial release of @renatoascencio/n8n-nodes-chatwoot
- **Conversation Resource**
  - Get: Retrieve a single conversation by ID
  - Get Many: List conversations with filters (status, inbox, team, labels, search query, assignee type)
  - Update Status: Change conversation status (open, resolved, pending, snoozed)
- **Message Resource**
  - Create: Send a message to a conversation (supports outgoing/incoming, private notes)
  - Get Many: Retrieve all messages from a conversation with cursor-based pagination
- **Contact Resource**
  - Create: Create new contacts with name, email, phone, identifier, and custom attributes
  - Get: Retrieve a single contact by ID
  - Get Many: List contacts with sorting options
  - Update: Update contact fields including custom attributes
  - Delete: Remove a contact
  - Search: Search contacts by name, email, phone, or identifier
- **Authentication**
  - Support for Chatwoot API Access Token
  - Compatible with both Cloud (app.chatwoot.com) and self-hosted instances
  - Credential testing on save
- **Pagination**
  - Automatic page-based pagination for conversations and contacts
  - Cursor-based pagination for messages
  - "Return All" option with configurable limits
- **Error Handling**
  - User-friendly error messages for common HTTP errors (401, 403, 404, 429, 500)
  - Support for n8n's "Continue on Fail" option
  - Input validation for required fields
