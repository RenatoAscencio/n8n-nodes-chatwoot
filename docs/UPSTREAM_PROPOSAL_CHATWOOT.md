# Upstream Proposal: Chatwoot Integration for n8n-MCP

## Summary

Add a Chatwoot integration module to n8n-MCP that enables AI agents to quickly scaffold workflows using the `@renatoascencio/n8n-nodes-chatwoot` community node.

## Motivation

Chatwoot is one of the most popular open-source customer engagement platforms with 20k+ GitHub stars. The `@renatoascencio/n8n-nodes-chatwoot` community node provides comprehensive API coverage (27 resources, 130+ operations) making it a strong candidate for first-class MCP integration.

Benefits for n8n-MCP users:
- **Faster workflow creation**: Pre-built templates for common Chatwoot use cases
- **Guided setup**: Installation instructions and connection validation
- **AI-friendly**: Capabilities summary helps AI agents understand what's available
- **Reduced errors**: Templates follow best practices and avoid common pitfalls

## Scope

### New Files
```
src/integrations/chatwoot/
├── index.ts                    # Module exports
├── chatwoot-integration.ts     # Main integration class
├── connection-validator.ts     # API connectivity tester
└── workflow-templates.ts       # 5 ready-to-use workflow templates
```

### Templates Included
| ID | Name | Category | Difficulty |
|----|------|----------|------------|
| `chatwoot-list-conversations` | List Open Conversations | monitoring | beginner |
| `chatwoot-contact-sync` | Contact Sync to Sheets | contact-sync | intermediate |
| `chatwoot-send-message` | Send Message to Conversation | messaging | beginner |
| `chatwoot-auto-assign` | Auto-Assign Conversations | automation | intermediate |
| `chatwoot-public-contact` | Create Contact via Public API | messaging | beginner |

### Integration Features
- `ChatwootIntegration.listTemplates()` - List available templates
- `ChatwootIntegration.getTemplate(id)` - Get specific template
- `ChatwootIntegration.getInstallationGuide()` - Installation instructions
- `ChatwootIntegration.getCapabilitiesSummary()` - Node capabilities for AI context
- `ChatwootIntegration.validateConnection(config)` - Test API connectivity
- `ChatwootConnectionValidator.testApplicationApi(...)` - Test specific API
- `ChatwootConnectionValidator.testPlatformApi(...)` - Test platform API

## Compatibility

- **No breaking changes**: New module in a new directory, no existing code modified
- **No new dependencies**: Uses only native `fetch` API
- **TypeScript**: Fully typed, follows existing code conventions
- **Config via ENV**: All sensitive values read from environment, never hardcoded

## Testing Plan

1. **Unit Tests**: Template structure validation, connection validator error handling
2. **Integration Tests**: Against a test Chatwoot instance (templates generate valid workflows)
3. **Manual Verification**: Import generated workflows into n8n UI

## How to Review

```bash
# Checkout the branch
git checkout feat/chatwoot-integration

# Review the new files
ls src/integrations/chatwoot/

# The integration is self-contained - no changes to existing code
git diff main --stat
```

## PR Draft Text

```
## feat: Add Chatwoot integration module

### What
Adds a Chatwoot integration to n8n-MCP enabling AI agents to quickly scaffold
Chatwoot-powered workflows using the @renatoascencio/n8n-nodes-chatwoot community node.

### Why
Chatwoot is a popular open-source customer engagement platform (20k+ GitHub stars).
The community node provides 27 resources and 130+ operations, making it one of the
most comprehensive community nodes available. This integration helps n8n-MCP users
leverage Chatwoot more effectively.

### What's Included
- 5 workflow templates (monitoring, sync, messaging, automation, public API)
- Connection validator for Application and Platform APIs
- Installation guide generator
- Capabilities summary for AI agent context
- Template discovery by category and difficulty

### Non-Breaking
- All new files in `src/integrations/chatwoot/`
- No changes to existing code
- No new dependencies
- Config via environment variables only

### Testing
- [ ] Templates generate valid n8n workflow JSON
- [ ] Connection validator handles success/failure/timeout
- [ ] Integration class methods return expected data
- [ ] All TypeScript types compile cleanly
```

## Contact

- **Community Node Author**: Renato Ascencio (@RenatoAscencio)
- **npm**: `@renatoascencio/n8n-nodes-chatwoot`
- **GitHub**: https://github.com/RenatoAscencio/n8n-nodes-chatwoot
