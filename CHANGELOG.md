# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
