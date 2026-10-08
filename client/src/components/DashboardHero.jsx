export default function DashboardHero({ onStartChat, onViewHistory }) {
  return (
    <section className="dashboard-container">
      {/* Category mono label */}
      <p className="dashboard-badge font-mono">
        AI CHAT ASSISTANT
      </p>

      {/* Main Headline */}
      <h1 className="dashboard-title">
        Ask anything. Get answers in <span className="highlight-marker">real time</span>.
      </h1>

      {/* Subtitle */}
      <p className="dashboard-subtitle">
        A simple real-time AI chat. Start a conversation below.
      </p>

      {/* Action Buttons */}
      <div className="dashboard-actions">
        <button
          type="button"
          className="btn-primary"
          onClick={onStartChat}
        >
          Start New Chat
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={onViewHistory}
        >
          View History
        </button>
      </div>
    </section>
  )
}
