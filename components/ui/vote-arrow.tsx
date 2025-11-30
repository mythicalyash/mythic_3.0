interface VoteArrowProps {
    direction: "up" | "down"
    className?: string
}

export function VoteArrow({ direction, className = "" }: VoteArrowProps) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ transform: direction === "down" ? "rotate(180deg)" : "none" }}
        >
            <path
                d="M12 4L12 20M12 4L8 8M12 4L16 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
