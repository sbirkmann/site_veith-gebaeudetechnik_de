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
  id?: string
  className?: string
  children?: ReactNode
}

/**
 * Section opening: eyebrow, heading, optional lead. Colour lives in the
 * eyebrow, not in a decorative bar.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  as: Tag = 'h2',
  align = 'start',
  id,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={['sechead', `sechead--${align}`, className].filter(Boolean).join(' ')}
    >
      {eyebrow && <p className="sechead__eyebrow">{eyebrow}</p>}
      <Tag className="sechead__title" id={id}>
        {title}
      </Tag>
      {lead && <p className="sechead__lead">{lead}</p>}
      {children}
    </Reveal>
  )
}
