// Reusable badge icon — renders SVG paths from a descriptor array
export default function BadgeIcon({ paths }) {
    return (
        <svg
            className="badge-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {paths.map((p, i) => {
                const Tag = p.tag
                return <Tag key={i} {...p.attrs} />
            })}
        </svg>
    )
}
