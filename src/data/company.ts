/**
 * Company facts.
 *
 * Every value here is transcribed from the existing veith-gebaeudetechnik.de.
 * Nothing in this file may be invented, rounded or "improved" — the address,
 * phone numbers, opening hours, register entries and the figures describing the
 * Kompetenzzentrum all appear on the live site exactly as written here.
 */

export const company = {
  legalName: 'Veith Gebäudetechnik GmbH',
  shortName: 'VEITH',
  founded: 1989,

  address: {
    street: 'Bußmatten 15',
    postalCode: '77815',
    city: 'Bühl/Baden',
    country: 'DE',
  },

  /** Display strings alongside the tel: / mailto: forms used in links. */
  phone: { display: '07223 80 100 10', href: '+4972238010010' },
  fax: { display: '07223 80 100 19' },
  email: 'info@veith-gt.de',

  /** As published on /kontakt/. Appointments outside these hours by arrangement. */
  openingHours: [
    { days: 'Montag – Freitag', time: '8:00 – 12:00 Uhr' },
    { days: 'Montag – Donnerstag', time: '13:00 – 17:00 Uhr' },
  ],
  appointmentNote: 'Termine nach Vereinbarung',

  managingDirector: 'Alfred Veith',
  register: { court: 'Mannheim', number: 'HRB 708604' },
  vatId: 'DE 406777617',

  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/veithgebaeudetechnik' },
    { label: 'Instagram', href: 'https://www.instagram.com/veith_gebaeudetechnik/' },
    { label: 'YouTube', href: 'https://www.youtube.com/@veithgebaeudetechnik' },
  ],
} as const

/**
 * The company's own building, described on /der-veith/. The numbers are quoted
 * from that page and must stay exactly as they are.
 */
export const kompetenzzentrum = {
  location: 'Gewerbegebiet Bußmatten, Bühl',
  facts: [
    {
      value: 'über 1.000 m²',
      label: 'Büro-, Ausstellungs- und Lagerfläche',
    },
    {
      value: '25 %',
      label: 'unter den Vorgaben der gültigen Energieeinsparverordnung',
    },
    {
      value: '33.840 kWh',
      label: 'Energieeinsparung pro Jahr — das entspricht 3.400 Litern Heizöl',
    },
    {
      value: 'über 120 kWp',
      label: 'Solarstromleistung auf dem Dach',
    },
    {
      value: 'ca. 200 mm',
      label: 'umlaufende Dämmung der Gebäudehülle',
    },
  ],
  features: [
    'Die Beheizung erfolgt umweltschonend mit einer Sole/Wasser-Wärmepumpe und Ökostrom.',
    'Der Carport für die Firmenfahrzeuge produziert ebenfalls umweltschonenden Solarstrom.',
    'In der Fassade übernehmen farbige, ins Glas integrierte Solarmodule die Verschattung und erzeugen zusätzlichen Solarstrom.',
  ],
} as const

/** Credits carried over from the existing Impressum. */
export const imageCredits = [
  'Veith Gebäudetechnik',
  'Joerg Bongartz',
  'AdobeStock',
  'ArGe Medien im ZVEH',
  'Panasonic Marketing Europe GmbH',
] as const
