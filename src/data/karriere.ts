/**
 * Open positions and apprenticeships.
 *
 * Tasks, requirements, entry criteria and the application address are
 * transcribed from the postings on the existing site. No salary figures,
 * benefits or team sizes have been added that VEITH does not itself state.
 */

export interface Vacancy {
  slug: string
  title: string
  /** 'stelle' = qualified role, 'ausbildung' = apprenticeship. */
  kind: 'stelle' | 'ausbildung'
  /** Which trade it sits in, for filtering and colour. */
  trade: 'energie' | 'heizung' | 'klima' | 'sanitaer' | 'elektro'
  /** One line naming the work, used in the listing. */
  teaser: string
  /** Only apprenticeships publish a duration. */
  duration?: string
  tasks: string[]
  requirements: string[]
  offer: string[]
}

/** Applications go to this address, per the postings. */
export const applicationEmail = 'job@veith-gt.de'

/** Intro shown above the qualified roles, condensed from the postings. */
export const proIntro =
  'Ob als Profi oder als Berufseinsteiger — bei VEITH steht die Technik bereit, um in einem eingespielten Team ordentliche Arbeit zu machen. Die soll beste Ergebnisse bringen und darf trotzdem Spaß machen.'

/** Intro shown above the apprenticeships. */
export const azubiIntro =
  'Du arbeitest gern mit den Händen und willst wissen, wie Technik wirklich funktioniert? Wir machen dich fit im Umgang mit moderner Technik in einer Branche, die bleibt — und damit hast du beste Chancen auf Übernahme nach der Ausbildung.'

