import { useState } from 'react'
import Sidebar from './components/Sidebar'
import DashboardView from './components/DashboardView'
import ChatView from './components/ChatView'

export default function App() {
  // dashboard = landing page, chat = chat interface
  const [view, setView] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Dashboard is a full-page standalone landing — no sidebar
  if (view === 'dashboard') {
    return <DashboardView onStartChat={() => setView('chat')} />
  }

  // Chat view uses sidebar layout
  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', position: 'relative' }}>
      <Sidebar
        activeTab="new-chat"
        onSelectTab={(tab) => {
          if (tab === 'dashboard') setView('dashboard')
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden' }}>
        {/* Mobile top navbar */}
        <header className="mobile-navbar">
          <div className="mobile-navbar-brand">
            <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v6m0 8v6M2 12h6m8 0h6" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>SocketMind</span>
          </div>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="mobile-navbar-toggle"
          >
            <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </header>

        <ChatView onGoHome={() => setView('dashboard')} />
      </div>
    </div>
  )
}
