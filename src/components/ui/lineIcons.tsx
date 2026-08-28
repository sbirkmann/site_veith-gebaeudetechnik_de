/** Hairline drawings: same stroke language as the fact icons. */

export const iconStroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.15,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
  vectorEffect: 'non-scaling-stroke' as const,
}

type IconProps = {
  className?: string
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g {...iconStroke} transform="translate(12 12) scale(1.18) translate(-12 -12)">
        <path d="M6.8 4.2h3.4l1.2 3.6-2.2 1.6c.8 1.6 2.2 3 3.8 3.8l1.6-2.2 3.6 1.2v3.4c0 .7-3.4 2.8-10.4-4.2C4.1 7.6 6.1 4.2 6.8 4.2z" />
      </g>
    </svg>
  )
}

export function IconMail({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g {...iconStroke} transform="translate(12 12) scale(1.18) translate(-12 -12)">
        <rect x="3.5" y="6" width="17" height="12" />
        <path d="M3.5 6 12 13.2 20.5 6" />
      </g>
    </svg>
  )
}

export function IconPin({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g {...iconStroke} transform="translate(12 12) scale(1.18) translate(-12 -12)">
        <path d="M12 21.5S5.4 14.2 5.4 9.7C5.4 6.1 8.3 3.4 12 3.4s6.6 2.7 6.6 6.3c0 4.5-6.6 11.8-6.6 11.8z" />
        <circle cx="12" cy="9.7" r="2.15" />
      </g>
    </svg>
  )
}

export function IconPerson({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g {...iconStroke} transform="translate(12 12) scale(1.18) translate(-12 -12)">
        <rect x="9" y="4.2" width="6" height="6" />
        <path d="M6 19.5v-1.6c0-2.5 2.7-4.2 6-4.2s6 1.7 6 4.2v1.6" />
      </g>
    </svg>
  )
}
