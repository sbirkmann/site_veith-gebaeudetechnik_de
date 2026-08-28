import type { ReactNode, ElementType } from 'react'
import { useReveal } from '../../hooks/useReveal'
import './Reveal.scss'

interface RevealProps {
  children: ReactNode
  /** Stagger within a group, in ms. Keep under ~200 so nothing feels slow. */
  delay?: number
  as?: ElementType
  className?: string
  /** Anchor target, when the revealed element is also a link destination. */
  id?: string
}

/**
 * Fades and lifts its children into place once, on first scroll into view.
 * Does nothing at all when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
  id,
}: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <Tag
      ref={ref}
      id={id}
      className={['reveal', shown && 'is-shown', className].filter(Boolean).join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
