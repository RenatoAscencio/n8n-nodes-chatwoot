# Security Review - n8n-nodes-chatwoot v0.4.0

**Date:** 2026-02-04
**Scope:** Token handling, secret leakage, input validation, injection vectors

## Summary

No critical or high-severity security issues found. The codebase follows security best practices for an n8n community node.

## 1. Secret Management

### Token Storage

| Check | Status | Details |
|-------|--------|---------|
| API tokens marked as `password` type | PASS | `typeOptions: { password: true }` in all credential files |
| No hardcoded tokens in source | PASS | Full grep scan of repo - zero matches |
| No tokens in git history | PASS | `git log -p --all -S` scan clean |
| .gitignore covers .env files | PASS | `.env`, `.env.local`, `.env.*.local`, `*.env` all excluded |
| .gitignore covers key/pem files | PASS | `*.pem`, `*.key` excluded |
| No .env files in repo | PASS | No env files found in working tree |

### Token Transmission

| Check | Status | Details |
|-------|--------|---------|
| Application API: token in header | PASS | `api_access_token` header (Chatwoot convention) |
| Platform API: token in header | PASS | Same header pattern |
| Public API: no token | PASS | Uses inbox identifier in URL path (no auth header) |
| HTTPS default URLs | PASS | Default base URL is `https://app.chatwoot.com` |

### Token Leakage in Errors

| Check | Status | Details |
|-------|--------|---------|
| Error messages don't include tokens | PASS | `getErrorMessage` returns static messages |
| NodeApiError wraps original error | PASS | Token in request options not exposed to user |
| No console.log with sensitive data | PASS | No console.log calls in production code |

## 2. Input Validation

### Numeric IDs

| Check | Status | Details |
|-------|--------|---------|
| `validateId` rejects zero | PASS | Throws for `num < 1` |
| `validateId` rejects negative | PASS | Checked |
| `validateId` rejects NaN | PASS | `isNaN(num)` check |
| `validateId` rejects non-integer | PASS | `Number.isInteger(num)` check |
| `validateId` used consistently | PASS | All ID parameters in execute() validated |

### String Inputs

| Check | Status | Details |
|-------|--------|---------|
| `validateString` checks empty | PASS | Rejects empty/whitespace-only |
| `validateString` trims input | PASS | Prevents whitespace-based bypasses |

### URL Validation

| Check | Status | Severity | Details |
|-------|--------|----------|---------|
| Base URL normalization | PASS | - | Trailing slashes stripped |
| Base URL trim | PASS | - | Leading/trailing whitespace removed |
| Protocol validation | INFO | LOW | No explicit https:// check; relies on user input. Mitigated by default value being https |

**Recommendation:** The lack of protocol validation is low risk because:
1. The base URL comes from n8n credentials (user-configured)
2. The default value is `https://app.chatwoot.com`
3. n8n itself controls who can edit credentials

## 3. Injection Vectors

### SQL Injection
**N/A** - The node doesn't interact with any database directly. All data flows through Chatwoot's REST API.

### Command Injection
**N/A** - No `exec`, `eval`, `Function`, or shell command execution found.

### XSS
**N/A** - This is a backend n8n node. No HTML rendering or DOM manipulation.

### SSRF (Server-Side Request Forgery)

| Check | Status | Details |
|-------|--------|---------|
| Base URL user-controlled | ACKNOWLEDGED | By design - n8n nodes must connect to user-specified servers |
| No URL path traversal | PASS | Endpoints are hardcoded paths with validated IDs |
| No redirect following issues | PASS | Uses n8n's built-in HTTP client |

**Mitigation:** SSRF is inherent to n8n's design (nodes connect to user-configured endpoints). This is not a vulnerability in the node itself.

## 4. Rate Limiting

| Check | Status | Details |
|-------|--------|---------|
| Rate limit detection (429) | PASS | Clear error message with limit info |
| Pagination safety limits | PASS | Max 100 pages, 10000 messages |
| No infinite loop risk | PASS | Multiple break conditions in pagination |

## 5. Credential Test Security

| Credential | Test Endpoint | Method | Risk |
|-----------|--------------|--------|------|
| Application API | `/conversations?page=1` | GET | LOW - read-only |
| Platform API | `/agent_bots` | GET | LOW - read-only |
| Public API | None | N/A | N/A - no test configured |

All credential tests use read-only GET requests, minimizing risk of accidental data modification.

## 6. Threat Model

| Threat | Likelihood | Impact | Mitigation |
|--------|-----------|--------|------------|
| Token leaked in logs | LOW | HIGH | No logging of sensitive data; password type hides in UI |
| Token leaked in error | LOW | HIGH | Static error messages; NodeApiError wrapping |
| Malicious baseUrl (SSRF) | LOW | MEDIUM | User-configured credentials; n8n access control |
| ID injection in URL path | LOW | LOW | All IDs validated as positive integers |
| Rate limit abuse | LOW | LOW | Pagination limits + Chatwoot's own rate limiting |

## 7. Conclusion

The node follows security best practices:
- Tokens are properly marked as passwords and never logged
- Input validation is consistent across all operations
- Error messages are static and don't leak sensitive data
- No injection vectors exist
- Pagination has safety limits to prevent abuse

**Overall Security Rating: GOOD**
