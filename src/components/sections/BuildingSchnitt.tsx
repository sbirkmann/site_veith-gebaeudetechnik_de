import { Link } from 'react-router-dom'
import { company } from '../../data/company'
import { trades } from '../../data/leistungen'
import './BuildingSchnitt.scss'

const depth = {
  energie: 'Dach',
  heizung: 'Technikraum',
  klima: 'Räume',
  sanitaer: 'Schacht',
  elektro: 'überall',
} as const

/**
 * Line drawing of a building section: the five trades as depth, not a second
 * menu. Names and routes come from the Leistungsdaten.
 */
export function BuildingSchnitt() {
  return (
    <figure className="schnitt">
      <p className="schnitt__stamp">
        <span>Schnitt A–A</span>
        <span>
          {company.founded} · {company.address.city}
        </span>
      </p>

      <svg
        className="schnitt__svg"
        viewBox="0 0 280 430"
        role="img"
        aria-labelledby="schnitt-title schnitt-desc"
      >
        <title id="schnitt-title">Gebäudeschnitt der fünf Gewerke</title>
        <desc id="schnitt-desc">
          Energie auf dem Dach, Heizung im Technikraum, Klima in den Räumen,
          Sanitär im Schacht, Elektro über alle Geschosse.
        </desc>

        <defs>
          <pattern id="schnitt-pv" width="12" height="8" patternUnits="userSpaceOnUse">
            <rect width="11" height="7" fill="none" stroke="currentColor" strokeWidth="0.55" />
          </pattern>
          <pattern
            id="schnitt-hatch"
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="5" stroke="currentColor" strokeWidth="0.45" opacity="0.4" />
          </pattern>
        </defs>

        <line className="schnitt__ink" x1="8" y1="368" x2="272" y2="368" />
        <rect x="8" y="368" width="264" height="14" fill="url(#schnitt-hatch)" />

        <polygon
          className="schnitt__ink"
          fill="var(--c-white)"
          points="48,148 140,28 232,148 232,368 48,368"
        />

        <rect x="48" y="148" width="184" height="70" fill="var(--c-blue-wash)" opacity="0.35" />
        <rect x="48" y="218" width="184" height="70" fill="var(--c-blue-wash)" opacity="0.18" />

        <g>
          <polygon fill="url(#schnitt-pv)" points="62,138 140,40 218,138 198,138 140,62 82,138" />
          <polygon className="schnitt__ink" fill="none" points="48,148 140,28 232,148" />
          <line className="schnitt__mute" x1="88" y1="108" x2="192" y2="108" />
        </g>

        <line className="schnitt__ink" x1="48" y1="218" x2="232" y2="218" />
        <line className="schnitt__ink" x1="48" y1="288" x2="232" y2="288" />

        <g className="schnitt__mute">
          <rect fill="none" x="62" y="162" width="18" height="22" />
          <rect fill="none" x="92" y="162" width="18" height="22" />
          <rect fill="none" x="122" y="162" width="18" height="22" />
          <rect fill="none" x="62" y="232" width="18" height="22" />
          <rect fill="none" x="92" y="232" width="18" height="22" />
          <rect fill="none" x="62" y="312" width="22" height="36" />
        </g>

        <g>
          <rect className="schnitt__unit" x="64" y="172" width="28" height="8" />
          <rect className="schnitt__unit" x="124" y="172" width="28" height="8" />
        </g>

        <g>
          <rect className="schnitt__unit schnitt__unit--plant" x="64" y="242" width="36" height="32" />
          <line className="schnitt__mute" x1="64" y1="250" x2="100" y2="250" />
          <line className="schnitt__mute" x1="64" y1="258" x2="100" y2="258" />
          <line className="schnitt__mute" x1="64" y1="278" x2="164" y2="278" />
          <line className="schnitt__mute" x1="64" y1="282" x2="164" y2="282" />
        </g>

        <rect className="schnitt__unit schnitt__unit--plant" x="16" y="314" width="26" height="42" />
        <line className="schnitt__mute" x1="42" y1="336" x2="48" y2="336" />
        <line className="schnitt__mute" x1="22" y1="322" x2="36" y2="322" />
        <line className="schnitt__mute" x1="22" y1="330" x2="36" y2="330" />

        <g>
          <rect
            x="176"
            y="156"
            width="48"
            height="212"
            fill="color-mix(in srgb, var(--c-blue-wash) 80%, transparent)"
          />
          <rect className="schnitt__ink" fill="none" x="176" y="156" width="48" height="212" />
          <line className="schnitt__pipe" x1="188" y1="164" x2="188" y2="360" />
          <line className="schnitt__pipe" x1="200" y1="164" x2="200" y2="360" />
          <line className="schnitt__pipe" x1="212" y1="164" x2="212" y2="360" />
        </g>

        <g>
          <line className="schnitt__riser" x1="78" y1="148" x2="78" y2="360" />
          <rect className="schnitt__node" x="75" y="181" width="6" height="6" />
          <rect className="schnitt__node" x="75" y="247" width="6" height="6" />
          <rect className="schnitt__node" x="75" y="323" width="6" height="6" />
        </g>

        <g>
          <line className="schnitt__mute" x1="148" y1="288" x2="148" y2="368" />
          <line className="schnitt__mute" x1="148" y1="308" x2="162" y2="288" />
          <line className="schnitt__mute" x1="148" y1="328" x2="162" y2="308" />
          <line className="schnitt__mute" x1="148" y1="348" x2="162" y2="328" />
        </g>

        <line className="schnitt__dim" x1="32" y1="28" x2="32" y2="368" />
        <line className="schnitt__dim" x1="27" y1="28" x2="37" y2="28" />
        <line className="schnitt__dim" x1="27" y1="368" x2="37" y2="368" />

        <g className="schnitt__call">
          <text x="140" y="58" textAnchor="middle">
            01
          </text>
          <text x="82" y="264">02</text>
          <text x="128" y="186">03</text>
          <text x="188" y="150">04</text>
          <text x="84" y="340">05</text>
        </g>
      </svg>

      <ol className="schnitt__legend">
        {trades.map((t, i) => (
          <li key={t.id}>
            <Link to={`/leistungen/${t.slug}`}>
              <span className="schnitt__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="schnitt__name">{t.name}</span>
              <span className="schnitt__depth">{depth[t.id]}</span>
            </Link>
          </li>
        ))}
      </ol>
    </figure>
  )
}
