/**
 * JSON-LD for schema.org. Every property is a published fact from company.ts,
 * leistungen.ts, news.ts or karriere.ts. No ratings, prices, coordinates or
 * service areas beyond Bühl/Baden.
 */

import { company } from '../data/company'
import { applicationEmail, vacancies, type Vacancy } from '../data/karriere'
import { trades, type Trade } from '../data/leistungen'
import { news, type NewsItem } from '../data/news'

export const SITE_ORIGIN = 'https://www.veith-gebaeudetechnik.de'
export const LOGO_URL = `${SITE_ORIGIN}/logo.svg`
export const ORG_ID = `${SITE_ORIGIN}/#organization`
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`

export type JsonLd = Record<string, unknown>

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  return SITE_ORIGIN + (path.startsWith('/') ? path : `/${path}`)
}

export function imageUrl(slug: string, width = 1280): string {
  return `${SITE_ORIGIN}/img/${slug}-${width}.webp`
}

function graph(nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

export function organizationNode(): JsonLd {
  return {
    '@type': ['HVACBusiness', 'LocalBusiness'],
    '@id': ORG_ID,
    name: company.legalName,
    legalName: company.legalName,
    alternateName: 'VEITH Gebäudetechnik',
    url: `${SITE_ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      contentUrl: LOGO_URL,
    },
    image: LOGO_URL,
    telephone: company.phone.href,
    faxNumber: '+4972238010019',
    email: company.email,
    foundingDate: String(company.founded),
    address: postalAddress(),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '12:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '13:00',
        closes: '17:00',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: company.phone.href,
        email: company.email,
        contactType: 'customer service',
        availableLanguage: ['German'],
        hoursAvailable: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '12:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '13:00',
            closes: '17:00',
          },
        ],
      },
    ],
    sameAs: company.social.map((s) => s.href),
  }
}

function postalAddress(): JsonLd {
  return {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    postalCode: company.address.postalCode,
    addressLocality: company.address.city,
    addressCountry: company.address.country,
  }
}

function orgRef(): JsonLd {
  return { '@id': ORG_ID }
}

export function websiteNode(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: 'VEITH Gebäudetechnik',
    inLanguage: 'de-DE',
    publisher: orgRef(),
  }
}

export function breadcrumbList(
  path: string,
  crumbs: { name: string; path: string }[],
): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

function webPageBase(opts: {
  path: string
  name: string
  description: string
  type?: string | string[]
  image?: string
}): JsonLd {
  const url = absoluteUrl(opts.path)
  const node: JsonLd = {
    '@type': opts.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: 'de-DE',
    isPartOf: { '@id': WEBSITE_ID },
    about: orgRef(),
    publisher: orgRef(),
  }
  if (opts.image) {
    node.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: imageUrl(opts.image),
      contentUrl: imageUrl(opts.image),
    }
  }
  return node
}

const homeCrumbs = [{ name: 'Startseite', path: '/' }]

export function homeJsonLd(): JsonLd {
  return graph([
    organizationNode(),
    websiteNode(),
    webPageBase({
      path: '/',
      name: 'VEITH Gebäudetechnik — Energie, Heizung, Klima, Sanitär und Elektro in Bühl',
      description:
        'Gebäudetechnik aus einer Hand in Bühl/Baden: Photovoltaik und Speicher, Wärmepumpe, Klimatechnik, Sanitär und Elektro. Beratung, Installation und Kundendienst seit 1989.',
      image: 'montage-photovoltaik-dach',
    }),
    breadcrumbList('/', homeCrumbs),
  ])
}

export function webPageJsonLd(opts: {
  path: string
  name: string
  description: string
  crumbs: { name: string; path: string }[]
  type?: string | string[]
  image?: string
  extra?: JsonLd[]
}): JsonLd {
  return graph([
    organizationNode(),
    websiteNode(),
    webPageBase(opts),
    breadcrumbList(opts.path, opts.crumbs),
    ...(opts.extra ?? []),
  ])
}

