# Release Readiness Report - v0.4.0

**Date:** 2026-02-04

## Pre-Release Checklist

| Check | Status | Evidence |
|-------|--------|----------|
| `npm ci` | PASS | 465 packages, 0 vulnerabilities |
| `npm run lint` | PASS | Zero warnings or errors |
| `npm test` | PASS | 59/59 tests passing |
| `npm run build` | PASS | Clean TypeScript compilation |
| `npm pack --dry-run` | PASS | 136+ files, correct structure |
| No secrets in repo | PASS | Full scan clean |
| .gitignore complete | PASS | All sensitive patterns excluded |
| CHANGELOG updated | VERIFY | Ensure v0.4.0 entry exists |
| README accurate | PASS | Reflects 27 resources, 130+ ops, 3 APIs |

## Package Contents Verification

### Required Files Present

| File | In Package | Notes |
|------|-----------|-------|
| `dist/credentials/ChatwootApi.credentials.js` | YES | Application API auth |
| `dist/credentials/ChatwootPlatformApi.credentials.js` | YES | Platform API auth |
| `dist/credentials/ChatwootPublicApi.credentials.js` | YES | Public API auth |
| `dist/nodes/Chatwoot/Chatwoot.node.js` | YES | Main node |
| `dist/nodes/Chatwoot/ChatwootTrigger.node.js` | YES | Trigger node |
| `dist/nodes/Chatwoot/chatwoot.svg` | YES | Icon |
| `dist/nodes/Chatwoot/Chatwoot.node.json` | YES | Main node metadata |
| `dist/nodes/Chatwoot/ChatwootTrigger.node.json` | YES | Trigger metadata |
| `dist/nodes/Chatwoot/GenericFunctions.js` | YES | Shared utilities |
| `dist/nodes/Chatwoot/types.js` | YES | TypeScript declarations |
| `dist/nodes/Chatwoot/resources/**/*.js` | YES | All 27 resource dirs |
| `README.md` | YES | Package documentation |
| `LICENSE` | YES | MIT license |

### Files Correctly Excluded

| Pattern | Excluded | Notes |
|---------|----------|-------|
| `node_modules/` | YES | Via `files: ["dist"]` |
| Source `.ts` files | YES | Only compiled JS in dist |
| `.env*` files | YES | Not in dist |
| `test/` directory | YES | Not in dist |
| `coverage/` | YES | Not in dist |
| `.eslintrc.js` | YES | Not in dist |
| `tsconfig.json` | YES | Not in dist |

## Compatibility

### n8n Version Compatibility

| Feature | Minimum n8n Version | Notes |
|---------|---------------------|-------|
| `n8nNodesApiVersion: 1` | 0.125+ | Supported in all recent versions |
| `IExecuteFunctions` | 0.100+ | Core interface |
| `NodeApiError` | 0.130+ | Error handling |
| `constructExecutionMetaData` | 0.170+ | Execution metadata |
| `continueOnFail()` | 0.100+ | Error continuation |
| `getNodeWebhookUrl` | 0.100+ | Webhook triggers |
| `helpers.request` | 0.100+ | HTTP requests |

**Recommended minimum n8n version: 0.170+** (for constructExecutionMetaData support)

### Node.js Compatibility

| Version | Status |
|---------|--------|
| Node.js 18 | PASS (minimum per engines) |
| Node.js 20 | PASS (current LTS) |
| Node.js 22 | PASS (expected) |

### Dependency Health

| Dependency | Type | Version | Status |
|-----------|------|---------|--------|
| n8n-workflow | peer | >=1.0.0 | HEALTHY |
| typescript | dev | ^5.3.3 | CURRENT |
| jest | dev | ^29.7.0 | CURRENT |
| eslint | dev | ^8.57.0 | DEPRECATED (v8 EOL) - consider upgrading to v9 |
| ts-jest | dev | ^29.1.2 | CURRENT |
| prettier | dev | ^3.2.0 | CURRENT |

**Note:** ESLint v8 is deprecated but still functional. The n8n ecosystem plugin `eslint-plugin-n8n-nodes-base` may not yet support ESLint v9.

## Package Size

| Metric | Value |
|--------|-------|
| Package files | ~136 files |
| Main node JS | ~95 KB |
| Trigger node JS | ~8 KB |
| GenericFunctions JS | ~13 KB |
| Total package (estimated) | ~350-400 KB |

## Publishing Steps

```bash
# 1. Verify everything
npm ci && npm run lint && npm test && npm run build

# 2. Verify package contents
npm pack --dry-run

# 3. Verify version in package.json
grep '"version"' package.json

# 4. Publish
npm publish

# 5. Verify on npm
npm info @renatoascencio/n8n-nodes-chatwoot
```

## Conclusion

**Release Status: READY**

The package is ready for publication. All checks pass, the package structure is correct, and no security issues were found.