export const vacancies: Vacancy[] = [
  {
    slug: 'elektro-servicetechniker',
    title: 'Elektro-Servicetechniker*in (m/w/d)',
    kind: 'stelle',
    trade: 'elektro',
    teaser: 'Wartung, Fehlersuche und Instandsetzung elektrotechnischer Anlagen beim Kunden vor Ort.',
    tasks: [
      'Wartung, Inspektion und Instandsetzung elektrotechnischer Anlagen',
      'Durchführung von Service- und Reparatureinsätzen bei Kunden vor Ort',
      'Fehlersuche und Störungsbeseitigung an elektrischen Installationen',
      'Prüfung von Anlagen nach geltenden Normen und Vorschriften',
      'Dokumentation der durchgeführten Arbeiten',
      'Beratung von Kunden zu technischen Lösungen und Optimierungen',
    ],
    requirements: [
      'Abgeschlossene Ausbildung als Elektroniker für Energie- und Gebäudetechnik, Elektroinstallateur oder vergleichbare Qualifikation',
      'Idealerweise Erfahrung im Servicebereich im ELT-Handwerk',
      'Selbstständige, strukturierte und kundenorientierte Arbeitsweise',
      'Teamfähigkeit und Verantwortungsbewusstsein',
      'Führerschein Klasse B',
    ],
    offer: ['Einen sicheren Arbeitsplatz in einem zukunftsorientierten Unternehmen'],
  },
  {
    slug: 'elektromonteur',
    title: 'Elektromonteur*in (m/w/d)',
    kind: 'stelle',
    trade: 'elektro',
    teaser: 'Installation und Inbetriebnahme elektrotechnischer Anlagen in der Energie- und Gebäudetechnik.',
    tasks: [
      'Installation, Wartung und Inbetriebnahme von elektrotechnischen Anlagen im Bereich Energie- und Gebäudetechnik',
      'Montage von Kabeltrassen, Leitungen, Schalt- und Verteileranlagen',
      'Anschluss und Prüfung elektrischer Komponenten',
      'Durchführung von Wartungs- und Reparaturarbeiten',
      'Fehlersuche und Störungsbeseitigung an elektrischen Anlagen',
      'Dokumentation der durchgeführten Arbeiten',
    ],
    requirements: [
      'Abgeschlossene Ausbildung als Elektroniker für Energie- und Gebäudetechnik, Elektroinstallateur oder vergleichbare Qualifikation',
      'Berufserfahrung im Bereich ELT-Handwerk von Vorteil',
      'Selbstständige, zuverlässige und strukturierte Arbeitsweise',
      'Teamfähigkeit und handwerkliches Geschick',
      'Führerschein Klasse B wünschenswert',
    ],
    offer: ['Unbefristete Festanstellung in einem zukunftsorientierten Unternehmen'],
  },
  {
    slug: 'servicetechniker-knx',
    title: 'Servicetechniker*in Elektroinstallation / KNX, Sprechanlagen, Netzwerktechnik (m/w/d)',
    kind: 'stelle',
    trade: 'elektro',
    teaser: 'KNX-Systeme planen, programmieren und in Betrieb nehmen — vom Smart Home bis zur Gebäudeautomation.',
    tasks: [
      'Durchführung von Elektroinstallationen in privaten und gewerblichen Gebäuden',
      'Planung, Programmierung und Inbetriebnahme von KNX-Systemen für Smart Homes und Gebäudeautomation',
      'Installation, Wartung und Reparatur von Tür- und Sprechanlagen',
      'Aufbau und Verkabelung von Netzwerksystemen (LAN/WLAN)',
      'Fehlerdiagnose und Störungsbeseitigung bei elektrischen und elektronischen Anlagen',
      'Dokumentation der durchgeführten Arbeiten und Kundenberatung vor Ort',
    ],
    requirements: [
      'Abgeschlossene Berufsausbildung als Elektroniker*in für Energie- und Gebäudetechnik oder eine vergleichbare Qualifikation',
      'Erfahrung in der Installation und Inbetriebnahme von Elektro- und Kommunikationsanlagen',
      'Teamfähigkeit, Eigeninitiative und eine strukturierte Arbeitsweise',
      'Hohe Kunden- und Serviceorientierung',
    ],
    offer: ['Einen sicheren Arbeitsplatz in einem zukunftsorientierten Unternehmen'],
  },
  {
    slug: 'heizungsbauer',
    title: 'Heizungsbauer*in (m/w/d)',
    kind: 'stelle',
    trade: 'heizung',
    teaser: 'Heizungs-, Lüftungs- und Sanitäranlagen installieren, warten und in Betrieb nehmen.',
    tasks: [
      'Installation und Inbetriebnahme von Heizungs-, Lüftungs- und Sanitäranlagen',
      'Wartung und Reparatur bestehender Heizungsanlagen (Gas, Öl, Pellets, Wärmepumpen)',
      'Fehlersuche und Störungsbeseitigung an Heizungssystemen',
      'Verlegen von Rohrleitungen, Anschließen von Heizkörpern, Fußbodenheizungen und Warmwassersystemen',
      'Kundenberatung bei der Auswahl effizienter Heizsysteme',
      'Dokumentation der durchgeführten Arbeiten',
      'Einhaltung der Sicherheits- und Umweltvorschriften',
    ],
    requirements: [
      'Abgeschlossene Ausbildung als Anlagenmechaniker für Sanitär-, Heizungs- und Klimatechnik oder vergleichbare Qualifikation',
      'Berufserfahrung in der Heizungs- und Sanitärtechnik von Vorteil',
      'Kenntnisse in modernen Heiztechnologien',
      'Handwerkliches Geschick',
    ],
    offer: ['Einen sicheren Arbeitsplatz in einem zukunftsorientierten Unternehmen'],
  },
  {
    slug: 'anlagenmechaniker-shk',
    title: 'Anlagenmechaniker*in Sanitär-, Heizungs- und Klimatechnik (m/w/d)',
    kind: 'stelle',
    trade: 'sanitaer',
    teaser: 'Montage und Installation von Heizungsanlagen — von der Pelletheizung bis zur Brennstoffzelle.',
    tasks: [
      'Montage und Installation von Heizungsanlagen (Pelletheizungen, Wärmepumpen, Öl- und Gasheizungen, Brennstoffzellen)',
    ],
    requirements: [
      'Anlagenmechaniker SHK mit abgeschlossener Berufsausbildung',
      'Gute Deutschkenntnisse in Wort und Schrift',
      'Führerschein Klasse B',
    ],
    offer: ['Arbeiten in einem motivierten Team', 'Leistungsgerechte Bezahlung'],
  },
  {
    slug: 'ausbildung-elektroniker-energie-gebaeudetechnik',
    title: 'Elektroniker*in für Energie- und Gebäudetechnik (m/w/d)',
    kind: 'ausbildung',
    trade: 'elektro',
    teaser:
      'Du sagst dem Strom, wo es langgeht — vom Steuersignal in der Kommunikationstechnik bis zum Starkstrom.',
    duration: '3,5 Jahre',
    tasks: [],
    requirements: [
      'Hauptschulabschluss mit Mathematik-Note 3 oder besser, oder Mittlere Reife',
      'Zuverlässigkeit und Pünktlichkeit',
    ],
    offer: [
      'Ein technisch bestens ausgestattetes Ausbildungsumfeld',
      'Ein qualifiziertes und hilfsbereites Team',
      'Viel Freude an der Ausbildung',
    ],
  },
  {
    slug: 'ausbildung-elektroniker-gebaeudesystemintegration',
    title: 'Elektroniker*in für Gebäudesystemintegration (m/w/d)',
    kind: 'ausbildung',
    trade: 'elektro',
    teaser:
      'Lerne die Gewerke am Bau kennen — plane, programmiere und mach deine Baustelle smarter.',
    duration: '3,5 Jahre',
    tasks: [],
    requirements: [
      'Mittlere Reife oder höherer Bildungsabschluss',
      'Zuverlässigkeit und Pünktlichkeit',
    ],
    offer: [
      'Ein technisch bestens ausgestattetes Ausbildungsumfeld',
      'Ein qualifiziertes und hilfsbereites Team',
      'Viel Freude an der Ausbildung',
    ],
  },
  {
    slug: 'ausbildung-anlagenmechaniker-shk',
    title: 'Anlagenmechaniker*in für Sanitär-, Heizungs- und Klimatechnik (m/w/d)',
    kind: 'ausbildung',
    trade: 'sanitaer',
    teaser:
      'Wasser ist dein Element? Du lernst alles, was du zur Installation, Prüfung und Reparatur zuverlässiger Anlagen brauchst.',
    duration: '3,5 Jahre',
    tasks: [],
    requirements: [
      'Hauptschulabschluss mit Mathematik-Note 3 oder besser, oder Mittlere Reife',
      'Zuverlässigkeit und Pünktlichkeit',
    ],
    offer: [
      'Ein technisch bestens ausgestattetes Ausbildungsumfeld',
      'Ein qualifiziertes und hilfsbereites Team',
      'Viel Freude an der Ausbildung',
    ],
  },
  {
    slug: 'ausbildung-mechatroniker-kaeltetechnik',
    title: 'Mechatroniker*in für Kältetechnik (m/w/d)',
    kind: 'ausbildung',
    trade: 'klima',
    teaser:
      'Du lernst, wie Klima- und Kühlanlagen funktionieren — und wie man sie installiert und repariert.',
    duration: '3,5 Jahre',
    tasks: [],
    requirements: [
      'Hauptschulabschluss oder höherer Bildungsabschluss',
      'Zuverlässigkeit und Pünktlichkeit',
    ],
    offer: [
      'Ein technisch bestens ausgestattetes Ausbildungsumfeld',
      'Ein qualifiziertes und hilfsbereites Team',
      'Viel Freude an der Ausbildung',
    ],
  },
]
