export default function RecentChats({ chats = [], onSelectChat }) {
  return (
    <section className="recent-chats">
      <h2 className="recent-chats-heading">
        Recent Chats
      </h2>

      {/* Bordered Card */}
      <div className="recent-chats-card">
        {chats.map((chat, index) => (
          <div key={chat.id}>
            {index > 0 && <div className="recent-chat-divider" />}
            <div
              onClick={() => onSelectChat && onSelectChat(chat)}
              className="recent-chat-row"
            >
              <span className="recent-chat-title">
                {chat.title}
              </span>
              <span className="recent-chat-time font-mono">
                {chat.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State / Prompt text */}
      <p className="recent-chats-empty">
        No chats yet. Start your first one.
      </p>
    </section>
  )
}
