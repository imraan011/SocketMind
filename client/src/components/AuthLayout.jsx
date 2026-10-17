import { Link } from 'react-router-dom';

// Split screen auth layout component
export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      {/* Left side: Single-column on mobile, split on desktop */}
      <main className="auth-left">
        <div className="auth-form-card">
          <Link to="/" className="auth-mobile-brand" aria-label="Go to homepage">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v6m0 8v6M2 12h6m8 0h6" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>SocketMind</span>
          </Link>

          {children}
        </div>
      </main>

      {/* Right side: Dark panel with animated mock preview */}
      <aside className="auth-right" aria-hidden="true">
        <div className="showcase-header">
          <svg className="brand-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v6m0 8v6M2 12h6m8 0h6" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span className="brand-title">SocketMind</span>
        </div>

        <div className="showcase-center">
          <h2 className="showcase-tagline">
            Ask anything. <br />
            Get answers <span className="highlight-lime">in real time.</span>
          </h2>

          <div className="mock-chat-preview">
            {/* Bubble 1: Mock User prompt */}
            <div className="mock-bubble-user">
              How fast is SocketMind&apos;s real-time streaming?
            </div>

            {/* Bubble 2: Mock AI assistant reply */}
            <div className="mock-bubble-ai">
              <div className="mock-bot-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v6m0 8v6M2 12h6m8 0h6" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="mock-ai-content">
                Instant. Responses stream token-by-token over direct WebSockets with near-zero latency.
              </div>
            </div>

            {/* Animated typing dots */}
            <div className="mock-typing-row">
              <div className="typing-pill">
                <span className="dot dot-1" />
                <span className="dot dot-2" />
                <span className="dot dot-3" />
              </div>
            </div>
          </div>
        </div>

        <div className="showcase-footer">
          <span>AI-Powered Real-Time Chat</span>
          <span className="badge-live">
            <span className="live-dot" />
            Active Nodes
          </span>
        </div>
      </aside>
    </div>
  );
}
