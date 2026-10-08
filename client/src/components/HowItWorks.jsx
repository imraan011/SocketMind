import BadgeIcon from './BadgeIcon'
import { HOW_IT_WORKS_STEPS } from '../data/dashboardData'

// "Three steps. That's it." section
export default function HowItWorks() {
    return (
        <section id="how-it-works" className="content-section">
            <div className="section-header">
                <h2 className="section-title">
                    Three steps.{' '}
                    <span className="highlight-marker-static">That's it</span>.
                </h2>
            </div>
            <div className="step-grid">
                {HOW_IT_WORKS_STEPS.map((step) => (
                    <div key={step.num} className="step-card">
                        <div>
                            <div className="card-top">
                                <span className="card-step-num">{step.num}</span>
                                <BadgeIcon paths={step.iconPaths} className="card-icon" />
                            </div>
                            <h3 className="card-heading">{step.label}</h3>
                            <p className="card-desc">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
