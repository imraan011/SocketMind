// Final CTA banner + footer
export default function LandingFooter({ onStartChat }) {
    return (
        <>
            <section className="final-cta-section">
                <div className="final-cta-card">
                    <h2 className="final-cta-title">
                        Ready to start{' '}
                        <span className="highlight-marker-static">chatting</span>?
                    </h2>
                    <button type="button" onClick={onStartChat} className="btn-pulse-glow">
                        Start New Chat
                    </button>
                </div>
            </section>

            <footer className="app-footer">
                <p className="app-footer-text font-mono">Built with Socket.io + Gemini</p>
            </footer>
        </>
    )
}
