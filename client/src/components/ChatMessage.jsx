import { useState } from "react";
import ReactMd from "react-markdown";

export default function ChatMessage({ message }) {
    const isUser = message.sender === "user";

    if (isUser) {
        return (
            <div className="chat-msg-user">
                <div className="chat-bubble-user">{message.text}</div>
                <span className="chat-time chat-time--user font-mono">
                    {message.time}
                </span>
            </div>
        );
    }

    return (
        <div className="chat-msg-ai">
            <div className="chat-msg-ai-wrapper">
                {/* Bot Icon */}
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

                {/* Message Box */}
                <div className="chat-bubble-ai">
                    <ReactMd>{message.text}</ReactMd>
                    {message.code && (
                        <div className="chat-code-block font-mono">
                            <pre className="code-pre">
                                <code>{message.code}</code>
                            </pre>
                        </div>
                    )}
                </div>
            </div>
            <span className="chat-time chat-time--ai font-mono">
                {message.time}
            </span>
        </div>
    );
}
