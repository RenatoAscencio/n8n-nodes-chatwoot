import type {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class ChatwootPublicApi implements ICredentialType {
  name = 'chatwootPublicApi';
  displayName = 'Chatwoot Public API';
  documentationUrl = 'https://www.chatwoot.com/developers/api/#tag/Contacts-API';
  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://app.chatwoot.com',
      placeholder: 'https://app.chatwoot.com',
      description:
        'The base URL of your Chatwoot instance. Use https://app.chatwoot.com for Chatwoot Cloud, or your self-hosted instance URL.',
      required: true,
    },
    {
      displayName: 'Inbox Identifier',
      name: 'inboxIdentifier',
      type: 'string',
      default: '',
      description:
        'The unique identifier for your inbox. This is the website_token or inbox_identifier from your website channel settings. Found in Inbox Settings → Configuration.',
      required: true,
    },
  ];

  // Public API doesn't require authentication headers - it uses inbox identifier in the URL
  // No test request since it depends on having valid contact/conversation data
}
