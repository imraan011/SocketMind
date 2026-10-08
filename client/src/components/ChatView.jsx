import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { INITIAL_MESSAGES } from "../data/mockMessages";

export default function ChatView() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const messagesEndRef = useRef(null);

    // auto scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // user message submit handler
    const handleSend = () => {
        if (!inputValue.trim()) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        const userMsg = {
            id: Date.now(),
            sender: "user",
            text: inputValue.trim(),
            time: timeStr,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // simulated typing & response
        setTimeout(() => {
            setIsTyping(false);
            const aiReply = {
                id: Date.now() + 1,
                sender: "ai",
                text: "Received your prompt in real time. Processing...",
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => [...prev, aiReply]);
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <main className="chat-view">
            {/* Header */}
            <header className="chat-header">
                <h1 className="chat-header-title">New Chat</h1>
            </header>

            {/* Centered Thread Column */}
            <div className="chat-container">
                {/* Message Stream */}
                <section className="chat-stream">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="typing-indicator">
                            <div className="bot-avatar">
                                <svg
                                    className="bot-avatar-icon"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
                                </svg>
                            </div>
                            <div className="typing-bubble">
                                <span className="typing-dot typing-dot-1" />
                                <span className="typing-dot typing-dot-2" />
                                <span className="typing-dot typing-dot-3" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </section>

                {/* Input Container */}
                <footer className="chat-footer">
                    <div className="chat-input-bar">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="chat-input-field"
                        />
                        <button
                            type="button"
                            aria-label="Send message"
                            onClick={handleSend}
                            className="send-btn"
                        >
                            <svg
                                style={{ width: "16px", height: "16px" }}
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 19V5" />
                                <path d="m5 12 7-7 7 7" />
                            </svg>
                        </button>
                    </div>
                    <p className="chat-hint font-mono">
                        Enter to send, Shift+Enter for new line
                    </p>
                </footer>
            </div>
        </main>
    );
}
