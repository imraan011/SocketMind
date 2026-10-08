// Landing page sticky navbar
export default function LandingNavbar({ onStartChat }) {
    return (
        <header className="landing-navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <svg className="navbar-brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v6m0 8v6M2 12h6m8 0h6" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="navbar-brand-name">SocketMind</span>
                </div>
                <div className="navbar-actions">
                    <a href="#how-it-works" className="navbar-link">How it works</a>
                    <a href="#features" className="navbar-link">Features</a>
                    <button type="button" onClick={onStartChat} className="nav-chat-btn">
                        Start Chat
                    </button>
                </div>
            </div>
        </header>
    )
}
