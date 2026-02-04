# Audit Report - n8n-nodes-chatwoot v0.4.0

**Date:** 2026-02-04
**Auditor:** Automated + Manual Review
**Scope:** Full codebase audit (structure, quality, compatibility, security, packaging)

## Executive Summary

The `@renatoascencio/n8n-nodes-chatwoot` package is well-structured, implements 27 resources with 130+ operations across three Chatwoot API types, and follows n8n community node conventions. The codebase passes all lint, build, and test checks. A few minor improvements are recommended below.

## 1. Structural Review

### Package Configuration (package.json)

| Check | Status | Notes |
|-------|--------|-------|
| `n8n-community-node-package` keyword | PASS | Present in keywords array |
| `n8n` section with nodes/credentials | PASS | All 2 nodes + 3 credentials listed |
| `files` field | PASS | `["dist"]` - only compiled output |
| `publishConfig` | PASS | `{ "access": "public" }` |
| `engines` | PASS | `"node": ">=18.0.0"` |
| `peerDependencies` | PASS | `n8n-workflow >=1.0.0` |
| `prepublishOnly` script | PASS | Runs build before publish |
| `main` field | PASS | Points to `dist/nodes/Chatwoot/Chatwoot.node.js` |

### Build Output

| Check | Status | Notes |
|-------|--------|-------|
| TypeScript compilation | PASS | No errors |
| Icon files copied | PASS | SVG + node.json in dist |
| Credential JS files | PASS | All 3 present in dist/credentials |
| Node JS files | PASS | Chatwoot.node.js + ChatwootTrigger.node.js |
| Source maps | PASS | .js.map files generated |

### npm pack Output

Total files: 136+ files included in tarball
- All dist/ JS, .d.ts, .js.map files present
- SVG icon and node.json metadata included
- No source .ts files leaked into package
- No .env or secret files in package

## 2. Code Quality

### TypeScript

| Check | Status | Notes |
|-------|--------|-------|
| Strict mode | PASS | `strict: true` in tsconfig |
| No implicit any | PASS | Enforced by strict mode |
| ESLint passes | PASS | Zero warnings or errors |
| All types from n8n-workflow | PASS | Proper type imports used throughout |

### n8n Idioms

| Check | Status | Notes |
|-------|--------|-------|
| `NodeApiError` usage | PASS | Used in all 3 API request functions |
| `NodeOperationError` usage | PASS | Used for unsupported operations |
| `continueOnFail()` support | PASS | Implemented in main execute loop |
| `displayOptions.show` | PASS | All fields properly conditioned |
| `loadOptions` methods | PASS | 7 dynamic dropdown loaders |
| `constructExecutionMetaData` | PASS | Used for proper output formatting |
| `itemIndex` in errors | PASS | Included in NodeOperationError calls |

### Error Handling

| HTTP Code | Message Quality | Status |
|-----------|----------------|--------|
| 400 | Actionable - mentions input parameters | PASS |
| 401 | Actionable - mentions Profile Settings | PASS |
| 403 | Actionable - mentions role and permissions | PASS |
| 404 | Actionable - mentions verifying ID | PASS |
| 422 | Actionable - mentions required fields | PASS |
| 429 | Actionable - mentions rate limit (60/min) | PASS |
| 500/502/503 | Informative - suggests retry | PASS |
| Unknown codes | Falls back to original error message | PASS |

### Pagination

| Type | Implementation | Status |
|------|---------------|--------|
| Page-based (Application) | `chatwootApiRequestAllItems` | PASS |
| Page-based (Platform) | `chatwootPlatformApiRequestAllItems` | PASS |
| Cursor-based (Messages) | `chatwootApiRequestAllMessages` | PASS |
| Safety limits | 100 pages / 10000 messages | PASS |
| Multiple response formats | payload/data/array handled | PASS |

## 3. Findings

### MEDIUM: `this.helpers.request` vs `this.helpers.httpRequest`

**Description:** The code uses `this.helpers.request` (older pattern) instead of `this.helpers.httpRequest` (newer, recommended).

**Impact:** Both work, but `httpRequest` is the recommended approach in newer n8n versions and provides better built-in error handling.

**Status:** Informational - no functional issue. Can be migrated in a future major version.

### LOW: `getCategories` is a stub

**Description:** The `getCategories` loadOptions method ([GenericFunctions.ts:588-601](nodes/Chatwoot/GenericFunctions.ts#L588-L601)) returns an empty array with a comment about needing the portal slug.

**Impact:** Categories dropdown will always be empty. Users need to input category IDs manually.

**Status:** Known limitation - documented in code. Consider implementing dependent dropdown loading.

### LOW: Public API credential has no test request

**Description:** `ChatwootPublicApi.credentials.ts` has no `test` property, so n8n cannot validate the credential on save.

**Impact:** Users won't get immediate feedback if their inbox identifier is wrong.

**Recommendation:** Add a test request to a known endpoint (e.g., creating a temporary contact or listing a conversation).

### INFO: Trigger node webhook management

**Description:** The trigger node properly implements webhook lifecycle (checkExists, create, delete) and handles edge cases (webhook already exists, webhook deleted externally).

**Status:** Well implemented. No issues found.

### INFO: Resource count verification

All 27 resource directories match their imports in `Chatwoot.node.ts`:
- 20 Application API resources (account through csatSurvey)
- 4 Platform API resources (platformAccount, platformUser, accountUser, accountAgentBot)
- 3 Public API resources (publicContact, publicConversation, publicMessage)

## 4. Test Coverage

| Metric | Before Audit | After Audit |
|--------|-------------|-------------|
| Test suites | 1 | 1 |
| Test cases | 19 | 59 |
| Categories covered | 2 (validateId, simplifyResponse) | 8 (+validateString, URLs, errors, auth, body handling, pagination) |
| Execution time | ~0.6s | ~0.6s |

## 5. Recommendations

1. **Future:** Migrate from `this.helpers.request` to `this.helpers.httpRequest` when doing next major version
2. **Future:** Implement dependent dropdown for Help Center categories
3. **Consider:** Add credential test for Public API
4. **Consider:** Add `n8nNodesApiVersion: 1` bump to 2 when targeting newer n8n versions only
