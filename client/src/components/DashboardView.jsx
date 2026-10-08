import LandingNavbar from './LandingNavbar'
import HeroSection from './HeroSection'
import MarqueeBand from './MarqueeBand'
import HowItWorks from './HowItWorks'
import FeaturesGrid from './FeaturesGrid'
import ChatPreview from './ChatPreview'
import LandingFooter from './LandingFooter'
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../data/dashboardData'

// DashboardView is a pure layout assembler — no local state lives here
export default function DashboardView({ onStartChat }) {
    return (
        <div className="dashboard-view-wrapper">
            <LandingNavbar onStartChat={onStartChat} />
            <HeroSection onStartChat={onStartChat} />
            <MarqueeBand items={MARQUEE_ROW_1} />
            <HowItWorks />
            <MarqueeBand items={MARQUEE_ROW_2} dark reverse />
            <FeaturesGrid />
            <ChatPreview />
            <LandingFooter onStartChat={onStartChat} />
        </div>
    )
}
