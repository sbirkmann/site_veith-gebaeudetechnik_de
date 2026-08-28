import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Button.scss'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface Common {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
  /** Trailing glyph. Arrows animate on hover; omit for non-navigational actions. */
  arrow?: boolean
}

type Props =
  | (Common & { to: string; href?: never; onClick?: never; type?: never })
  | (Common & { href: string; to?: never; onClick?: never; type?: never })
  | (Common & {
      onClick?: () => void
      type?: 'button' | 'submit'
      to?: never
      href?: never
    })

/**
 * The one call-to-action element.
 *
 * Renders a Link for in-app routes, an anchor for external or tel:/mailto:
 * targets, and a real button when it performs an action rather than navigating
 * — so keyboard behaviour and semantics are right in each case.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  children,
  className,
  ...rest
}: Props) {
  const cls = ['btn', `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && (
        <svg className="btn__arrow" viewBox="0 0 20 12" aria-hidden="true" focusable="false">
          <path
            d="M0 6h17.5M12.5 1l5 5-5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.15"
            vectorEffect="nonScalingStroke"
          />
        </svg>
      )}
    </>
  )

  if ('to' in rest && rest.to) {
    return (
      <Link className={cls} to={rest.to}>
        {inner}
      </Link>
    )
  }

  if ('href' in rest && rest.href) {
    const external = /^https?:/.test(rest.href)
    return (
      <a
        className={cls}
        href={rest.href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
        {external && <span className="visually-hidden"> (öffnet in neuem Tab)</span>}
      </a>
    )
  }

  const { onClick, type = 'button' } = rest as { onClick?: () => void; type?: 'button' | 'submit' }
  return (
    <button className={cls} type={type} onClick={onClick}>
      {inner}
    </button>
  )
}
