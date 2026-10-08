// Marquee badge data — SVG icons stay here, no inline JSX scattered in components

export const MARQUEE_ROW_1 = [
    {
        paths: [{ tag: 'polygon', attrs: { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' } }],
        label: 'Real-time WebSockets',
        accent: true,
    },
    {
        paths: [{ tag: 'path', attrs: { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' } }],
        label: 'Google Gemini AI',
        accent: false,
    },
    {
        paths: [
            { tag: 'circle', attrs: { cx: '12', cy: '12', r: '10' } },
            { tag: 'polyline', attrs: { points: '12 6 12 12 16 14' } },
        ],
        label: '<10ms Latency',
        accent: true,
    },
    {
        paths: [
            { tag: 'path', attrs: { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' } },
            { tag: 'polyline', attrs: { points: '14 2 14 8 20 8' } },
            { tag: 'line', attrs: { x1: '16', y1: '13', x2: '8', y2: '13' } },
            { tag: 'line', attrs: { x1: '16', y1: '17', x2: '8', y2: '17' } },
        ],
        label: 'Markdown & Code Blocks',
        accent: false,
    },
    {
        paths: [
            { tag: 'rect', attrs: { x: '2', y: '3', width: '20', height: '14', rx: '2', ry: '2' } },
            { tag: 'line', attrs: { x1: '8', y1: '21', x2: '16', y2: '21' } },
            { tag: 'line', attrs: { x1: '12', y1: '17', x2: '12', y2: '21' } },
        ],
        label: 'React 19 Frontend',
        accent: false,
    },
    {
        paths: [{ tag: 'path', attrs: { d: 'M12 2a10 10 0 0 0-7.55 16.55L4.1 20.9a1 1 0 0 0 1 1l2.35-.35A10 10 0 1 0 12 2z' } }],
        label: 'Multi-Turn Memory',
        accent: true,
    },
    {
        paths: [
            { tag: 'rect', attrs: { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' } },
            { tag: 'path', attrs: { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' } },
        ],
        label: '1-Click Code Copy',
        accent: false,
    },
]

export const MARQUEE_ROW_2 = [
    {
        paths: [{ tag: 'polygon', attrs: { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' } }],
        label: 'Socket.io Streaming',
        dark: true,
    },
    {
        paths: [{ tag: 'path', attrs: { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' } }],
        label: 'Gemini 2.5 Flash',
        dark: false,
    },
    {
        paths: [
            { tag: 'circle', attrs: { cx: '12', cy: '12', r: '10' } },
            { tag: 'polyline', attrs: { points: '12 6 12 12 16 14' } },
        ],
        label: 'Sub-second Latency',
        dark: true,
    },
    {
        paths: [
            { tag: 'rect', attrs: { x: '5', y: '2', width: '14', height: '20', rx: '2', ry: '2' } },
            { tag: 'line', attrs: { x1: '12', y1: '18', x2: '12.01', y2: '18' } },
        ],
        label: 'Mobile-First Design',
        dark: false,
    },
    {
        paths: [
            { tag: 'polyline', attrs: { points: '16 18 22 12 16 6' } },
            { tag: 'polyline', attrs: { points: '8 6 2 12 8 18' } },
        ],
        label: 'Syntax Highlighting',
        dark: true,
    },
    {
        paths: [
            { tag: 'rect', attrs: { x: '3', y: '11', width: '18', height: '11', rx: '2', ry: '2' } },
            { tag: 'path', attrs: { d: 'M7 11V7a5 5 0 0 1 10 0v4' } },
        ],
        label: 'Bi-directional TCP',
        dark: false,
    },
    {
        paths: [{ tag: 'path', attrs: { d: 'M12 2a10 10 0 0 0-7.55 16.55L4.1 20.9a1 1 0 0 0 1 1l2.35-.35A10 10 0 1 0 12 2z' } }],
        label: 'Conversation Memory',
        dark: true,
    },
]

export const HOW_IT_WORKS_STEPS = [
    {
        num: '01',
        label: 'Type your message',
        desc: 'Ask any coding query, technical prompt, or general question.',
        iconPaths: [{ tag: 'path', attrs: { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' } }],
    },
    {
        num: '02',
        label: 'AI replies instantly',
        desc: 'Gemini streams answers over persistent bi-directional WebSocket channels.',
        iconPaths: [{ tag: 'polygon', attrs: { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' } }],
    },
    {
        num: '03',
        label: 'Copy & build',
        desc: 'One-click copy for clean syntax-highlighted code snippets.',
        iconPaths: [
            { tag: 'rect', attrs: { height: '14', rx: '2', ry: '2', width: '14', x: '8', y: '8' } },
            { tag: 'path', attrs: { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' } },
        ],
    },
]

export const FEATURES = [
    { heading: 'Live real-time replies', desc: 'Instant responses streamed with low-latency WebSockets directly from Gemini.' },
    { heading: 'Formatted code with copy button', desc: 'Clean dark code blocks with 1-click clipboard copy.', isCodeDemo: true },
    { heading: 'Full Markdown parsing', desc: 'Rich formatting for bullet lists, bold text, headings, inline code, and tables.' },
    { heading: 'Remembers the conversation', desc: 'Maintains multi-turn conversational context throughout your active chat session.' },
]
