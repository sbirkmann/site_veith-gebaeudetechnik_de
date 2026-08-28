import type { ReactNode } from 'react'
import { Image } from './Image'
import './PageHero.scss'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  image?: { src: string; alt: string; position?: string }
  crumbs?: ReactNode
  children?: ReactNode
}

/**
 * Page opening. Photograph as a plate beside type — never under it — so faces
 * stay readable and the page does not look like a text-on-stock overlay.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs,
  children,
}: PageHeroProps) {
  const copy = (
    <>
      {crumbs && <div className="pghero__crumbs">{crumbs}</div>}
      <p className="pghero__eyebrow">{eyebrow}</p>
      <h1 className="pghero__title">{title}</h1>
      {lead && (
        <div className="pghero__lead">
          {typeof lead === 'string' ? <p>{lead}</p> : lead}
        </div>
      )}
      {children && <div className="pghero__extra">{children}</div>}
    </>
  )

  if (!image) {
    return (
      <header className="pghero">
        <div className="pghero__inner container-wide">{copy}</div>
      </header>
    )
  }

  return (
    <header className="pghero pghero--photo">
      <div className="pghero__folio">
        <div className="pghero__copy">
          <div className="pghero__copy-inner">{copy}</div>
        </div>
        <div className="pghero__media">
          <Image
            src={image.src}
            alt={image.alt}
            priority
            fill
            sizes="(min-width: 62rem) 62vw, 100vw"
            position={image.position}
          />
        </div>
      </div>
    </header>
  )
}
