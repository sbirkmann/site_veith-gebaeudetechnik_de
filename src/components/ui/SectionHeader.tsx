import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import './SectionHeader.scss'

interface SectionHeaderProps {
  /** Small caps label above the heading. Names the section, never repeats it. */
  eyebrow?: string
  title: ReactNode
  /** One or two sentences. Longer than that belongs in the section body. */
  lead?: ReactNode
  /** Heading level — pick by document outline, not by size. */
  as?: 'h1' | 'h2' | 'h3'
  align?: 'start' | 'center'
  /** Colours the rule above the eyebrow, e.g. a trade accent. */
  accent?: string
  id?: string
  className?: string
  children?: ReactNode
}

/**
 * The standard opening of a section: a short rule, an eyebrow, the heading and
 * an optional lead. The rule carries the section's accent — it is the main
 * device that tells one Leistungsbereich from another.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  as: Tag = 'h2',
  align = 'start',
  accent,
  id,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={['sechead', `sechead--${align}`, className].filter(Boolean).join(' ')}
    >
      <span
        className="sechead__rule"
        style={accent ? { backgroundColor: accent } : undefined}
        aria-hidden="true"
      />
      {eyebrow && <p className="sechead__eyebrow">{eyebrow}</p>}
      <Tag className="sechead__title" id={id}>
        {title}
      </Tag>
      {lead && <p className="sechead__lead">{lead}</p>}
      {children}
    </Reveal>
  )
}
