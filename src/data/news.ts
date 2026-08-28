/**
 * Aktuelles.
 *
 * Each entry is a real post from the existing site, condensed but not altered:
 * dates, times, addresses, names and registration details are transcribed
 * exactly. Nothing here is invented — no attendance figures, no outcomes that
 * were not reported.
 */

export type NewsKind = 'seminar' | 'unternehmen' | 'presse' | 'hinweis'

export interface NewsItem {
  slug: string
  date: string // ISO, as published
  kind: NewsKind
  title: string
  /** The teaser used in listings and on the homepage. */
  excerpt: string
  body: string[]
  /** Only set where the source post carries date/time/place for an event. */
  event?: { when: string; where?: string; registration?: string }
  image?: { src: string; alt: string }
  /** Where the source post pointed off-site. */
  source?: { label: string; href?: string }
}

export const newsKindLabel: Record<NewsKind, string> = {
  seminar: 'Seminar',
  unternehmen: 'Unternehmen',
  presse: 'Presse',
  hinweis: 'Hinweis',
}

export const news: NewsItem[] = [
  {
    slug: 'vortrag-einspeiseverguetung-2026',
    date: '2026-03-03',
    kind: 'seminar',
    title:
      'Das Ende der Photovoltaik-Einspeisevergütung nach 20 Jahren — wie geht es weiter?',
    excerpt:
      'Nach großem Interesse laden wir erneut zum Thema ein: Was mit einer ausgeförderten, aber intakten Anlage möglich ist.',
    body: [
      'An unserem Informationsabend erfahren Sie, welche Möglichkeiten Ihnen nach dem Ende der gesetzlichen Einspeisevergütung offenstehen und wie Sie den von Ihrer Anlage erzeugten Strom künftig selbst nutzen können. Wir stellen Ihnen intelligente Konzepte, verschiedene Optionen sowie individuelle Systemlösungen vor.',
      'Ob technischer Umbau, Erweiterung durch Speichersysteme, Nutzung für Elektromobilität, Raumkühlung oder Wärmeversorgung bis hin zu einer möglichen Eigenversorgung bei Stromausfall — die Möglichkeiten sind vielfältig und individuell. Moderne Technologien eröffnen dabei zahlreiche neue Perspektiven.',
    ],
    event: {
      when: 'Mittwoch, 18. März 2026, 18:00 Uhr',
      where: 'Bußmatten 15, 77815 Bühl',
    },
    image: {
      src: 'montage-photovoltaik-dach',
      alt: 'Photovoltaikmontage auf einem Ziegeldach',
    },
  },
  {
    slug: 'faschingsferien-2026',
    date: '2026-02-04',
    kind: 'hinweis',
    title: 'Faschingsferien vom 13. bis einschließlich 17. Februar',
    excerpt:
      'Der Betrieb ist über die Faschingstage geschlossen. Ein Notdienst bleibt durchgehend erreichbar.',
    body: [
      'Sehr geehrte Kundinnen und Kunden, unser Betrieb ist aufgrund der Faschingstage von Freitag, 13. Februar 2026, bis einschließlich Dienstag, 17. Februar 2026 geschlossen. Ab Mittwoch, 18. Februar 2026, sind wir wieder wie gewohnt für Sie da.',
      'Ein Notdienst steht Ihnen weiterhin zur Verfügung. Diesen erreichen Sie unter 07223 / 80 100 10. Am Ende der Bandansage können Sie den gewünschten Notdienst auswählen — Elektro oder Heizung / Sanitär.',
      'Vielen Dank für Ihr Verständnis. Ihr Team der Veith Gebäudetechnik GmbH.',
    ],
  },
  {
    slug: 'einfuehrungstag-2025',
    date: '2025-09-02',
    kind: 'unternehmen',
    title: 'Einführungstag 2025',
    excerpt:
      'Der jährliche Einführungstag für neue Auszubildende und Mitarbeitende — in diesem Jahr wieder auf dem Mehliskopf.',
    body: [
      'Am 29.08.2025 war es wieder so weit: Unser alljährlicher Einführungstag für die neuen Auszubildenden und Mitarbeitenden fand statt — in diesem Jahr wieder auf dem Mehliskopf.',
      'Bei bestem Wetter und in lockerer Atmosphäre nutzten wir die Gelegenheit, unsere neuen Kolleginnen und Kollegen willkommen zu heißen und uns abseits des Arbeitsalltags besser kennenzulernen. Ob beim gemeinsamen Bogenschießen oder beim Klettern im Hochseilgarten — Teamgeist, Mut und jede Menge Spaß standen im Mittelpunkt.',
      'Wir freuen uns sehr, dass ihr jetzt Teil unseres Teams seid, und wünschen euch einen erfolgreichen Start sowie eine spannende und lehrreiche Zeit bei uns.',
    ],
    image: {
      src: 'team-gruppenbild',
      alt: 'Das Team von VEITH Gebäudetechnik vor dem Kompetenzzentrum',
    },
  },
  {
    slug: 'tag-der-offenen-tuer-2025',
    date: '2025-06-01',
    kind: 'unternehmen',
    title: 'Tag der offenen Tür am 25. Mai — ein voller Erfolg',
    excerpt:
      'Unter dem Motto „Neue Energie für Ihre Zukunft!“ informierten unsere Fachleute an Info-Points zu allen fünf Bereichen.',
    body: [
      'Am Sonntag, 25. Mai 2025, fand unser Tag der offenen Tür statt — ganz unter dem Motto „Neue Energie für Ihre Zukunft!“.',
      'An unseren Info-Points rund um die Themen Elektro, Klima, Heizung, Photovoltaik und Energieberatung informierten unsere Fachleute über aktuelle Lösungen, Fördermöglichkeiten und Innovationen in der Gebäudetechnik.',
      'Ein besonderes Highlight war der Fachvortrag „Die Zukunft der Photovoltaik“, der auf großes Interesse stieß. Hier erfuhren die Gäste, wie sich Solarstrom heute lohnt und welche Schritte für eine eigene Anlage notwendig sind. Auch für das leibliche Wohl war bestens gesorgt — und die Kinder hatten ihren Spaß auf der Hüpfburg.',
    ],
    image: {
      src: 'seminar-vortrag',
      alt: 'Fachvortrag im VEITH Kompetenzzentrum',
    },
  },
  {
    slug: 'fuenf-jahre-klimatechnik',
    date: '2025-04-10',
    kind: 'unternehmen',
    title: 'Über 5 Jahre Kompetenz in Klimatechnik',
    excerpt:
      'Seit dem 1. April 2020 arbeitet ein eigenes Spezialistenteam für Klimatechnik im Haus.',
    body: [
      'Wir freuen uns sehr, dass wir seit dem 01. April 2020 ein erfahrenes Team von Spezialisten für Klimatechnik bei uns im Haus haben. Mittlerweile blicken wir auf über 5 erfolgreiche Jahre zurück.',
      'Ein großes Dankeschön an unser Klimatechnik-Team für das Engagement und die hervorragende Arbeit.',
    ],
    image: {
      src: 'klima-serverraum',
      alt: 'Klimatisierter Serverraum mit Rackreihen',
    },
  },
  {
    slug: 'swr-waermepumpen',
    date: '2025-01-30',
    kind: 'presse',
    title: 'SWR-Beitrag „Wärmepumpen — Heiztechnik der Zukunft?“',
    excerpt:
      'Unser Experte Mario Ulrich war im 45-minütigen SWR-Beitrag zur Rolle der Wärmepumpe im Interview.',
    body: [
      'Am 28. Januar wurde beim SWR ein aufschlussreicher 45-minütiger Beitrag mit dem Titel „Wärmepumpen — Heiztechnik der Zukunft?“ ausgestrahlt. Darin wurde die Rolle von Wärmepumpen in der modernen Heiztechnik beleuchtet.',
      'In Zeiten des Klimawandels und steigender Energiekosten sind effiziente und nachhaltige Heizlösungen gefragter denn je. Der Beitrag erklärt die Funktionsweise von Wärmepumpen und zeigt auf, wie sie nicht nur umweltfreundlicher sind, sondern auch langfristig Kosten sparen können.',
      'Unser Experte Mario Ulrich hat im Interview seine Erfahrungen und das Know-how geteilt, die er in der Planung und Installation von Wärmepumpensystemen gesammelt hat.',
    ],
    source: { label: 'SWR' },
    image: {
      src: 'energiezentrale-beratung',
      alt: 'Beratung an der Energiezentrale im Heizungsraum',
    },
  },
  {
    slug: 'mitarbeiterehrungen-35-jahre',
    date: '2024-06-04',
    kind: 'unternehmen',
    title: 'Ehrungen zum 35-jährigen Betriebsjubiläum',
    excerpt:
      'Fünf Mitarbeiter wurden für jeweils über 20 Jahre Betriebszugehörigkeit ausgezeichnet.',
    body: [
      'Anlässlich des 35-jährigen Betriebsjubiläums bedankte sich Alfred Veith am Freitag, den 24. Mai, bei allen Mitarbeitern für ihre langjährige Treue und ihren Einsatz für das Unternehmen. Er lobte ihre Fachkenntnisse, ihre Zuverlässigkeit und ihre positive Ausstrahlung, die maßgeblich zum Erfolg des Unternehmens beitragen.',
      'Ehrenurkunden erhielten Peter Lauppe für über 33 Jahre, Jutta Hemmler für über 27 Jahre, Daniel Pfetzer für über 22 Jahre, Daniel Bader für über 21 Jahre und Mario Seiter für über 20 Jahre Betriebszugehörigkeit.',
    ],
  },
  {
    slug: 'bwp-expertenrunde',
    date: '2023-11-20',
    kind: 'presse',
    title: 'BWP-Expertenrunde mit Mario Ulrich',
    excerpt:
      'Beim 21. Forum Wärmepumpe in Berlin sprach unser Wärmepumpenexperte über Planung und rechtliche Rahmenbedingungen.',
    body: [
      'Am 8. und 9. November fand das 21. Forum Wärmepumpe in Berlin statt — ein wichtiger Termin für die deutschsprachige Wärmepumpenbranche: große und kleine Hersteller, Fachhandwerkerinnen und Fachhandwerker, Wissenschaft und Politik. An zwei Tagen wurden die drängendsten Fragen der Branche diskutiert.',
      'Unser Wärmepumpenexperte Mario Ulrich war als Akteur vor Ort. In der Expertenrunde wurde über die Planung der Wärmepumpen und rechtliche Rahmenbedingungen gesprochen. Rund 160 Teilnehmer konnten im Saal und online den Ausführungen folgen.',
    ],
    source: { label: 'Bundesverband Wärmepumpe' },
  },
  {
    slug: 'innungspreise-gesellen',
    date: '2023-11-07',
    kind: 'unternehmen',
    title: 'Innungspreise für unsere frisch ausgelernten Gesellen',
    excerpt:
      'Bei der Freisprechungsfeier am 6. November erhielten beide Gesellen einen Innungspreis.',
    body: [
      'Am 06.11.2023 war die Freisprechungsfeier unserer jungen Gesellen. Beide haben bei der Feier einen Innungspreis erhalten.',
      'Herzlichen Glückwunsch, Mario und Paul.',
    ],
    image: {
      src: 'montage-detail',
      alt: 'Montagearbeiten an einer Anlage',
    },
  },
  {
    slug: 'bnn-waermepumpen-altbau',
    date: '2023-06-19',
    kind: 'presse',
    title: 'Beitrag in den BNN über Wärmepumpen im Altbau',
    excerpt:
      'Die BNN-Wirtschaftsredaktion begleitete Mario Ulrich einen Tag lang von der Beratung bis zur laufenden Anlage.',
    body: [
      'Am 25. Mai bekamen wir Besuch von der BNN-Wirtschaftsredaktion. Es ging um das Thema Wärmepumpe im Altbau. Frau Becker begleitete Mario Ulrich einen Tag lang.',
      'Nach einem Beratungsgespräch mit Neukunden ging es zu vier Familien, deren Wärmepumpenanlage gerade im Bau war oder schon einige Zeit in Betrieb ist. So wurde sichtbar, welche Schritte von der Planung bis zur Inbetriebnahme notwendig sind, um ein gut funktionierendes System zu realisieren.',
    ],
    source: { label: 'Badische Neueste Nachrichten' },
  },
]

/**
 * Past seminars, as listed on the existing /service/unsere-seminare/ page.
 * Kept as titles only — the page presents them as a record of topics covered.
 */
export const pastSeminars = [
  'Heizungstausch jetzt – oder lieber noch warten?',
  'Ende der Photovoltaik-Einspeisevergütung nach 20 Jahren – was ist zu tun?',
  'Photovoltaik mit Batteriespeicher und Photovoltaik-Altanlagen',
  'Aktuelle staatliche Förderung Energieberatung',
  'Wärmepumpe und das neue Heizungsgesetz',
  'Das erste Solar-Wasserstoff-System für zu Hause (HPS)',
  'Heizen mit Wärmepumpe – die clevere Alternative',
  'Brennstoffzelle – die Zukunft im Keller',
  'E-Mobilität / Wallbox',
] as const
