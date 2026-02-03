import type { IDataObject } from 'n8n-workflow';

// ============================================================================
// API Response Types
// ============================================================================

export interface IChatwootApiResponse {
  meta?: {
    count?: number;
    current_page?: number;
    total_pages?: number;
  };
  payload?: IDataObject[] | IDataObject;
  data?: IDataObject[] | IDataObject;
}

// ============================================================================
// Account Types
// ============================================================================

export interface IAccount extends IDataObject {
  id: number;
  name: string;
  locale: string;
  domain?: string;
  support_email?: string;
  features?: IDataObject;
  auto_resolve_duration?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IAccountUpdate extends IDataObject {
  name?: string;
  locale?: string;
  domain?: string;
  support_email?: string;
  auto_resolve_duration?: number;
}

// ============================================================================
// Agent Types
// ============================================================================

export type AgentRole = 'agent' | 'administrator';
export type AgentAvailabilityStatus = 'available' | 'busy' | 'offline';

export interface IAgent extends IDataObject {
  id: number;
  uid: string;
  name: string;
  email: string;
  role: AgentRole;
  confirmed: boolean;
  availability_status?: AgentAvailabilityStatus;
  auto_offline?: boolean;
  custom_attributes?: IDataObject;
  available_name?: string;
  thumbnail?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IAgentCreate extends IDataObject {
  name: string;
  email: string;
  role: AgentRole;
  availability_status?: AgentAvailabilityStatus;
  auto_offline?: boolean;
}

export interface IAgentUpdate extends IDataObject {
  name?: string;
  role?: AgentRole;
  availability_status?: AgentAvailabilityStatus;
  auto_offline?: boolean;
}

// ============================================================================
// Team Types
// ============================================================================

export interface ITeam extends IDataObject {
  id: number;
  name: string;
  description?: string;
  allow_auto_assign?: boolean;
  account_id?: number;
  is_member?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ITeamCreate extends IDataObject {
  name: string;
  description?: string;
  allow_auto_assign?: boolean;
}

export interface ITeamUpdate extends IDataObject {
  name?: string;
  description?: string;
  allow_auto_assign?: boolean;
}

// ============================================================================
// Inbox Types
// ============================================================================

export type ChannelType =
  | 'web_widget'
  | 'api'
  | 'email'
  | 'twitter'
  | 'facebook'
  | 'whatsapp'
  | 'sms'
  | 'telegram'
  | 'line';

export interface IInbox extends IDataObject {
  id: number;
  name: string;
  channel_type: ChannelType;
  avatar_url?: string;
  channel_id?: number;
  website_url?: string;
  welcome_title?: string;
  welcome_tagline?: string;
  greeting_enabled?: boolean;
  greeting_message?: string;
  enable_auto_assignment?: boolean;
  working_hours_enabled?: boolean;
  out_of_office_message?: string;
  timezone?: string;
  csat_survey_enabled?: boolean;
  allow_messages_after_resolved?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IInboxCreate extends IDataObject {
  name: string;
  channel?: IDataObject;
  avatar?: string;
  greeting_enabled?: boolean;
  greeting_message?: string;
  enable_auto_assignment?: boolean;
  working_hours_enabled?: boolean;
  out_of_office_message?: string;
  timezone?: string;
  csat_survey_enabled?: boolean;
  allow_messages_after_resolved?: boolean;
}

export interface IInboxUpdate extends IDataObject {
  name?: string;
  avatar?: string;
  greeting_enabled?: boolean;
  greeting_message?: string;
  enable_auto_assignment?: boolean;
  working_hours_enabled?: boolean;
  out_of_office_message?: string;
  timezone?: string;
  csat_survey_enabled?: boolean;
  allow_messages_after_resolved?: boolean;
  enable_email_collect?: boolean;
  business_name?: string;
  website_url?: string;
  welcome_title?: string;
  welcome_tagline?: string;
}

// ============================================================================
// Label Types
// ============================================================================

export interface ILabel extends IDataObject {
  id: number;
  title: string;
  description?: string;
  color?: string;
  show_on_sidebar?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ILabelCreate extends IDataObject {
  title: string;
  description?: string;
  color?: string;
  show_on_sidebar?: boolean;
}

export interface ILabelUpdate extends IDataObject {
  title?: string;
  description?: string;
  color?: string;
  show_on_sidebar?: boolean;
}

// ============================================================================
// Canned Response Types
// ============================================================================

export interface ICannedResponse extends IDataObject {
  id: number;
  short_code: string;
  content: string;
  account_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ICannedResponseCreate extends IDataObject {
  short_code: string;
  content: string;
}

export interface ICannedResponseUpdate extends IDataObject {
  short_code?: string;
  content?: string;
}

// ============================================================================
// Custom Attribute Types
// ============================================================================

export type CustomAttributeModel = 'contact_attribute' | 'conversation_attribute';
export type CustomAttributeType = 'text' | 'number' | 'currency' | 'percent' | 'link' | 'date' | 'list' | 'checkbox';

export interface ICustomAttribute extends IDataObject {
  id: number;
  attribute_display_name: string;
  attribute_display_type: CustomAttributeType;
  attribute_description?: string;
  attribute_key: string;
  attribute_model: CustomAttributeModel;
  default_value?: string | number | boolean;
  attribute_values?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ICustomAttributeCreate extends IDataObject {
  attribute_display_name: string;
  attribute_display_type: CustomAttributeType;
  attribute_description?: string;
  attribute_key: string;
  attribute_model: CustomAttributeModel;
  default_value?: string | number | boolean;
  attribute_values?: string[];
}

export interface ICustomAttributeUpdate extends IDataObject {
  attribute_display_name?: string;
  attribute_description?: string;
  default_value?: string | number | boolean;
  attribute_values?: string[];
}

// ============================================================================
// Webhook Types
// ============================================================================

export type WebhookSubscription =
  | 'conversation_created'
  | 'conversation_status_changed'
  | 'conversation_updated'
  | 'message_created'
  | 'message_updated'
  | 'webwidget_triggered'
  | 'contact_created'
  | 'contact_updated';

export interface IWebhook extends IDataObject {
  id: number;
  url: string;
  subscriptions: WebhookSubscription[];
  account_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IWebhookCreate extends IDataObject {
  url: string;
  subscriptions: WebhookSubscription[];
}

export interface IWebhookUpdate extends IDataObject {
  url?: string;
  subscriptions?: WebhookSubscription[];
}

// ============================================================================
// Automation Rule Types
// ============================================================================

export type AutomationEventType =
  | 'conversation_created'
  | 'conversation_updated'
  | 'message_created'
  | 'conversation_opened';

export type AutomationActionType =
  | 'assign_agent'
  | 'assign_team'
  | 'add_label'
  | 'remove_label'
  | 'send_email'
  | 'send_message'
  | 'resolve_conversation'
  | 'mute_conversation'
  | 'snooze_conversation'
  | 'send_webhook_event'
  | 'send_attachment';

export interface IAutomationRule extends IDataObject {
  id: number;
  name: string;
  description?: string;
  event_name: AutomationEventType;
  active: boolean;
  actions: IDataObject[];
  conditions: IDataObject[];
  account_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IAutomationRuleCreate extends IDataObject {
  name: string;
  description?: string;
  event_name: AutomationEventType;
  active?: boolean;
  actions: IDataObject[];
  conditions: IDataObject[];
}

// ============================================================================
// Agent Bot Types
// ============================================================================

export interface IAgentBot extends IDataObject {
  id: number;
  name: string;
  description?: string;
  outgoing_url?: string;
  account_id?: number;
  bot_type?: string;
  bot_config?: IDataObject;
  created_at?: string;
  updated_at?: string;
}

export interface IAgentBotCreate extends IDataObject {
  name: string;
  description?: string;
  outgoing_url?: string;
}

export interface IAgentBotUpdate extends IDataObject {
  name?: string;
  description?: string;
  outgoing_url?: string;
}

// ============================================================================
// Conversation Types
// ============================================================================

export type ConversationStatus = 'open' | 'resolved' | 'pending' | 'snoozed' | 'all';
export type AssigneeType = 'me' | 'unassigned' | 'all' | 'assigned';
export type ConversationPriority = 'urgent' | 'high' | 'medium' | 'low' | 'none';

export interface IConversation extends IDataObject {
  id: number;
  account_id: number;
  inbox_id: number;
  status: ConversationStatus;
  priority?: ConversationPriority;
  assignee?: IDataObject;
  contact?: IContact;
  messages?: IMessage[];
  labels?: string[];
  team_id?: number;
  additional_attributes?: IDataObject;
  custom_attributes?: IDataObject;
  first_reply_created_at?: string;
  created_at: string;
  updated_at: string;
  last_activity_at?: string;
  waiting_since?: number;
  snoozed_until?: number;
  unread_count?: number;
  agent_last_seen_at?: number;
}

export interface IConversationFilters extends IDataObject {
  status?: ConversationStatus;
  assignee_type?: AssigneeType;
  inbox_id?: number;
  team_id?: number;
  labels?: string[];
  q?: string;
  page?: number;
}

export interface IConversationCreate extends IDataObject {
  source_id: string;
  inbox_id: number;
  contact_id?: number;
  additional_attributes?: IDataObject;
  custom_attributes?: IDataObject;
  status?: ConversationStatus;
  assignee_id?: number;
  team_id?: number;
}

export interface IConversationAssign extends IDataObject {
  assignee_id?: number;
  team_id?: number;
}

// ============================================================================
// Message Types
// ============================================================================

export type MessageType = 'incoming' | 'outgoing' | 'activity' | 'template';
export type ContentType = 'text' | 'input_email' | 'cards' | 'input_select' | 'form' | 'article' | 'input_csat';

export interface IMessage extends IDataObject {
  id: number;
  content: string;
  message_type: MessageType;
  content_type: ContentType;
  private: boolean;
  sender?: IDataObject;
  conversation_id: number;
  attachments?: IDataObject[];
  content_attributes?: IDataObject;
  created_at: string;
  updated_at: string;
}

export interface IMessageCreate extends IDataObject {
  content: string;
  message_type?: MessageType;
  private?: boolean;
  content_type?: ContentType;
  content_attributes?: IDataObject;
  template_params?: IDataObject;
  attachments?: IDataObject[];
}

// ============================================================================
// Contact Types
// ============================================================================

export interface IContact extends IDataObject {
  id: number;
  name?: string;
  email?: string;
  phone_number?: string;
  identifier?: string;
  thumbnail?: string;
  additional_attributes?: IDataObject;
  custom_attributes?: IDataObject;
  contact_inboxes?: IDataObject[];
  created_at: string;
  updated_at: string;
  last_activity_at?: string;
}

export interface IContactCreate extends IDataObject {
  inbox_id: number;
  name?: string;
  email?: string;
  phone_number?: string;
  identifier?: string;
  custom_attributes?: IDataObject;
  additional_attributes?: IDataObject;
}

export interface IContactUpdate extends IDataObject {
  name?: string;
  email?: string;
  phone_number?: string;
  identifier?: string;
  custom_attributes?: IDataObject;
  additional_attributes?: IDataObject;
  avatar_url?: string;
  blocked?: boolean;
}

export interface IContactFilter extends IDataObject {
  attribute_key: string;
  filter_operator: 'equal_to' | 'not_equal_to' | 'contains' | 'does_not_contain' | 'is_present' | 'is_not_present';
  values?: string[];
  query_operator?: 'and' | 'or';
}

export interface IContactMerge extends IDataObject {
  base_contact_id: number;
  mergee_contact_id: number;
}

// ============================================================================
// Report Types
// ============================================================================

export type ReportType = 'account' | 'agent' | 'inbox' | 'label' | 'team';
export type ReportMetric = 'conversations_count' | 'incoming_messages_count' | 'outgoing_messages_count' | 'avg_first_response_time' | 'avg_resolution_time' | 'resolutions_count' | 'reply_time';

export interface IReportParams extends IDataObject {
  type: ReportType;
  metric: ReportMetric;
  since?: string;
  until?: string;
  id?: number;
  timezone_offset?: number;
}

// ============================================================================
// Trigger/Webhook Event Types (for Trigger Node)
// ============================================================================

export type TriggerEventType =
  | 'conversation_created'
  | 'conversation_status_changed'
  | 'conversation_updated'
  | 'message_created'
  | 'message_updated'
  | 'webwidget_triggered'
  | 'contact_created'
  | 'contact_updated';

export interface ITriggerEvent extends IDataObject {
  event: TriggerEventType;
  account?: IDataObject;
  inbox?: IDataObject;
  conversation?: IDataObject;
  message?: IDataObject;
  contact?: IDataObject;
  sender?: IDataObject;
}

// ============================================================================
// Error Types
// ============================================================================

export interface IChatwootError extends IDataObject {
  error?: string;
  message?: string;
  error_code?: string;
  errors?: IDataObject[];
}
