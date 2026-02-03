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
// Conversation Types
// ============================================================================

export type ConversationStatus = 'open' | 'resolved' | 'pending' | 'snoozed' | 'all';
export type AssigneeType = 'me' | 'unassigned' | 'all' | 'assigned';

export interface IConversation extends IDataObject {
  id: number;
  account_id: number;
  inbox_id: number;
  status: ConversationStatus;
  assignee?: IDataObject;
  contact?: IContact;
  messages?: IMessage[];
  labels?: string[];
  created_at: string;
  updated_at: string;
  last_activity_at?: string;
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

// ============================================================================
// Message Types
// ============================================================================

export type MessageType = 'incoming' | 'outgoing';
export type ContentType = 'text' | 'input_email' | 'cards' | 'input_select' | 'form' | 'article';

export interface IMessage extends IDataObject {
  id: number;
  content: string;
  message_type: MessageType;
  content_type: ContentType;
  private: boolean;
  sender?: IDataObject;
  conversation_id: number;
  created_at: string;
  updated_at: string;
}

export interface IMessageCreate extends IDataObject {
  content: string;
  message_type?: MessageType;
  private?: boolean;
  content_type?: ContentType;
  content_attributes?: IDataObject;
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

// ============================================================================
// Inbox Types
// ============================================================================

export interface IInbox extends IDataObject {
  id: number;
  name: string;
  channel_type: string;
  avatar_url?: string;
  channel_id?: number;
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
