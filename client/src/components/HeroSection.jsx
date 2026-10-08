// Hero section — pill badge, headline, subtitle, CTAs
export default function HeroSection({ onStartChat }) {
    return (
        <section className="hero-section">
            <div className="hero-badge-pill">
                <span className="pill-dot" />
                <span>NEXT-GEN REAL-TIME AI</span>
            </div>
            <h1 className="hero-title">
                Ask anything. Get answers in{' '}
                <span className="highlight-marker">real time</span>.
            </h1>
            <p className="hero-subtitle">
                Lightning-fast AI chat powered by Socket.io WebSockets and Google Gemini.
                Zero waiting, instant streaming responses.
            </p>
            <div className="hero-actions">
                <button type="button" onClick={onStartChat} className="btn-glow">
                    <span>Start Chatting</span>
                    <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </button>
                <a href="#features" className="btn-secondary">Explore Features</a>
            </div>
        </section>
    )
}
