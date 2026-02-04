#!/usr/bin/env tsx
/**
 * E2E Test Runner for n8n-nodes-chatwoot
 *
 * Tests real Chatwoot API operations against a live instance.
 * Reads configuration from .env.local (never committed).
 *
 * Usage:
 *   npx tsx scripts/e2e-runner.ts [--suite application|platform|public]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TestResult {
  suite: string;
  resource: string;
  operation: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  message: string;
  duration: number;
}

interface EnvConfig {
  chatwootBaseUrl: string;
  chatwootAccountId: string;
  chatwootToken: string;
  chatwootPlatformToken: string;
  chatwootInboxIdentifier: string;
  n8nBaseUrl: string;
  n8nApiKey: string;
  debug: boolean;
}

// ---------------------------------------------------------------------------
// Environment Loading
// ---------------------------------------------------------------------------

function loadEnv(): EnvConfig {
  const envPath = resolve(process.cwd(), '.env.local');
  if (!existsSync(envPath)) {
    console.error('ERROR: .env.local not found. Copy .env.example to .env.local and fill in values.');
    process.exit(1);
  }

  const envContent = readFileSync(envPath, 'utf-8');
  const vars: Record<string, string> = {};

  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    vars[key] = value;
  }

  return {
    chatwootBaseUrl: (vars.CHATWOOT_BASE_URL || '').replace(/\/+$/, ''),
    chatwootAccountId: vars.CHATWOOT_ACCOUNT_ID || '1',
    chatwootToken: vars.CHATWOOT_TOKEN || '',
    chatwootPlatformToken: vars.CHATWOOT_PLATFORM_TOKEN || '',
    chatwootInboxIdentifier: vars.CHATWOOT_INBOX_IDENTIFIER || '',
    n8nBaseUrl: (vars.N8N_BASE_URL || '').replace(/\/+$/, ''),
    n8nApiKey: vars.N8N_API_KEY || '',
    debug: vars.DEBUG === 'true',
  };
}

// ---------------------------------------------------------------------------
// HTTP Helper
// ---------------------------------------------------------------------------

async function apiRequest(
  method: string,
  url: string,
  headers: Record<string, string>,
  body?: Record<string, unknown>,
  debug = false,
): Promise<{ status: number; data: unknown }> {
  const opts: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
  };
  if (body && method !== 'GET' && method !== 'DELETE') {
    opts.body = JSON.stringify(body);
  }

  if (debug) {
    console.log(`  [DEBUG] ${method} ${url}`);
  }

  const res = await fetch(url, opts);
  let data: unknown;
  const text = await res.text();
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (debug) {
    console.log(`  [DEBUG] Status: ${res.status}`);
  }

  return { status: res.status, data };
}

// ---------------------------------------------------------------------------
// Application API Tests
// ---------------------------------------------------------------------------

async function testApplicationApi(config: EnvConfig, results: TestResult[]): Promise<void> {
  const base = `${config.chatwootBaseUrl}/api/v1/accounts/${config.chatwootAccountId}`;
  const headers = { api_access_token: config.chatwootToken };

  console.log('\n=== Application API Tests ===\n');

  // Track created resources for cleanup
  let testContactId: number | undefined;
  let testCannedResponseId: number | undefined;
  let testConversationId: number | undefined;

  // --- Account: Get ---
  await runTest(results, 'Application', 'Account', 'Get', async () => {
    const { status, data } = await apiRequest('GET', base, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    if (!d.id && !d.name) throw new Error('Response missing id or name');
    return `Account: ${d.name} (ID: ${d.id})`;
  });

  // --- Agent: Get Many ---
  await runTest(results, 'Application', 'Agent', 'Get Many', async () => {
    const { status, data } = await apiRequest('GET', `${base}/agents`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const agents = Array.isArray(data) ? data : [];
    return `Found ${agents.length} agents`;
  });

  // --- Team: Get Many ---
  await runTest(results, 'Application', 'Team', 'Get Many', async () => {
    const { status, data } = await apiRequest('GET', `${base}/teams`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const teams = Array.isArray(data) ? data : [];
    return `Found ${teams.length} teams`;
  });

  // --- Inbox: Get Many ---
  await runTest(results, 'Application', 'Inbox', 'Get Many', async () => {
    const { status, data } = await apiRequest('GET', `${base}/inboxes`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    const inboxes = (d.payload || data) as unknown[];
    return `Found ${Array.isArray(inboxes) ? inboxes.length : '?'} inboxes`;
  });

  // --- Label: Get Many ---
  await runTest(results, 'Application', 'Label', 'Get Many', async () => {
    const { status, data } = await apiRequest('GET', `${base}/labels`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    const labels = (d.payload || data) as unknown[];
    return `Found ${Array.isArray(labels) ? labels.length : '?'} labels`;
  });

  // --- Contact: Create ---
  await runTest(results, 'Application', 'Contact', 'Create', async () => {
    const body = {
      name: '[E2E-TEST] Test Contact',
      email: `e2e-test-${Date.now()}@test.example.com`,
    };
    const { status, data } = await apiRequest('POST', `${base}/contacts`, headers, body, config.debug);
    if (status !== 200 && status !== 201) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    const payload = (d.payload || d) as Record<string, unknown>;
    const contact = (payload.contact || payload) as Record<string, unknown>;
    testContactId = contact.id as number;
    return `Created contact ID: ${testContactId}`;
  });

  // --- Contact: Get ---
  await runTest(results, 'Application', 'Contact', 'Get', async () => {
    if (!testContactId) throw new Error('No test contact created');
    const { status, data } = await apiRequest('GET', `${base}/contacts/${testContactId}`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    return `Got contact ID: ${testContactId}`;
  });

  // --- Contact: Get Many ---
  await runTest(results, 'Application', 'Contact', 'Get Many', async () => {
    const { status, data } = await apiRequest('GET', `${base}/contacts?page=1`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    const payload = (d.payload || []) as unknown[];
    return `Found ${Array.isArray(payload) ? payload.length : '?'} contacts on page 1`;
  });

  // --- Contact: Update ---
  await runTest(results, 'Application', 'Contact', 'Update', async () => {
    if (!testContactId) throw new Error('No test contact created');
    const body = { name: '[E2E-TEST] Updated Contact' };
    const { status, data } = await apiRequest('PUT', `${base}/contacts/${testContactId}`, headers, body, config.debug);
    if (status !== 200 && status !== 204) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    return `Updated contact ID: ${testContactId}`;
  });

  // --- Contact: Search ---
  await runTest(results, 'Application', 'Contact', 'Search', async () => {
    const { status, data } = await apiRequest('GET', `${base}/contacts/search?q=E2E-TEST&page=1`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    return 'Search completed';
  });

  // --- Conversation: Get Many ---
  await runTest(results, 'Application', 'Conversation', 'Get Many', async () => {
    const { status, data } = await apiRequest('GET', `${base}/conversations?page=1`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    const meta = d.data as Record<string, unknown>;
    const payload = (meta?.payload || d.payload || []) as unknown[];
    // Store first conversation for later tests
    if (Array.isArray(payload) && payload.length > 0) {
      testConversationId = (payload[0] as Record<string, unknown>).id as number;
    }
    return `Found conversations (first ID: ${testConversationId || 'none'})`;
  });

  // --- Conversation: Get ---
  await runTest(results, 'Application', 'Conversation', 'Get', async () => {
    if (!testConversationId) throw new Error('No conversation found');
    const { status, data } = await apiRequest('GET', `${base}/conversations/${testConversationId}`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    return `Got conversation ID: ${testConversationId}`;
  });

  // --- Message: Create ---
  await runTest(results, 'Application', 'Message', 'Create', async () => {
    if (!testConversationId) throw new Error('No conversation found');
    const body = {
      content: '[E2E-TEST] Automated test message - please ignore',
      message_type: 'outgoing',
      private: true,
    };
    const { status, data } = await apiRequest('POST', `${base}/conversations/${testConversationId}/messages`, headers, body, config.debug);
    if (status !== 200 && status !== 201) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    return 'Message created';
  });

  // --- Message: Get Many ---
  await runTest(results, 'Application', 'Message', 'Get Many', async () => {
    if (!testConversationId) throw new Error('No conversation found');
    const { status, data } = await apiRequest('GET', `${base}/conversations/${testConversationId}/messages`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    const payload = (d.payload || []) as unknown[];
    return `Found ${Array.isArray(payload) ? payload.length : '?'} messages`;
  });

  // --- Canned Response: Create ---
  await runTest(results, 'Application', 'Canned Response', 'Create', async () => {
    const body = {
      short_code: `e2e_test_${Date.now()}`,
      content: '[E2E-TEST] Automated test canned response',
    };
    const { status, data } = await apiRequest('POST', `${base}/canned_responses`, headers, body, config.debug);
    if (status !== 200 && status !== 201) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    testCannedResponseId = d.id as number;
    return `Created canned response ID: ${testCannedResponseId}`;
  });

  // --- Canned Response: Get Many ---
  await runTest(results, 'Application', 'Canned Response', 'Get Many', async () => {
    const { status, data } = await apiRequest('GET', `${base}/canned_responses`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const items = Array.isArray(data) ? data : [];
    return `Found ${items.length} canned responses`;
  });

  // --- Cleanup ---
  console.log('\n  Cleanup...');
  if (testCannedResponseId) {
    try {
      await apiRequest('DELETE', `${base}/canned_responses/${testCannedResponseId}`, headers, undefined, config.debug);
      console.log(`  Deleted canned response ${testCannedResponseId}`);
    } catch { /* ignore */ }
  }
  // Note: We don't delete contacts/conversations as they may be referenced by other data
  if (testContactId) {
    try {
      await apiRequest('DELETE', `${base}/contacts/${testContactId}`, headers, undefined, config.debug);
      console.log(`  Deleted contact ${testContactId}`);
    } catch { /* ignore */ }
  }
}

