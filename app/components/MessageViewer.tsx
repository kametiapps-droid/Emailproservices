'use client';

import { memo, useEffect, useRef } from 'react';

interface Message {
  id: string;
  sender: string;
  subject: string;
  content: string;
  htmlContent?: string;
  attachments?: any[];
  receivedAt: string;
  isRead: boolean;
}

interface MessageViewerProps {
  message: Message;
}

const MessageViewer = memo(({ message }: MessageViewerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (message && iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        const hasHtmlTags = message.htmlContent && message.htmlContent.trim() !== '' && /<[^>]+>/.test(message.htmlContent);
        
        const htmlContent = hasHtmlTags
          ? `
            <html>
              <head>
                <style>
                  body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 20px; line-height: 1.6; color: #333; background: #fff; margin: 0; }
                  img { max-width: 100%; height: auto; }
                  a { color: #0066cc; text-decoration: none; }
                  a:hover { text-decoration: underline; }
                  table { max-width: 100%; border-collapse: collapse; }
                  pre { white-space: pre-wrap; word-wrap: break-word; background: #f5f5f5; padding: 10px; border-radius: 5px; }
                </style>
              </head>
              <body>${message.htmlContent?.replace(/<a\s+(?![^>]*target=)([^>]*?)>/g, '<a target="_blank" rel="noopener noreferrer" $1>')}</body>
            </html>
          `
          : `
            <html>
              <head>
                <style>
                  body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 20px; line-height: 1.6; color: #333; background: #fff; margin: 0; }
                  a { color: #0066cc; text-decoration: none; }
                  a:hover { text-decoration: underline; }
                  pre { white-space: pre-wrap; word-wrap: break-word; }
                </style>
              </head>
              <body>${message.content.replace(/\n/g, '<br>')}</body>
            </html>
          `;
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  }, [message]);

  return (
    <div className="message-detail-content">
      <div className="message-detail-header">
        <div>
          <h4>{message.subject}</h4>
          <p className="sender-email">{message.sender}</p>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        className="message-content-iframe"
        sandbox="allow-same-origin"
        title={`Message from ${message.sender}`}
      />
      {message.attachments && message.attachments.length > 0 && (
        <div className="message-attachments">
          <h5>Attachments</h5>
          <div className="attachment-list">
            {message.attachments.map((att, idx) => (
              <div key={idx} className="attachment-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>{att.filename}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

MessageViewer.displayName = 'MessageViewer';

export default MessageViewer;
