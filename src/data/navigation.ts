/**
 * Site navigation.
 *
 * The old site put five trades, five service topics, "Ihr Veith", Karriere and
 * Aktuell all on one level. This regroups them by the question a visitor is
 * actually asking — what can you build for me, what do I get help with, who are
 * you — while keeping every page that existed reachable.
 */

import { trades } from './leistungen'

export interface NavLink {
  label: string
  to: string
  /** Shown under the label in the mega menu. */
  hint?: string
}

export interface NavGroup {
  label: string
  to?: string
  /** Rendered as a mega-menu panel when present. */
  columns?: { title?: string; links: NavLink[] }[]
  links?: NavLink[]
}

export const primaryNav: NavGroup[] = [
  {
    label: 'Leistungen',
    to: '/leistungen',
    columns: [
      {
        title: 'Die fünf Gewerke',
        links: trades.map((t) => ({
          label: t.name,
          to: `/leistungen/${t.slug}`,
          hint: t.summary,
        })),
      },
      {
        title: 'Für wen wir planen',
        links: [
          {
            label: 'Privatkunden',
            to: '/leistungen#privat',
            hint: 'Komfort, Zuverlässigkeit und Zukunftssicherheit fürs eigene Haus',
          },
          {
            label: 'Gewerbe',
            to: '/leistungen#gewerbe',
            hint: 'Effizienter Betrieb von Gebäuden und Einrichtungen',
          },
          {
            label: 'Architekten und Planer',
            to: '/leistungen#planer',
            hint: 'Technikplanung als organischer Bestandteil des Gebäudes',
          },
        ],
      },
    ],
  },
  {
    label: 'Service',
    to: '/service',
    columns: [
      {
        links: [
          {
            label: 'Kundendienst',
            to: '/service/kundendienst',
            hint: 'Schnelle Hilfe bei Störungen — während unserer Geschäftszeiten',
          },
          {
            label: 'Förderungen',
            to: '/service/foerderungen',
            hint: 'Aktuelle Programme und Unterlagen im Überblick',
          },
          {
            label: 'Seminare',
            to: '/service/seminare',
            hint: 'Kostenlose Informationsabende im Kompetenzzentrum',
          },
        ],
      },
      {
        links: [
          {
            label: 'Lebensräume',
            to: '/service/lebensraeume',
            hint: 'Der Showroom für smarte Gebäudetechnik',
          },
          {
            label: 'Unsere Marken',
            to: '/service/marken',
            hint: 'Die Hersteller, mit denen wir arbeiten',
          },
        ],
      },
    ],
  },
  {
    label: 'Unternehmen',
    to: '/unternehmen',
    links: [
      { label: 'Ihr VEITH', to: '/unternehmen', hint: 'Haltung, Geschichte, Kompetenzzentrum' },
      { label: 'Referenzen', to: '/referenzen', hint: 'Presseberichte aus der Praxis' },
    ],
  },
  {
    label: 'Karriere',
    to: '/karriere',
    links: [
      { label: 'Arbeiten bei VEITH', to: '/karriere#stellen', hint: 'Offene Stellen für Profis' },
      { label: 'Ausbildung', to: '/karriere#ausbildung', hint: 'Starten, wo Technik entsteht' },
    ],
  },
  { label: 'Aktuelles', to: '/aktuelles' },
  { label: 'Kontakt', to: '/kontakt' },
]

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Leistungen',
    links: trades.map((t) => ({ label: t.name, to: `/leistungen/${t.slug}` })),
  },
  {
    title: 'Service',
    links: [
      { label: 'Kundendienst', to: '/service/kundendienst' },
      { label: 'Förderungen', to: '/service/foerderungen' },
      { label: 'Seminare', to: '/service/seminare' },
      { label: 'Lebensräume', to: '/service/lebensraeume' },
      { label: 'Unsere Marken', to: '/service/marken' },
    ],
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Ihr VEITH', to: '/unternehmen' },
      { label: 'Referenzen', to: '/referenzen' },
      { label: 'Aktuelles', to: '/aktuelles' },
      { label: 'Karriere', to: '/karriere' },
      { label: 'Kontakt', to: '/kontakt' },
    ],
  },
]

export const legalNav: NavLink[] = [
  { label: 'Impressum', to: '/impressum' },
  { label: 'Datenschutz', to: '/datenschutz' },
]
