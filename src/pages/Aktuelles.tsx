import { useState } from 'react'
import { useSeo } from '../hooks/useSeo'
import { news, newsKindLabel, type NewsKind } from '../data/news'
import { NewsCard } from '../components/ui/NewsCard'
import { Reveal } from '../components/ui/Reveal'
import { KontaktCta } from '../components/sections/KontaktCta'
import './Aktuelles.scss'

const filters: { id: NewsKind | 'alle'; label: string }[] = [
  { id: 'alle', label: 'Alle' },
  { id: 'seminar', label: newsKindLabel.seminar },
  { id: 'unternehmen', label: newsKindLabel.unternehmen },
  { id: 'presse', label: newsKindLabel.presse },
  { id: 'hinweis', label: newsKindLabel.hinweis },
]

export default function Aktuelles() {
  useSeo({
    title: 'Aktuelles — Vorträge, Presse und Neues aus dem Betrieb',
    description:
      'Informationsabende im VEITH Kompetenzzentrum, Presseberichte und Meldungen aus dem Betrieb. VEITH Gebäudetechnik, Bühl/Baden.',
    path: '/aktuelles',
  })

  const [filter, setFilter] = useState<NewsKind | 'alle'>('alle')
  const shown = filter === 'alle' ? news : news.filter((n) => n.kind === filter)

  return (
    <>
      <header className="akt__hero">
        <div className="container-wide">
          <span className="akt__rule" aria-hidden="true" />
          <p className="akt__eyebrow">Aktuelles</p>
          <h1 className="akt__title">Was bei uns passiert</h1>
          <p className="akt__intro">
            Vorträge im Kompetenzzentrum, Berichte aus der Presse und Meldungen
            aus dem Betrieb.
          </p>

          <div className="akt__filters" role="group" aria-label="Nach Art filtern">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`akt__filter${filter === f.id ? ' is-active' : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="akt__list-section">
        <div className="container-wide">
          {/* Announced so a filter change is not silent for screen readers. */}
          <p className="visually-hidden" role="status" aria-live="polite">
            {shown.length} {shown.length === 1 ? 'Meldung' : 'Meldungen'}
          </p>

          <ul className="akt__list">
            {shown.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={Math.min(i, 4) * 60}>
                <NewsCard item={item} headingLevel={2} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <KontaktCta
        title="Fragen zu einem Thema?"
        lead="Zu allen Vorträgen können Sie sich telefonisch oder per E-Mail anmelden. Auch außerhalb der Termine beraten wir Sie gern."
      />
    </>
  )
}