// ---------------------------------------------------------------------------
// Platform API Tests
// ---------------------------------------------------------------------------

async function testPlatformApi(config: EnvConfig, results: TestResult[]): Promise<void> {
  const base = `${config.chatwootBaseUrl}/platform/api/v1`;
  const headers = { api_access_token: config.chatwootPlatformToken };

  console.log('\n=== Platform API Tests ===\n');

  if (!config.chatwootPlatformToken) {
    console.log('  SKIP: No CHATWOOT_PLATFORM_TOKEN configured');
    results.push(
      { suite: 'Platform', resource: 'Platform Account', operation: 'List', status: 'SKIP', message: 'No platform token', duration: 0 },
      { suite: 'Platform', resource: 'Platform Account', operation: 'Get', status: 'SKIP', message: 'No platform token', duration: 0 },
      { suite: 'Platform', resource: 'Platform User', operation: 'List', status: 'SKIP', message: 'No platform token', duration: 0 },
      { suite: 'Platform', resource: 'Account User', operation: 'List', status: 'SKIP', message: 'No platform token', duration: 0 },
    );
    return;
  }

  // --- Platform Account: List ---
  await runTest(results, 'Platform', 'Platform Account', 'List', async () => {
    const { status, data } = await apiRequest('GET', `${base}/accounts`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const items = Array.isArray(data) ? data : [];
    return `Found ${items.length} accounts`;
  });

  // --- Platform Account: Get ---
  await runTest(results, 'Platform', 'Platform Account', 'Get', async () => {
    const { status, data } = await apiRequest('GET', `${base}/accounts/${config.chatwootAccountId}`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    return `Account: ${d.name}`;
  });

  // --- Platform User: List ---
  await runTest(results, 'Platform', 'Platform User', 'List', async () => {
    const { status, data } = await apiRequest('GET', `${base}/users`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const items = Array.isArray(data) ? data : [];
    return `Found ${items.length} users`;
  });

  // --- Account User: List ---
  await runTest(results, 'Platform', 'Account User', 'List', async () => {
    const { status, data } = await apiRequest('GET', `${base}/accounts/${config.chatwootAccountId}/account_users`, headers, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    const items = (d.data || d) as unknown[];
    return `Found ${Array.isArray(items) ? items.length : '?'} account users`;
  });
}

// ---------------------------------------------------------------------------
// Public API Tests
// ---------------------------------------------------------------------------

async function testPublicApi(config: EnvConfig, results: TestResult[]): Promise<void> {
  const base = `${config.chatwootBaseUrl}/public/api/v1/inboxes/${config.chatwootInboxIdentifier}`;

  console.log('\n=== Public API Tests ===\n');

  if (!config.chatwootInboxIdentifier) {
    console.log('  SKIP: No CHATWOOT_INBOX_IDENTIFIER configured');
    results.push(
      { suite: 'Public', resource: 'Public Contact', operation: 'Create', status: 'SKIP', message: 'No inbox identifier', duration: 0 },
      { suite: 'Public', resource: 'Public Conversation', operation: 'Create', status: 'SKIP', message: 'No inbox identifier', duration: 0 },
      { suite: 'Public', resource: 'Public Conversation', operation: 'Get Many', status: 'SKIP', message: 'No inbox identifier', duration: 0 },
      { suite: 'Public', resource: 'Public Message', operation: 'Create', status: 'SKIP', message: 'No inbox identifier', duration: 0 },
      { suite: 'Public', resource: 'Public Message', operation: 'Get Many', status: 'SKIP', message: 'No inbox identifier', duration: 0 },
    );
    return;
  }

  let contactSourceId: string | undefined;
  let conversationId: number | undefined;

  // --- Public Contact: Create ---
  await runTest(results, 'Public', 'Public Contact', 'Create', async () => {
    const body = {
      name: '[E2E-TEST] Public Contact',
      email: `e2e-public-${Date.now()}@test.example.com`,
      identifier: `e2e-${Date.now()}`,
    };
    const { status, data } = await apiRequest('POST', `${base}/contacts`, {}, body, config.debug);
    if (status !== 200 && status !== 201) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    contactSourceId = d.source_id as string;
    return `Created public contact (source_id: ${contactSourceId})`;
  });

  // --- Public Conversation: Create ---
  await runTest(results, 'Public', 'Public Conversation', 'Create', async () => {
    if (!contactSourceId) throw new Error('No public contact created');
    const { status, data } = await apiRequest('POST', `${base}/contacts/${contactSourceId}/conversations`, {}, {}, config.debug);
    if (status !== 200 && status !== 201) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    const d = data as Record<string, unknown>;
    conversationId = d.id as number;
    return `Created public conversation ID: ${conversationId}`;
  });

  // --- Public Conversation: Get Many ---
  await runTest(results, 'Public', 'Public Conversation', 'Get Many', async () => {
    if (!contactSourceId) throw new Error('No public contact created');
    const { status, data } = await apiRequest('GET', `${base}/contacts/${contactSourceId}/conversations`, {}, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    return 'Listed public conversations';
  });

  // --- Public Message: Create ---
  await runTest(results, 'Public', 'Public Message', 'Create', async () => {
    if (!contactSourceId || !conversationId) throw new Error('No public conversation created');
    const body = { content: '[E2E-TEST] Public message test' };
    const { status, data } = await apiRequest('POST', `${base}/contacts/${contactSourceId}/conversations/${conversationId}/messages`, {}, body, config.debug);
    if (status !== 200 && status !== 201) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    return 'Public message created';
  });

  // --- Public Message: Get Many ---
  await runTest(results, 'Public', 'Public Message', 'Get Many', async () => {
    if (!contactSourceId || !conversationId) throw new Error('No public conversation created');
    const { status, data } = await apiRequest('GET', `${base}/contacts/${contactSourceId}/conversations/${conversationId}/messages`, {}, undefined, config.debug);
    if (status !== 200) throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    return 'Listed public messages';
  });
}

// ---------------------------------------------------------------------------
// Test Runner Utilities
// ---------------------------------------------------------------------------

async function runTest(
  results: TestResult[],
  suite: string,
  resource: string,
  operation: string,
  fn: () => Promise<string>,
): Promise<void> {
  const start = Date.now();
  try {
    const msg = await fn();
    const duration = Date.now() - start;
    results.push({ suite, resource, operation, status: 'PASS', message: msg, duration });
    console.log(`  PASS  ${resource} > ${operation} (${duration}ms) - ${msg}`);
  } catch (err) {
    const duration = Date.now() - start;
    const message = err instanceof Error ? err.message : String(err);
    results.push({ suite, resource, operation, status: 'FAIL', message, duration });
    console.log(`  FAIL  ${resource} > ${operation} (${duration}ms) - ${message}`);
  }
}

function generateReport(results: TestResult[]): string {
  const now = new Date().toISOString();
  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL').length;
  const skipped = results.filter((r) => r.status === 'SKIP').length;

  let md = `# E2E Test Results\n\n`;
  md += `**Date:** ${now}\n`;
  md += `**Summary:** ${passed} passed, ${failed} failed, ${skipped} skipped (${results.length} total)\n\n`;

  // Group by suite
  const suites = [...new Set(results.map((r) => r.suite))];
  for (const suite of suites) {
    md += `## ${suite} API\n\n`;
    md += `| Resource | Operation | Status | Duration | Details |\n`;
    md += `|----------|-----------|--------|----------|---------|\n`;
    for (const r of results.filter((r) => r.suite === suite)) {
      const statusIcon = r.status === 'PASS' ? 'PASS' : r.status === 'FAIL' ? 'FAIL' : 'SKIP';
      const shortMsg = r.message.length > 80 ? r.message.slice(0, 77) + '...' : r.message;
      md += `| ${r.resource} | ${r.operation} | ${statusIcon} | ${r.duration}ms | ${shortMsg} |\n`;
    }
    md += '\n';
  }

  return md;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log('n8n-nodes-chatwoot E2E Test Runner');
  console.log('==================================\n');

  const config = loadEnv();
  const args = process.argv.slice(2);
  const suiteArg = args.indexOf('--suite') !== -1 ? args[args.indexOf('--suite') + 1] : 'all';

  if (!config.chatwootBaseUrl || !config.chatwootToken) {
    console.error('ERROR: CHATWOOT_BASE_URL and CHATWOOT_TOKEN are required in .env.local');
    process.exit(1);
  }

  console.log(`Chatwoot: ${config.chatwootBaseUrl}`);
  console.log(`Account: ${config.chatwootAccountId}`);
  console.log(`Suite: ${suiteArg}`);

  const results: TestResult[] = [];

  if (suiteArg === 'all' || suiteArg === 'application') {
    await testApplicationApi(config, results);
  }
  if (suiteArg === 'all' || suiteArg === 'platform') {
    await testPlatformApi(config, results);
  }
  if (suiteArg === 'all' || suiteArg === 'public') {
    await testPublicApi(config, results);
  }

  // Generate report
  const report = generateReport(results);
  const reportPath = resolve(process.cwd(), 'docs', 'E2E_RESULTS.md');
  writeFileSync(reportPath, report);

  // Summary
  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL').length;
  const skipped = results.filter((r) => r.status === 'SKIP').length;

  console.log('\n==================================');
  console.log(`Results: ${passed} PASS, ${failed} FAIL, ${skipped} SKIP`);
  console.log(`Report saved to: ${reportPath}`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
