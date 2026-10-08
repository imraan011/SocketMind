# SocketMind ⚡

> Real-Time AI Chat Assistant built with **Socket.io + Google Gemini + React + SCSS**

---

## 🚀 Features

- ⚡ **Real-Time Streaming Interaction**: Ultra-low latency communication via Socket.io WebSockets.
- 🎨 **Minimalist Aesthetic Design**: Premium monochrome UI with signature lime `#E8FF3D` accents, Inter typography, and JetBrains Mono code styling.
- 📱 **Mobile-First Responsiveness**: Smooth drawer navigation, backdrop blur overlay, and adaptive font sizing.
- 📝 **Markdown & Code Support**: Full markdown rendering with custom code block containers and 1-click copy functionality.
- 🧩 **Modular Architecture**: Component-driven React structure and organized SCSS design system.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, SCSS, React Markdown, Socket.io Client
- **Backend**: Node.js, Express, Socket.io, Google GenAI SDK (`@google/genai`)

---

## 🏁 Quick Start

### 1. Server Setup
```bash
cd server
npm install
# Ensure .env has your GEMINI_API key
npm start
```

### 2. Client Setup
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` to start chatting!
