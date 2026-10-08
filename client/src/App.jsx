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

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar navigation */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Conditional View Rendering */}
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
  )
}
