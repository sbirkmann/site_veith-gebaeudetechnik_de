/**
 * Service content: brands, funding programmes, seminars.
 *
 * The brand list is exactly the 19 manufacturers shown on
 * /service/unsere-marken/. Funding links and the descriptions of the download
 * material come from /service/foerderungen/. Nothing here claims a partnership
 * level, a certification or a discount that the source does not state.
 */

export interface Brand {
  name: string
  /** The manufacturer's own site, for readers who want product detail. */
  href: string
  /**
   * A short label describing what this manufacturer supplies, written here to
   * help a reader scan the list. The source page shows logos only and makes no
   * statement about partnership level, so none is implied.
   */
  field: string
}

export const brands: Brand[] = [
  { name: 'ABB', href: 'https://new.abb.com/de', field: 'Elektro' },
  { name: 'Berker', href: 'https://www.berker.de/', field: 'Elektro' },
  { name: 'Busch-Jaeger', href: 'https://www.busch-jaeger.de/', field: 'Elektro' },
  { name: 'DEHN', href: 'https://www.dehn.de/', field: 'Blitz- und Überspannungsschutz' },
  { name: 'Fränkische', href: 'https://www.fraenkische.com/', field: 'Rohrsysteme' },
  { name: 'Gira', href: 'https://www.gira.de/', field: 'Gebäudetechnik' },
  { name: 'Hager', href: 'https://hager.com/de', field: 'Energieverteilung' },
  { name: 'Jung', href: 'https://www.jung-group.com/de-DE/', field: 'Schalter und KNX' },
  { name: 'Kaiser', href: 'https://www.kaiser-elektro.de/', field: 'Elektroinstallation' },
  { name: 'Klauke', href: 'https://www.klauke.com/', field: 'Verbindungstechnik' },
  { name: 'Maico', href: 'https://www.maico-ventilatoren.com/', field: 'Lüftung' },
  { name: 'MENNEKES', href: 'https://www.mennekes.de/', field: 'Ladetechnik' },
  { name: 'Merten', href: 'https://www.merten.de/', field: 'Schalterprogramme' },
  { name: 'Miele', href: 'https://www.miele.de/', field: 'Hausgeräte' },
  { name: 'Ritto', href: 'https://www.ritto.de/', field: 'Türkommunikation' },
  { name: 'Stiebel Eltron', href: 'https://www.stiebel-eltron.de/', field: 'Wärmepumpen' },
  { name: 'Striebel & John', href: 'https://www.striebelundjohn.com/', field: 'Verteilerschränke' },
  { name: 'Theben', href: 'https://www.theben.de/', field: 'Zeit- und Lichtsteuerung' },
  { name: 'WAGO', href: 'https://www.wago.com/de/', field: 'Verbindungstechnik' },
]

/** The institutions the existing Förderungen page links to. */
export const fundingLinks = [
  {
    name: 'BAFA',
    full: 'Bundesamt für Wirtschaft und Ausfuhrkontrolle',
    href: 'https://www.bafa.de/',
    what: 'Zuschüsse für Heizungstausch, Effizienzmaßnahmen und Energieberatung.',
  },
  {
    name: 'KfW',
    full: 'Kreditanstalt für Wiederaufbau',
    href: 'https://www.kfw.de/',
    what: 'Kredite und Tilgungszuschüsse für Sanierung und effiziente Neubauten.',
  },
  {
    name: 'L-Bank',
    full: 'Landeskreditbank Baden-Württemberg',
    href: 'https://www.l-bank.de/',
    what: 'Landesprogramme für Baden-Württemberg, unter anderem für Batteriespeicher.',
  },
] as const

/**
 * The two areas the existing page covers, described in the terms it uses.
 * The percentage below is quoted from that page.
 */
export const fundingTopics = [
  {
    id: 'heizung',
    title: 'Heizen mit erneuerbaren Energien',
    claim: 'Bis zu 50 % Zuschuss beim Austausch einer alten Heizung.',
    body: 'Wir rechnen für Ihr Gebäude durch, welche Programme greifen und in welcher Reihenfolge die Anträge gestellt werden müssen — die Reihenfolge entscheidet mit darüber, ob die Förderung am Ende ausgezahlt wird.',
  },
  {
    id: 'photovoltaik',
    title: 'Photovoltaik und Einspeisevergütung',
    claim: 'Aktuelle Vergütungssätze der Bundesnetzagentur.',
    body: 'Die Sätze ändern sich regelmäßig. Wir sagen Ihnen, was für Ihre geplante oder bestehende Anlage gilt — und was zu tun ist, wenn eine Altanlage nach zwanzig Jahren aus der Förderung fällt.',
  },
] as const
