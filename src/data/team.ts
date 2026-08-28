/**
 * Ansprechpartner.
 *
 * Names, roles, responsibilities and extension numbers are transcribed exactly
 * from /kontakt/ on the existing site. No e-mail addresses are published here
 * because the existing site does not publish them either — it routes through a
 * form. Contact runs via the central number and the extension shown.
 */

export interface Person {
  name: string
  /** Formal qualification, where the source states one. */
  qualification?: string
  /** The area of responsibility, as written on the source page. */
  role: string
  /** Full number including the extension. */
  phone: string
}

export interface ContactGroup {
  id: string
  label: string
  /** Explains what this group handles, so a visitor picks the right one. */
  hint: string
  /** Extra line where the source page carries one. */
  note?: string
  people: Person[]
}

export const contactGroups: ContactGroup[] = [
  {
    id: 'energie',
    label: 'Energie',
    hint: 'Photovoltaik, Batteriespeicher, Energieberatung, Ladeinfrastruktur.',
    people: [
      {
        name: 'Matthias Dörr',
        role: 'Beratung / Vertrieb Photovoltaik / Batteriespeicher / Energieberatung',
        phone: '07223 80100-10',
      },
      {
        name: 'Daniel Pfetzer',
        qualification: 'Elektrotechnik-Meister',
        role: 'Projektleitung Verteilerbau / E-Mobilität / Ladesäulen',
        phone: '07223 80100-14',
      },
      {
        name: 'Sebastian Hirn',
        role: 'Beratung / Vertrieb Photovoltaik / Batteriespeicher',
        phone: '07223 80100-195',
      },
      {
        name: 'Jonas Ludwig',
        role: 'Beratung / Vertrieb Photovoltaik / Batteriespeicher',
        phone: '07223 80100-149',
      },
      {
        name: 'Christian Hasel',
        role: 'Objektbetreuung / Projektleitung Photovoltaik',
        phone: '07223 80100-175',
      },
      {
        name: 'Tim Keller',
        role: 'Service / Projektleitung Photovoltaik',
        phone: '07223 80100-174',
      },
      {
        name: 'Matthias Lederer',
        role: 'Objektbetreuung Photovoltaik',
        phone: '07223 80100-157',
      },
      {
        name: 'Susanne Dörr',
        role: 'Photovoltaik-Assistenz',
        phone: '07223 80100-176',
      },
    ],
  },
  {
    id: 'energieberatung',
    label: 'Energieberatung',
    hint: 'Beratung für Wohn- und Nichtwohngebäude.',
    note: 'In Zusammenarbeit mit der VD Gebäudeeffizienz GmbH',
    people: [
      {
        name: 'Christopher Kopp',
        role: 'Energieberater Wohn- und Nichtwohngebäude',
        phone: '07223 80100-187',
      },
      {
        name: 'Tim Köhler',
        role: 'Energieberater Wohn- und Nichtwohngebäude',
        phone: '07223 80100-197',
      },
    ],
  },
  {
    id: 'heizung-klima-sanitaer',
    label: 'Heizung / Klima / Sanitär',
    hint: 'Wärmepumpen, Klimatechnik, Pellet- und Gasheizungen, Sanitär, Kundendienst.',
    people: [
      {
        name: 'Mathias Neurohr',
        qualification: 'Dipl.-Ing. Kältesystemtechnik (BA)',
        role: 'Abteilungsleiter Klima — Klimatechnik',
        phone: '07223 80100-172',
      },
      {
        name: 'Mario Ulrich',
        role: 'Energieberatung / Wärmepumpen / Lüftungsanlagen',
        phone: '07223 80100-10',
      },
      {
        name: 'Daniel Kasper',
        qualification: 'Meister für Sanitär-, Heizungs- und Klimatechnik',
        role: 'Sanitär, Wärmepumpen, Pellet- und Gasheizungen',
        phone: '07223 80100-15',
      },
      {
        name: 'Belma Yildiz',
        role: 'Kundendienst-Disponentin Heizung und Sanitär',
        phone: '07223 80100-189',
      },
      {
        name: 'Agnes Marks',
        role: 'Projektmanagement / Controlling Heizung und Sanitär',
        phone: '07223 80100-183',
      },
      {
        name: 'Regina Veit',
        role: 'Rechnungswesen Heizung und Sanitär',
        phone: '07223 80100-178',
      },
    ],
  },
  {
    id: 'elektro',
    label: 'Elektro',
    hint: 'Elektroinstallation, Objektbetreuung und Projektleitung.',
    people: [
      {
        name: 'Mario Karcher',
        qualification: 'Elektrotechnik-Meister',
        role: 'Abteilungsleiter Elektro — Objektbetreuung / Projektleitung',
        phone: '07223 80100-179',
      },
      {
        name: 'Hermann Seiter',
        qualification: 'Elektrotechnik-Meister',
        role: 'Objektbetreuung / Projektleitung',
        phone: '07223 80100-180',
      },
      {
        name: 'Peter Lauppe',
        qualification: 'Elektrotechnik-Meister',
        role: 'Objektbetreuung / Projektleitung',
        phone: '07223 80100-182',
      },
      {
        name: 'Jakob Kraut',
        qualification: 'Elektrotechnik-Meister',
        role: 'Objektbetreuung / Projektleitung',
        phone: '07223 80100-166',
      },
      {
        name: 'Martin Richter',
        qualification: 'Betriebswirt',
        role: 'Projektleitung',
        phone: '07223 80100-165',
      },
    ],
  },
  {
    id: 'verwaltung',
    label: 'Empfang und Verwaltung',
    hint: 'Erste Anlaufstelle, Personal, Buchhaltung, Geschäftsleitung.',
    people: [
      {
        name: 'Evelin Autenrieth',
        role: 'Empfang / Assistenz',
        phone: '07223 80100-10',
      },
      { name: 'Julius Diekmann', role: 'Lager / Einkauf', phone: '07223 80100-196' },
      {
        name: 'Stefanie Fischer',
        role: 'Personalmanagement / Buchhaltung',
        phone: '07223 80100-173',
      },
      {
        name: 'Carina Ehinger',
        role: 'Assistenz der Geschäftsleitung',
        phone: '07223 80100-185',
      },
      {
        name: 'Judith Müller-Veith',
        role: 'Projektbearbeitung / Marketing / Werbung',
        phone: '07223 80100-162',
      },
      {
        name: 'Alfred Veith',
        qualification: 'Elektrotechnik-Meister',
        role: 'Geschäftsführung',
        phone: '07223 80100-10',
      },
    ],
  },
]

/** Turns a printed number into a dialable tel: value. */
export function telHref(display: string) {
  const digits = display.replace(/[^\d]/g, '')
  return `+49${digits.replace(/^0/, '')}`
}
