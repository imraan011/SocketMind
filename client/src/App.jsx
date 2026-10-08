import { useState } from 'react'
import Sidebar from './components/Sidebar'
import DashboardHero from './components/DashboardHero'
import RecentChats from './components/RecentChats'
import ChatView from './components/ChatView'
import { INITIAL_RECENT_CHATS } from './data/recentChats'

export default function App() {
  // active view state: 'dashboard' | 'new-chat' | 'history'
  const [activeTab, setActiveTab] = useState('dashboard')
  const [chats] = useState(INITIAL_RECENT_CHATS)
  // mobile sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', position: 'relative' }}>
      {/* Sidebar navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area with Mobile Top Navbar */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden' }}>
        {/* Mobile Top Navbar (Visible only on <768px) */}
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

        {/* View Switcher */}
        {activeTab === 'dashboard' ? (
          <main className="dashboard-view">
            <div className="dashboard-container">
              <DashboardHero
                onStartChat={() => setActiveTab('new-chat')}
                onViewHistory={() => setActiveTab('history')}
              />

              <RecentChats
                chats={chats}
                onSelectChat={() => setActiveTab('new-chat')}
              />

              <footer className="app-footer">
                <p className="app-footer-text font-mono">
                  Built with Socket.io + Gemini
                </p>
              </footer>
            </div>
          </main>
        ) : (
          <ChatView />
        )}
      </div>
    </div>
  )
}
