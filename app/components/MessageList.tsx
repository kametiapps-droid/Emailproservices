'use client';

import { memo } from 'react';

interface Attachment {
  filename: string;
  contentType: string;
  size: number;
  url?: string;
}

interface Message {
  id: string;
  sender: string;
  subject: string;
  content: string;
  htmlContent?: string;
  attachments?: Attachment[];
  receivedAt: string;
  isRead: boolean;
}

interface MessageListProps {
  messages: Message[];
  selectedMessageId: string | null;
  onSelectMessage: (message: Message) => void;
  onDeleteMessage: (messageId: string, e: React.MouseEvent) => void;
  formatTime: (dateString: string) => string;
}

const MessageList = memo(({
  messages,
  selectedMessageId,
  onSelectMessage,
  onDeleteMessage,
  formatTime,
}: MessageListProps) => {
  if (messages.length === 0) {
    return (
      <div className="empty-inbox">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <p>Your inbox is empty</p>
        <p className="empty-inbox-subtext">New emails will appear here as they arrive</p>
      </div>
    );
  }

  return (
    <div className="messages-container">
      {messages.map(message => (
        <div
          key={message.id}
          className={`message-item ${selectedMessageId === message.id ? 'selected' : ''} ${!message.isRead ? 'unread' : ''}`}
          onClick={() => onSelectMessage(message)}
        >
          <div className="message-header-row">
            <div className="message-left">
              <div className="message-avatar">{message.sender.charAt(0).toUpperCase()}</div>
              <div className="message-info">
                <div className="message-sender">{message.sender}</div>
                <div className="message-subject">{message.subject}</div>
              </div>
            </div>
            <button
              className="message-delete-btn"
              onClick={(e) => onDeleteMessage(message.id, e)}
              title="Delete message"
              aria-label="Delete message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
          <div className="message-footer-row">
            <div className="message-preview">{message.content.substring(0, 80)}{message.content.length > 80 ? '...' : ''}</div>
            <div className="message-time">{formatTime(message.receivedAt)}</div>
          </div>
        </div>
      ))}
    </div>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
