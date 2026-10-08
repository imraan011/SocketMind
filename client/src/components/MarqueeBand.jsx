import BadgeIcon from './BadgeIcon'

/**
 * Reusable infinite-scroll marquee strip.
 * items: Array<{ paths, label, accent?, dark? }>
 * dark: applies dark background variant
 * reverse: scrolls right-to-left instead
 */
export default function MarqueeBand({ items, dark = false, reverse = false }) {
    const trackClass = `marquee-content-track${reverse ? ' marquee-content-track--reverse' : ''}`

    return (
        <div className={`marquee-wrapper${dark ? ' marquee-wrapper--dark' : ''}`}>
            {/* 3 duplicate tracks = gapless loop at any viewport */}
            {[0, 1, 2].map((i) => (
                <div key={i} className={trackClass} aria-hidden={i > 0 ? 'true' : undefined}>
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`marquee-badge${item.accent ? ' marquee-badge--accent' : ''}${item.dark ? ' marquee-badge--dark' : ''}`}
                        >
                            <BadgeIcon paths={item.paths} />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
