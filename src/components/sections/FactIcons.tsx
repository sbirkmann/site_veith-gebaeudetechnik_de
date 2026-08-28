const shared = {
  viewBox: '0 0 48 48',
  fill: 'none',
  'aria-hidden': true as const,
  focusable: false as const,
  className: 'pos__fact-icon',
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.15,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
  vectorEffect: 'non-scaling-stroke' as const,
}

/** Grundriss: Büro / Ausstellung / Lager. */
export function FactIconFloorplan() {
  return (
    <svg {...shared}>
      <g {...stroke} transform="translate(24 24) scale(1.2) translate(-24 -24)">
        <rect x="6" y="14" width="36" height="24" />
        <path d="M18 14v24M30 14v24" />
        <path d="M14 38h2M26 38h2M36 38h2" />
        <path d="M6 10h36M6 8v4M42 8v4" opacity="0.4" strokeWidth={0.8} />
      </g>
    </svg>
  )
}

/** Unter EnEV: Code-Linie vs. tatsächliche Anforderung, Pfeil nach unten. */
export function FactIconEnEV() {
  return (
    <svg {...shared}>
      <g {...stroke} transform="translate(24 24) scale(1.2) translate(-24 -24)">
        <path d="M6 14h36" strokeDasharray="2.2 2" opacity="0.5" />
        <path d="M6 28h27" />
        <path d="M33 14v14" />
        <path d="M29.5 24.5 33 28l3.5-3.5" />
        <path d="M6 14v-3M42 14v-3" opacity="0.4" strokeWidth={0.8} />
        <path d="M6 28v4M33 28v4" opacity="0.4" strokeWidth={0.8} />
      </g>
    </svg>
  )
}

/** Jahresersparnis als kWh-Zählwerk und Heizöltank im Aufriss — kein Tropfen. */
export function FactIconEnergy() {
  return (
    <svg {...shared}>
      <g {...stroke} transform="translate(24 24) scale(1.2) translate(-24 -24)">
        <rect x="6" y="10" width="16" height="20" />
        <path d="M6 14h16" />
        <path d="M9 16h10M9 20h7M9 24h10" opacity="0.55" strokeWidth={0.85} />
        <path d="M22 20h6" />
        <rect x="28" y="12" width="14" height="26" />
        <path d="M28 28h14" />
        <path d="M30 16h10M30 20h10M30 24h10" opacity="0.35" strokeWidth={0.7} />
        <path d="M33 38v4M33 42h4M37 38v4" opacity="0.4" strokeWidth={0.8} />
      </g>
    </svg>
  )
}

/** PV-Array auf dem Dach, wie im Gebäudeschnitt. */
export function FactIconPV() {
  return (
    <svg {...shared}>
      <g {...stroke} transform="translate(24 24) scale(1.2) translate(-24 -24)">
        <path d="M8 26 24 8l16 18" />
        <path d="M12 22.5 24 11l12 11.5" />
        <path d="M16 18.5h16M20 14.2h8" opacity="0.7" strokeWidth={0.85} />
        <path d="M20 11.5v11M28 11.5v11" opacity="0.7" strokeWidth={0.85} />
        <path d="M10 26h28v14H10z" />
        <path d="M10 33h28" opacity="0.4" strokeWidth={0.8} />
      </g>
    </svg>
  )
}

/** Wandquerschnitt: Schale, Schraffur der Dämmung, Bemaßung. */
export function FactIconEnvelope() {
  return (
    <svg {...shared}>
      <g {...stroke} transform="translate(24 24) scale(1.2) translate(-24 -24)">
        <path d="M14 8v32M34 8v32" />
        <path d="M18 8v32M30 8v32" />
        <path d="M18 10l12 12M18 18l12 12M18 26l12 12M18 34l8 8" opacity="0.4" strokeWidth={0.75} />
        <path d="M14 8h4M30 8h4M14 40h4M30 40h4" />
        <path d="M18 4h12M18 2.5v3M30 2.5v3" opacity="0.45" strokeWidth={0.8} />
      </g>
    </svg>
  )
}

const icons = [
  FactIconFloorplan,
  FactIconEnEV,
  FactIconEnergy,
  FactIconPV,
  FactIconEnvelope,
] as const

export function FactIcon({ index }: { index: number }) {
  const Icon = icons[index]
  return Icon ? <Icon /> : null
}
