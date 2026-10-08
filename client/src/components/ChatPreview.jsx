// Static chat preview card showing a sample conversation
export default function ChatPreview() {
    return (
        <section className="chat-preview-section">
            <div className="chat-preview-card">
                {/* User bubble */}
                <div className="preview-user-row">
                    <div className="preview-user-bubble">
                        Can you explain how WebSockets stream data?
                    </div>
                </div>

                {/* AI bubble */}
                <div className="preview-ai-row">
                    <div className="preview-ai-avatar">
                        <svg style={{ width: '16px', height: '16px', color: '#111111' }} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <rect height="12" rx="2" width="18" x="3" y="8" />
                            <path d="M12 2v6" />
                            <path d="M9 14v1" />
                            <path d="M15 14v1" />
                        </svg>
                    </div>
                    <div className="preview-ai-bubble">
                        WebSockets maintain a persistent bi-directional TCP connection, allowing
                        real-time streaming with minimal overhead and zero polling latency.
                    </div>
                </div>

                {/* Typing indicator */}
                <div className="preview-typing-row">
                    <div className="preview-typing-dots">
                        <span className="dot-bounce" />
                        <span className="dot-bounce" />
                        <span className="dot-bounce" />
                    </div>
                </div>
            </div>
        </section>
    )
}
