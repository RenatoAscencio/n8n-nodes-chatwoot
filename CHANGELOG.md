# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