export function leistungJsonLd(trade: Trade): JsonLd {
  const path = `/leistungen/${trade.slug}`
  const service: JsonLd = {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: trade.name,
    serviceType: trade.name,
    description: trade.intro,
    provider: orgRef(),
    url: absoluteUrl(path),
    areaServed: {
      '@type': 'City',
      name: company.address.city,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${trade.name} — Leistungen`,
      itemListElement: trade.scope.map((name, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name,
          provider: orgRef(),
        },
      })),
    },
  }
  if (trade.hero.src) {
    service.image = {
      '@type': 'ImageObject',
      url: imageUrl(trade.hero.src),
      contentUrl: imageUrl(trade.hero.src),
      caption: trade.hero.alt,
    }
  }
  return webPageJsonLd({
    path,
    name: trade.meta.title,
    description: trade.meta.description,
    image: trade.hero.src,
    crumbs: [
      { name: 'Startseite', path: '/' },
      { name: 'Leistungen', path: '/leistungen' },
      { name: trade.name, path },
    ],
    extra: [service],
  })
}

const MONTHS: Record<string, string> = {
  januar: '01',
  februar: '02',
  märz: '03',
  maerz: '03',
  april: '04',
  mai: '05',
  juni: '06',
  juli: '07',
  august: '08',
  september: '09',
  oktober: '10',
  november: '11',
  dezember: '12',
}

/** Converts a published German date/time string to ISO-8601 when the pattern is unambiguous. */
export function isoFromGermanWhen(when: string): string | undefined {
  const m = when.match(
    /(\d{1,2})\.\s+([A-Za-zÄäÖöÜüß]+)\s+(\d{4})(?:,\s*(\d{1,2}):(\d{2}))?/,
  )
  if (!m) return undefined
  const month = MONTHS[m[2].toLowerCase()]
  if (!month) return undefined
  const day = m[1].padStart(2, '0')
  const date = `${m[3]}-${month}-${day}`
  if (m[4] && m[5]) {
    return `${date}T${m[4].padStart(2, '0')}:${m[5]}:00`
  }
  return date
}

function articleNode(item: NewsItem): JsonLd {
  const url = absoluteUrl(`/aktuelles/${item.slug}`)
  const node: JsonLd = {
    '@type': item.kind === 'presse' ? 'NewsArticle' : 'Article',
    '@id': `${url}#article`,
    headline: item.title,
    description: item.excerpt,
    datePublished: item.date,
    dateModified: item.date,
    inLanguage: 'de-DE',
    mainEntityOfPage: url,
    url,
    author: orgRef(),
    publisher: orgRef(),
  }
  if (item.image) {
    node.image = {
      '@type': 'ImageObject',
      url: imageUrl(item.image.src),
      contentUrl: imageUrl(item.image.src),
      caption: item.image.alt,
    }
  }
  return node
}

function eventNode(item: NewsItem): JsonLd | undefined {
  if (!item.event) return undefined
  const startDate = isoFromGermanWhen(item.event.when)
  const url = absoluteUrl(`/aktuelles/${item.slug}`)
  const node: JsonLd = {
    '@type': 'Event',
    '@id': `${url}#event`,
    name: item.title,
    description: item.excerpt,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    organizer: orgRef(),
    url,
  }
  if (startDate) {
    node.startDate = startDate
    const day = startDate.slice(0, 10)
    const today = new Date().toISOString().slice(0, 10)
    node.eventStatus =
      day < today
        ? 'https://schema.org/EventCompleted'
        : 'https://schema.org/EventScheduled'
  }
  if (item.event.where) {
    node.location = {
      '@type': 'Place',
      name: 'VEITH Kompetenzzentrum',
      address: postalAddress(),
    }
  }
  return node
}

export function newsEventJsonLd(item: NewsItem): JsonLd | undefined {
  return eventNode(item)
}

export function newsDetailJsonLd(item: NewsItem): JsonLd {
  const path = `/aktuelles/${item.slug}`
  const extra: JsonLd[] = [articleNode(item)]
  const event = eventNode(item)
  if (event) extra.push(event)
  return webPageJsonLd({
    path,
    name: item.title,
    description: item.excerpt,
    image: item.image?.src,
    type: 'WebPage',
    crumbs: [
      { name: 'Startseite', path: '/' },
      { name: 'Aktuelles', path: '/aktuelles' },
      { name: item.title, path },
    ],
    extra,
  })
}

export function aktuellesJsonLd(): JsonLd {
  const path = '/aktuelles'
  const itemList: JsonLd = {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#list`,
    itemListElement: news.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/aktuelles/${item.slug}`),
      name: item.title,
    })),
  }
  return webPageJsonLd({
    path,
    name: 'Aktuelles — Vorträge, Presse und Neues aus dem Betrieb',
    description:
      'Informationsabende im VEITH Kompetenzzentrum, Presseberichte und Meldungen aus dem Betrieb. VEITH Gebäudetechnik, Bühl/Baden.',
    image: 'seminar-vortrag',
    type: 'CollectionPage',
    crumbs: [
      { name: 'Startseite', path: '/' },
      { name: 'Aktuelles', path },
    ],
    extra: [itemList],
  })
}

function jobPosting(v: Vacancy): JsonLd {
  const url = `${absoluteUrl('/karriere')}#${v.slug}`
  const parts = [v.teaser]
  if (v.tasks.length) parts.push('Aufgaben: ' + v.tasks.join(' '))
  if (v.requirements.length) {
    parts.push(
      (v.kind === 'ausbildung' ? 'Voraussetzungen: ' : 'Anforderungen: ') +
        v.requirements.join(' '),
    )
  }
  if (v.offer.length) parts.push('Wir bieten: ' + v.offer.join(' '))
  if (v.duration) parts.push('Dauer: ' + v.duration)
  const node: JsonLd = {
    '@type': 'JobPosting',
    '@id': `${url}#job`,
    title: v.title,
    description: parts.join('\n\n'),
    identifier: v.slug,
    url,
    hiringOrganization: orgRef(),
    jobLocation: {
      '@type': 'Place',
      address: postalAddress(),
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'DE',
    },
    directApply: false,
    applicationContact: {
      '@type': 'ContactPoint',
      email: applicationEmail,
      contactType: 'HR',
    },
  }
  if (v.kind === 'stelle') node.employmentType = 'FULL_TIME'
  if (v.requirements.length) node.educationRequirements = v.requirements.join('; ')
  const trade = trades.find((t) => t.id === v.trade)
  if (trade) node.industry = trade.name
  return node
}

export function karriereJsonLd(): JsonLd {
  const path = '/karriere'
  return webPageJsonLd({
    path,
    name: 'Karriere — Stellen und Ausbildung bei VEITH',
    description:
      'Offene Stellen und Ausbildungsplätze bei VEITH Gebäudetechnik in Bühl: Elektro, Heizung, Sanitär, Klima und Photovoltaik. Bewerbungen an job@veith-gt.de.',
    image: 'team-montage',
    crumbs: [
      { name: 'Startseite', path: '/' },
      { name: 'Karriere', path },
    ],
    extra: vacancies.map(jobPosting),
  })
}

export function leistungenOverviewJsonLd(): JsonLd {
  const path = '/leistungen'
  const catalog: JsonLd = {
    '@type': 'OfferCatalog',
    '@id': `${absoluteUrl(path)}#catalog`,
    name: 'Leistungsbereiche',
    itemListElement: trades.map((t, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: {
        '@type': 'Service',
        name: t.name,
        url: absoluteUrl(`/leistungen/${t.slug}`),
        provider: orgRef(),
      },
    })),
  }
  return webPageJsonLd({
    path,
    name: 'Leistungen — Energie, Heizung, Klima, Sanitär und Elektro',
    description:
      'Alle Leistungen von VEITH Gebäudetechnik im Überblick: Photovoltaik und Speicher, Heizung, Klimatechnik, Sanitär und Elektro — für private und gewerbliche Kunden sowie Planer.',
    image: 'photovoltaik-dach-team',
    crumbs: [
      { name: 'Startseite', path: '/' },
      { name: 'Leistungen', path },
    ],
    extra: [catalog],
  })
}
