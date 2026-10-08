export const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'user',
    text: 'What is Socket.io?',
    time: '10:24 AM',
  },
  {
    id: 2,
    sender: 'ai',
    text: 'Socket.io is an open-source library that enables real-time, bi-directional, event-driven communication between web clients and servers. It builds on WebSockets and provides transparent fallbacks to HTTP long-polling when needed.',
    time: '10:24 AM',
  },
  {
    id: 3,
    sender: 'user',
    text: 'Give me a small example',
    time: '10:25 AM',
  },
  {
    id: 4,
    sender: 'ai',
    text: 'Here is a quick server and client setup for broadcasting messages:',
    code: `const io = require("socket.io")(3000);
io.on("connection", (socket) => {
  socket.on("chat", (data) => io.emit("chat", data));
});`,
    time: '10:25 AM',
  },
]
