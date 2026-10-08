import { useState, useEffect } from 'react'
import { FEATURES } from '../data/dashboardData'

// Interactive animated code demo inside the Features grid
function CodeDemoCard({ heading, desc }) {
    const [typingCode, setTypingCode] = useState('render(chunk);')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const fullText = 'render(chunk);'
        let index = fullText.length
        let isForward = false

        const interval = setInterval(() => {
            if (isForward) {
                index++
                setTypingCode(fullText.slice(0, index))
                if (index === fullText.length) isForward = false
            } else {
                index--
                setTypingCode(fullText.slice(0, index))
                if (index <= 6) isForward = true
            }
        }, 240)

        return () => clearInterval(interval)
    }, [])

    const handleCopy = () => {
        navigator.clipboard.writeText(
            "const io = require('socket.io')(3000);\nio.on('connection', (socket) => {\n  socket.on('token', (chunk) => render(chunk));\n});"
        )
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
    }

    return (
        <div className="feature-card">
            <h3 className="card-heading">{heading}</h3>
            <p className="card-desc" style={{ marginBottom: '12px' }}>{desc}</p>
            <div className="demo-code-box">
                <div className="demo-code-header">
                    <span className="file-tag">socket.ts</span>
                    <button type="button" onClick={handleCopy} className="demo-copy-btn">
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <pre className="demo-code-pre">
                    <span style={{ color: '#888888' }}>// listen to token stream</span><br />
                    {'socket.'}<span style={{ color: '#E8FF3D' }}>on</span>{'(\'ai-message\', (chunk) => {'}<br />
                    {'  '}<span>{typingCode}</span><span className="blinking-cursor" /><br />
                    {'});'}
                </pre>
            </div>
        </div>
    )
}

// Features grid — data-driven, code demo card handles its own state
export default function FeaturesGrid() {
    return (
        <section id="features" className="content-section">
            <div className="section-header">
                <h2 className="section-title">Simple, but powerful.</h2>
            </div>
            <div className="feature-grid">
                {FEATURES.map((f) =>
                    f.isCodeDemo ? (
                        <CodeDemoCard key={f.heading} heading={f.heading} desc={f.desc} />
                    ) : (
                        <div key={f.heading} className="feature-card">
                            <h3 className="card-heading">{f.heading}</h3>
                            <p className="card-desc">{f.desc}</p>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}
