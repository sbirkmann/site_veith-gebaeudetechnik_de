/**
 * The five Leistungsbereiche.
 *
 * The copy is written fresh, but every service, technology and claim traces
 * back to the corresponding page on the existing site. Nothing has been added
 * that VEITH does not already say it does.
 */

export type TradeId = 'energie' | 'heizung' | 'klima' | 'sanitaer' | 'elektro'

export interface Topic {
  /** Anchor id — also the deep-link target from other trades. */
  id: string
  title: string
  /** One sentence naming the reader's problem, not the technology. */
  lead: string
  body: string[]
  image?: { src: string; alt: string }
}

export interface Trade {
  id: TradeId
  /** Route segment under /leistungen/. */
  slug: string
  name: string
  /** Sits above the H1 — states the domain in three or four words. */
  eyebrow: string
  /** The page's H1. */
  headline: string
  /** The one-line summary used in navigation and on the overview. */
  summary: string
  /** Opening paragraph of the trade page. */
  intro: string
  /** "Veith ist Ihr Ansprechpartner für:" — verbatim scope from the old site. */
  scope: string[]
  topics: Topic[]
  /** Related trades, with the reason the link exists. */
  related: { trade: TradeId; reason: string }[]
  /**
   * How a job typically runs — only steps the existing copy already names
   * (Beratung, Auslegung, Antrag, Inbetriebnahme). Not a invented workflow.
   */
  process: { title: string; steps: { title: string; body: string }[] }
  /**
   * Funding or legal note already stated on the old site or /service/foerderungen.
   */
  aside?: { title: string; body: string; to?: string; toLabel?: string }
  /** Key into contactGroups in team.ts. */
  contactGroupId: 'energie' | 'heizung-klima-sanitaer' | 'elektro'
  hero: { src: string; alt: string; position?: string }
  /** CSS custom property carrying this trade's accent. */
  accent: string
  meta: { title: string; description: string }
}

export const trades: Trade[] = [
  /* ---------------------------------------------------------------- ENERGIE */
  {
    id: 'energie',
    slug: 'energie',
    name: 'Energie',
    eyebrow: 'Erzeugen, speichern, selbst verbrauchen',
    headline: 'Photovoltaik, Speicher, Eigenverbrauch',
    summary:
      'Photovoltaik, Speicher, Ladeinfrastruktur und Energiemanagement als ein System.',
    intro:
      'Photovoltaik, Speicher, Wärmepumpe und Ladepunkt gehören zusammen. Wir planen den Weg des Stroms durch das Gebäude — in Bühl und der Region.',
    scope: [
      'Photovoltaik',
      'Brennstoffzelle / Blockheizkraftwerk (erzeugen auch Wärme)',
      'Energiemanagement',
      'Speichersysteme',
      'Elektromobilität',
    ],
    hero: {
      src: 'montage-photovoltaik-dach',
      alt: 'Zwei Monteure von VEITH befestigen Photovoltaikmodule auf einem Ziegeldach',
      position: '62% 28%',
    },
    accent: 'var(--c-energie)',
    topics: [
      {
        id: 'photovoltaik',
        title: 'Photovoltaik',
        lead: 'Die Fläche muss stimmen, der Ertrag auch — und der Strom soll im Haus bleiben.',
        body: [
          'Die Voraussetzung ist eine nutzbare Fläche. Nach Ihrem Energiebedarf dimensionieren wir die Anlage; je weniger Verschattung durch Gebäudeteile, Topografie und Nachbarbebauung entsteht, desto besser fällt der Ertrag aus. Auch die zu erwartenden Sonnenstunden fließen in die Rechnung ein — die Rheinebene ist dafür ein sehr guter Standort.',
          'Im Vordergrund steht heute, den Strom vom eigenen Dach selbst zu nutzen. Der Verkauf ist in den Hintergrund gerückt; der größte Nutzen entsteht, wenn der Strombezug deutlich sinkt. Mit einer abgestimmten Erzeugungsanlage in Verbindung mit einem Batteriespeicher lässt sich die Stromrechnung um bis zu 80 % reduzieren.',
          'Photovoltaikanlagen werden nach wie vor staatlich gefördert. Für eine Einschätzung Ihrer Fläche vereinbaren Sie einen unverbindlichen Termin mit unseren Fachberatern.',
        ],
        image: {
          src: 'montage-detail',
          alt: 'Monteur bei der Befestigung eines Photovoltaikmoduls auf dem Dach',
        },
      },
      {
        id: 'speicher',
        title: 'Hausenergiesystem mit Speicher',
        lead: 'Der Ertrag kommt mittags, der Verbrauch abends. Ein Speicher schließt diese Lücke.',
        body: [
          'Überschüssiger Photovoltaikstrom wird tagsüber eingelagert und liefert nachts die Energie für den Haushalt. Das ist ein großer Schritt in Richtung Unabhängigkeit und zugleich eine Absicherung gegen steigende Strompreise.',
          'Überschüsse lassen sich darüber hinaus für die Warmwasserbereitung, die Heizung oder das Elektrofahrzeug verwenden. Entscheidend ist das Zusammenspiel: Erzeugung, Speicher und Steuerung müssen als ein System ausgelegt sein. Für Batteriespeicher besteht zudem ein Förderprogramm des Landes Baden-Württemberg.',
        ],
        image: {
          src: 'batteriespeicher-monitoring',
          alt: 'Batteriespeicher im Technikraum, daneben ein Tablet mit der Ertragsauswertung',
        },
      },
      {
        id: 'kwk',
        title: 'Blockheizkraftwerk und Brennstoffzelle',
        lead: 'Wer Strom erzeugt, erzeugt immer auch Wärme. Die Frage ist, ob sie genutzt wird.',
        body: [
          'Nach dem Prinzip der Kraft-Wärme-Kopplung wird die eingesetzte Energie in weit größerem Umfang genutzt, weil die anfallende Wärme nicht verloren geht. Weil die Erzeugung im Gebäude stattfindet, sinken zugleich die Verluste durch den Transport.',
          'Beides wirkt sich positiv auf die CO₂-Bilanz wie auf den Wirkungsgrad aus. Hier fällt Wirtschaftlichkeit mit Umweltnutzen zusammen.',
        ],
        image: {
          src: 'energiezentrale-beratung',
          alt: 'Beratung an der Energiezentrale im Heizungsraum',
        },
      },
      {
        id: 'emobilitaet',
        title: 'Elektromobilität',
        lead: 'Ein Elektroauto ist so sauber wie der Strom, mit dem es geladen wird.',
        body: [
          'Elektromobilität ergibt vor allem dann Sinn, wenn die Fahrzeuge am Standort effizient geladen werden können — idealerweise mit dem selbst produzierten Strom aus regenerativer Erzeugung.',
          'Bei Neubauten sind zudem die Auflagen für E-Mobilität zu berücksichtigen. Wir informieren Sie über den Stand der Technik und darüber, was in den kommenden Jahren auf Sie zukommt.',
        ],
        image: {
          src: 'ladepunkt-elektromobilitaet',
          alt: 'Ladestecker wird an einem Elektrofahrzeug angeschlossen',
        },
      },
    ],
    related: [
      {
        trade: 'heizung',
        reason: 'Wärmepumpe und Solarthermie machen aus eigenem Strom nutzbare Wärme.',
      },
      {
        trade: 'elektro',
        reason: 'Verteilung, Ladepunkte und Messtechnik entstehen im Elektro-Gewerk.',
      },
    ],
    process: {
      title: 'Von der Fläche zur Anlage',
      steps: [
        {
          title: 'Fläche und Bedarf',
          body: 'Nutzbare Fläche, Verschattung, Topografie, Nachbarbebauung und die Sonnenstunden der Rheinebene — danach dimensionieren wir.',
        },
        {
          title: 'Erzeugung, Speicher, Steuerung',
          body: 'Photovoltaik, Batteriespeicher und Energiemanagement als ein System. Überschüsse gehen in Warmwasser, Heizung oder das Fahrzeug.',
        },
        {
          title: 'Förderung und Termin',
          body: 'Photovoltaik wird staatlich gefördert; für Speicher gibt es ein Landesprogramm in Baden-Württemberg. Einschätzung der Fläche im unverbindlichen Termin.',
        },
      ],
    },
    aside: {
      title: 'Förderung',
      body: 'Photovoltaikanlagen werden nach wie vor staatlich gefördert. Für Batteriespeicher besteht ein Förderprogramm des Landes Baden-Württemberg. Sätze und Reihenfolge stehen auf der Förderseite.',
      to: '/service/foerderungen',
      toLabel: 'Förderungen',
    },
    contactGroupId: 'energie',
    meta: {
      title: 'Photovoltaik, Speicher & Energiemanagement in Bühl | VEITH',
      description:
        'Photovoltaik, Batteriespeicher, Blockheizkraftwerk, Energiemanagement und Ladeinfrastruktur — geplant als ein System. VEITH Gebäudetechnik in Bühl/Baden.',
    },
  },

  /* ---------------------------------------------------------------- HEIZUNG */
  {
    id: 'heizung',
    slug: 'heizung',
    name: 'Heizung',
    eyebrow: 'Wärmepumpe, Solarthermie, Biomasse',
    headline: 'Wärmepumpe und Heizungsbau in Bühl',
    summary:
      'Wärmepumpe, Solarthermie, Pellets und Kraft-Wärme-Kopplung — ausgelegt auf das Gebäude.',
    intro:
      'Zuerst das Gebäude — Dämmung, Flächen, Bestand —, dann das Gerät. Auslegung, BAFA-Antrag und Inbetriebnahme in einer Hand.',
    scope: [
      'Wärmepumpe',
      'Solarthermie',
      'Pellets, Hackschnitzel, Stückholz',
      'Brennstoffzelle (erzeugt auch Energie)',
      'Blockheizkraftwerk (erzeugt auch Energie)',
      'Lüftungsanlagen',
      'Klimatechnik',
    ],
    hero: {
      src: 'energiezentrale-beratung',
      alt: 'Beratung an der Energiezentrale im Heizungsraum eines Wohnhauses',
      position: '40% 50%',
    },
    accent: 'var(--c-heizung)',
    topics: [
      {
        id: 'waermepumpe',
        title: 'Wärmepumpe',
        lead: 'Umweltwärme ist da. Die Auslegung entscheidet, ob die Pumpe leise und sparsam läuft.',
        body: [
          'Eine gut ausgelegte Wärmepumpe zeichnet sich durch hohe Energiekosteneinsparung, leisen Betrieb und hohen Komfort aus. Unsere aktuellen Geräte erreichen die Effizienzklasse A+++ und arbeiten flüsterleise — und sie heizen und kühlen mit einem einzigen Gerät.',
          'Der Einbau wird staatlich gefördert. Von der Planung über die Beantragung der BAFA-Zuschüsse bis zur Inbetriebnahme sind wir Ihr Ansprechpartner.',
        ],
        image: {
          src: 'waermepumpe-aussengeraet',
          alt: 'Außeneinheit einer Luft-Wasser-Wärmepumpe neben einem Wohnhaus',
        },
      },
      {
        id: 'solarthermie',
        title: 'Solarthermie',
        lead: 'Wasser, das die Sonne erwärmt hat, heizt und duscht — auch im Winter.',
        body: [
          'Solarthermie ist eine effiziente, ausgereifte und sehr langlebige Technik. Der höchste Wärmeertrag fällt naturgemäß von Mai bis September an. Besonders in warmen Sommern ist die Umwandlung von Sonnenwärme in Kälte attraktiv — eine ausgesprochene Stärke dieser Technik.',
          'Auch in der kalten Jahreszeit bleibt die Anlage aktiv: Die Strahlung ist geringer, dennoch lassen sich bis zu 20 Prozent der Kosten für Heizung und Warmwasser einsparen.',
          'Im Kollektor erwärmt sich das Wasser, wird zum Wärmetauscher im Solarspeicher gepumpt und gelangt abgekühlt zurück. Fehlt Wärme — vor allem im Winter —, stellt die Heizanlage sie bereit. Bestehende Warmwassersysteme lassen sich einbinden; wir stellen Ihnen Produkte vor, die dafür ausgelegt sind.',
        ],
        image: {
          src: 'solarthermie-dach',
          alt: 'Solarthermie-Kollektoren auf einem Wohnhausdach',
        },
      },
      {
        id: 'biomasse',
        title: 'Pellets und Biomasse',
        lead: 'Heizen mit Holz heißt heizen mit einem Rohstoff, der regional nachwächst.',
        body: [
          'Die Verbrennung ist CO₂-neutral. Neben Pellets lassen sich auch Stückholz und Hackgut in modernen Anlagen effizient zur Wärmegewinnung einsetzen.',
          'Für eine effiziente und saubere Nutzung dieser klassischen Brennstoffe ist allerdings ausgezeichnete Technik nötig: Die Verbrennung wird elektronisch geregelt, der Brennraum ist in Form und Material optimiert, die Bedienung bleibt einfach und sicher.',
          'Ob ein Neubau oder eine Umrüstung technisch möglich und wirtschaftlich sinnvoll ist, hängt von mehreren Faktoren ab — die staatliche Förderung ist dabei nicht zu vernachlässigen.',
        ],
        image: {
          src: 'pellets-lager',
          alt: 'Pelletlager und Fördertechnik einer Biomasseheizung',
        },
      },
      {
        id: 'lueftung',
        title: 'Lüftungsanlagen',
        lead: 'Luftwechsel gehört zur Wärmeplanung — nicht als Nachtrag.',
        body: [
          'Lüftungsanlagen stehen im Leistungsumfang der Heizung. Auslegung hängt am Gebäude: Dämmung, Flächen, Bestand. Dieselben Leute, die Wärmepumpe und Pellets planen, nehmen die Lüftung mit.',
        ],
      },
    ],
    related: [
      {
        trade: 'energie',
        reason: 'Eigener Solarstrom senkt die Betriebskosten der Wärmepumpe deutlich.',
      },
      {
        trade: 'klima',
        reason: 'Heizen und Kühlen laufen bei modernen Geräten über dieselbe Anlage.',
      },
    ],
    process: {
      title: 'Zuerst das Gebäude, dann das Gerät',
      steps: [
        {
          title: 'Bestand',
          body: 'Dämmung, Flächen, vorhandene Verteilung. Ohne das sitzt die Pumpe falsch.',
        },
        {
          title: 'Auslegung',
          body: 'Wärmepumpe, Solarthermie oder Biomasse — je nachdem, was das Haus trägt. Aktuelle Wärmepumpen erreichen A+++, heizen und kühlen mit einem Gerät.',
        },
        {
          title: 'Antrag und Inbetriebnahme',
          body: 'Von der Planung über die Beantragung der BAFA-Zuschüsse bis zur Inbetriebnahme: ein Ansprechpartner.',
        },
      ],
    },
    aside: {
      title: 'BAFA und Heizungstausch',
      body: 'Der Einbau wird staatlich gefördert. Beim Austausch einer alten Heizung nennt die Förderseite bis zu 50 % Zuschuss — Sätze ändern sich, die Reihenfolge der Anträge entscheidet mit.',
      to: '/service/foerderungen',
      toLabel: 'Förderungen',
    },
    contactGroupId: 'heizung-klima-sanitaer',
    meta: {
      title: 'Wärmepumpe, Solarthermie & Pelletheizung in Bühl | VEITH',
      description:
        'Heizungsplanung und -installation von der Wärmepumpe über Solarthermie bis zur Pelletheizung — inklusive Förderantrag. VEITH Gebäudetechnik, Bühl/Baden.',
    },
  },

  /* ------------------------------------------------------------------ KLIMA */
  {
    id: 'klima',
    slug: 'klima',
    name: 'Klima',
    eyebrow: 'Temperatur, Luft, Feuchte',
    headline: 'Klimaanlage und Raumklima',
    summary:
      'Klimaanlagen, Kaltwassersysteme, Entfeuchtung und Wärmerückgewinnung für Wohnen, Büro, Werkstatt und Industrie.',
    intro:
      'Einzelne Räume oder das ganze Gebäude: Temperatur, Luft und Feuchte — Wohnen, Büro, Serverraum, Produktion.',
    scope: [
      'Klimaanlagen',
      'Kaltwassersysteme',
      'Entfeuchtung',
      'Wärmerückgewinnung',
      'Service und Wartung',
    ],
    hero: {
      src: 'klima-serverraum',
      alt: 'Klimatisierter Serverraum mit Rackreihen',
      position: '50% 40%',
    },
    accent: 'var(--c-klima)',
    topics: [
      {
        id: 'wohnen',
        title: 'Im Wohnbereich',
        lead: 'Ein Haus hat Räume mit sehr unterschiedlichen Aufgaben — und entsprechend unterschiedlichem Klimabedarf.',
        body: [
          'Die meisten Räume dienen dem täglichen Aufenthalt, dem Arbeiten und dem Genuss; Schlafräume sollen vor allem nachts angenehm temperiert sein.',
          'Eine moderne Anlage leistet gutes Raumklima im Sommer wie im Winter und gleicht saisonale Schwankungen aus — starke Hitze, trockene Heizungsluft, besonders feuchte Phasen.',
        ],
        image: {
          src: 'klima-wohnbereich',
          alt: 'Innengerät einer Klimaanlage in einem Wohnraum',
        },
      },
      {
        id: 'technik',
        title: 'Für technische Anlagen',
        lead: 'Server und Produktionsanlagen verzeihen kein Klima, das aus dem Rahmen läuft.',
        body: [
          'Ob EDV-Arbeitsplätze, Serverräume oder empfindliche industrielle Produktionsanlagen — mit moderner Klimatechnik lassen sich die Anforderungen an einen zuverlässigen, reibungslosen Betrieb dauerhaft einhalten.',
          'Ausfälle und Ausschuss kosten Geld. Die Klimatechnik hält Temperatur und Feuchte im Soll.',
        ],
        image: {
          src: 'klima-aussenanlage',
          alt: 'Außeneinheiten einer Klimaanlage an einem technischen Gebäude',
        },
      },
      {
        id: 'gewerbe',
        title: 'Für Büro- und Ladenräume',
        lead: 'Konzentriertes Arbeiten und entspanntes Einkaufen setzen beide gutes Klima voraus.',
        body: [
          'Produktivität und Umsatz bleiben dauerhaft auf hohem Niveau, wenn Temperatur und Luft stimmen. Auch Geräte und Waren profitieren von einem kontrollierten Raumklima.',
          'Mit modernen Anlagen steuern Sie Temperatur, Luftfeuchtigkeit, Atemluft und Staubgehalt gezielt.',
        ],
        image: {
          src: 'klima-laden',
          alt: 'Klimatisierter Verkaufsraum',
        },
      },
      {
        id: 'wartung',
        title: 'Service und Wartung',
        lead: 'Temperatur und Feuchte bleiben nur im Soll, wenn die Anlage gehalten wird.',
        body: [
          'Service und Wartung gehören zum Leistungsumfang. Ausfälle an Servern und in der Produktion kosten Geld — die Klimatechnik hält Temperatur und Feuchte im Rahmen, den das Gebäude braucht.',
        ],
      },
    ],
    related: [
      {
        trade: 'heizung',
        reason: 'Heizen und Kühlen laufen oft über dieselbe Anlage.',
      },
      {
        trade: 'elektro',
        reason: 'Regelung und Einbindung ins Gebäudemanagement kommen aus der Elektrotechnik.',
      },
    ],
    process: {
      title: 'Raum für Raum, oder das ganze Gebäude',
      steps: [
        {
          title: 'Wohnen',
          body: 'Aufenthalt, Arbeiten, Schlafen: unterschiedliche Klimabedarfe in einem Haus. Die Anlage gleicht Hitze, trockene Heizungsluft und feuchte Phasen aus.',
        },
        {
          title: 'Technik',
          body: 'EDV, Serverräume, empfindliche Produktion: Temperatur und Feuchte dauerhaft im Soll.',
        },
        {
          title: 'Büro und Laden',
          body: 'Temperatur, Luftfeuchtigkeit, Atemluft und Staubgehalt — für Leute, Geräte und Ware.',
        },
      ],
    },
    contactGroupId: 'heizung-klima-sanitaer',
    meta: {
      title: 'Klimatechnik für Wohnen, Büro und Industrie in Bühl | VEITH',
      description:
        'Klimaanlagen, Kaltwassersysteme, Entfeuchtung und Wärmerückgewinnung — für Wohnräume, Büros, Serverräume und Produktion. VEITH Gebäudetechnik, Bühl/Baden.',
    },
  },

  /* ---------------------------------------------------------------- SANITÄR */
  {
    id: 'sanitaer',
    slug: 'sanitaer',
    name: 'Sanitär',
    eyebrow: 'Installation, Bad, Nassbereich',
    headline: 'Sanitär und Bad in Bühl',
    summary:
      'Sanitärinstallation, Badausstattung und barrierefreie Nassbereiche — an Wärme und Gebäudesteuerung angebunden.',
    intro:
      'Ver- und Entsorgung, Bad und Nassbereich. Warmwasser hängt an der Heizung, Steuerung oft am Elektrogewerk.',
    scope: [
      'Sanitärinstallation',
      'Badausstattung',
      'Barrierefreier Nassbereich',
      'Einbindung in Energiekonzept',
      'Einbindung ins Gebäudemanagement',
      'Lösungen für Industrie und Gewerbe',
    ],
    hero: {
      src: 'sanitaerinstallation',
      alt: 'Sanitärinstallation im Rohbau',
      position: '50% 45%',
    },
    accent: 'var(--c-sanitaer)',
    topics: [
      {
        id: 'bad',
        title: 'Badausstattung',
        lead: 'Armaturen, Becken, Wannen, Brauch- und Abwasser — und die Planung, die das zusammenhält.',
        body: [
          'VEITH liefert alles, was Sie an Infrastruktur für Ihre sanitären Räume brauchen: Armaturen, Becken und Wannen, die Installation von Brauch-, Warm- und Abwasser — und die professionelle Planung, die das alles zusammenhält.',
        ],
        image: {
          src: 'bad-ausstattung',
          alt: 'Modern ausgestattetes Badezimmer',
        },
      },
      {
        id: 'installation',
        title: 'Sanitärinstallation',
        lead: 'Leitungen und Steuerung sollen unsichtbar bleiben. Die Anlage muss halten.',
        body: [
          'Sanitär ist Teil der Gebäudetechnik, nicht ihr Anhängsel. Leitungen, Ventile und Steuerung binden wir an Wärme und Elektro an, wenn das Objekt das verlangt.',
          'Von Leitungen und Technik sollen Sie nichts merken, wenn Sie das Bad nutzen. Die Ausführung entscheidet, wie lange die Anlage hält.',
        ],
        image: {
          src: 'bad-detail',
          alt: 'Sanitärausstattung im Detail',
        },
      },
      {
        id: 'barrierefrei',
        title: 'Barrierefreier Nassbereich',
        lead: 'Bewegungsflächen und Bedienung, die später noch funktionieren.',
        body: [
          'Barrierefreie Nassbereiche gehören zum Leistungsumfang. Armaturen und Installation sitzen so, dass der Raum länger nutzbar bleibt. Steuerung und Sensorik kommen aus dem Elektrogewerk, wenn das Bad ans Gebäudemanagement angebunden wird.',
        ],
      },
      {
        id: 'gewerbe',
        title: 'Industrie und Gewerbe',
        lead: 'Ver- und Entsorgung, die zum Betrieb passt — nicht zum Katalogbad.',
        body: [
          'Lösungen für Industrie und Gewerbe stehen im Leistungsumfang. Leitungen, Ventile und die Anbindung an Wärme und Elektro hängen am Objekt.',
        ],
      },
    ],
    related: [
      {
        trade: 'heizung',
        reason: 'Warmwasser ist der Punkt, an dem Sanitär und Wärmeerzeugung zusammenlaufen.',
      },
      {
        trade: 'elektro',
        reason: 'Barrierefreie Bäder und Gebäudemanagement brauchen Steuerung und Sensorik.',
      },
    ],
    process: {
      title: 'Planung, Leitung, Anbindung',
      steps: [
        {
          title: 'Planung',
          body: 'Armaturen, Becken, Wannen, Brauch- und Abwasser — und die Planung, die das zusammenhält.',
        },
        {
          title: 'Installation',
          body: 'Leitungen und Technik sollen unsichtbar bleiben. Die Ausführung entscheidet, wie lange die Anlage hält.',
        },
        {
          title: 'Wärme und Steuerung',
          body: 'Warmwasser hängt an der Heizung. Einbindung ins Energiekonzept und ins Gebäudemanagement, wenn das Objekt das verlangt.',
        },
      ],
    },
    contactGroupId: 'heizung-klima-sanitaer',
    meta: {
      title: 'Sanitärinstallation, Bad & barrierefreie Nassbereiche | VEITH Bühl',
      description:
        'Sanitärinstallation, Badausstattung und barrierefreie Nassbereiche — eingebunden in Energiekonzept und Gebäudemanagement. VEITH Gebäudetechnik, Bühl/Baden.',
    },
  },

  /* ---------------------------------------------------------------- ELEKTRO */
  {
    id: 'elektro',
    slug: 'elektro',
    name: 'Elektro',
    eyebrow: 'Installation, KNX, Licht',
    headline: 'Elektroinstallation und Gebäudemanagement',
    summary:
      'Elektroinstallation, Netzwerke, Sicherheitstechnik, Gebäudemanagement, Beleuchtung und Industrie-Elektronik.',
    intro:
      'Elektro-, Steuer- und Regeltechnik vom Einfamilienhaus bis zum Gewerbebetrieb — in Bühl und der Region.',
    scope: [
      'Elektroinstallation',
      'Netzwerke',
      'Antennen- und Empfangsanlagen',
      'Elektrogeräte',
      'Sicherheitstechnik',
      'Intelligentes Gebäudemanagement',
      'Industrie-Elektrik und -Elektronik',
    ],
    hero: {
      src: 'knx-installation-decke',
      alt: 'KNX-Installation an einer Rohbaudecke',
      position: '50% 35%',
    },
    accent: 'var(--c-elektro)',
    topics: [
      {
        id: 'installation',
        title: 'Elektroinstallation',
        lead: 'Verteilung, Licht und Information — eine der Kernarbeiten im Haus.',
        body: [
          'Gerade hier zahlt sich qualifizierte Planung nachhaltig aus. Wir verfügen nicht nur über langjährige Erfahrung, sondern sind auch mit den Techniken vertraut, die den Markt gerade verändern.',
          'Bei der Haustechnik ist immer Energie im Spiel, die zuverlässig und effizient eingesetzt werden will: von den geringen Mengen, die Information über Funktechnik tragen, bis zu Leitungen mit großem Querschnitt, die Produktionsanlagen gleichmäßig versorgen.',
        ],
        image: {
          src: 'elektroinstallation',
          alt: 'Elektroinstallation in einem Verteilerschrank',
        },
      },
      {
        id: 'komfort',
        title: 'Komfort und Lebensqualität',
        lead: 'Licht, Rollläden, Klima und Alarmanlage lassen sich gemeinsam bedienen — wenn die Installation das hergibt.',
        body: [
          'Temperatur, Klima, Luftfeuchtigkeit und Licht lassen sich heute von jedem Raum aus regeln — ebenso Musik und Klang. Programme steuern die Rollläden, der Morgen beginnt mit Musik.',
          'Die Idee ist ein Lebensumfeld, das sich den Wünschen seiner Bewohner anpasst. Wohl fühlen wir uns allerdings nur in einer Umgebung, die wir leicht steuern können und die in ihrer Funktion transparent bleibt. Genau darauf legen wir die Anlage aus.',
          'Der Datenaustausch läuft über hochwertige Kabel oder Funk und bindet Internet, Telefonie und Alarmanlage ein. Gesteuert wird über fest installierte Einheiten im Raum, über den PC oder das Smartphone.',
        ],
        image: {
          src: 'lebensraeume-komfort',
          alt: 'Wohnbereich im Showroom Lebensräume mit smarter Gebäudetechnik',
        },
      },
      {
        id: 'gebaeudemanagement',
        title: 'Gebäudemanagement',
        lead: 'Einzelne Anlagen werden zur Gebäudeautomation, wenn Verteilung und Sensorik zusammengehören.',
        body: [
          'Informations- und Energietechnik verbindet die Gewerke. Darüber laufen Klima, Sicherheit und Bedienung.',
          'Gebäudemanagement fasst die Funktionen zusammen, die den Betrieb steuern: Einbruch, Brand, Licht, Zutritt, Energiemanagement. Bei Gewerbe und öffentlichen Bauten zählt, was später nachgerüstet werden muss.',
          'Wir sind Ansprechpartner für Bauherren, Architekten und Planer.',
        ],
        image: {
          src: 'netzwerktechnik-gewerbe',
          alt: 'Netzwerktechnik und Verkabelung in einem Technikraum',
        },
      },
      {
        id: 'beleuchtung',
        title: 'Beleuchtung',
        lead: 'Helligkeit und Lichtfarbe hängen von der Tätigkeit ab — im Wohnraum anders als am Arbeitsplatz.',
        body: [
          'Am deutlichsten spüren wir das, wenn bei einer liebgewonnenen Beschäftigung die Augen schmerzen. Je nach Tätigkeit brauchen wir andere Helligkeit und andere Lichtfarbe — und Licht trägt Stimmungen: Es sorgt dafür, dass wir uns zu Hause auch daheim fühlen.',
          'Am Arbeitsplatz bringt Licht mehr als Helligkeit. Eine Raumbeleuchtung funktioniert hinsichtlich Streuung, Lichtstärke und Gleichmaß anders als eine Punktlichtquelle für präzises Arbeiten. Für Ihr Unternehmen zählen Sicherheit, Energieeffizienz und Produktivität — wir sorgen dafür, dass alles zur Geltung kommt.',
        ],
        image: {
          src: 'beleuchtung-wohnraum',
          alt: 'Wohnraumbeleuchtung mit abgestimmten Lichtstimmungen',
        },
      },
      {
        id: 'emobilitaet',
        title: 'E-Mobilität',
        lead: 'Ladepunkte sind ein Elektrogewerk — vom Querschnitt bis zur Lastregelung.',
        body: [
          'Elektromobilität ergibt vor allem dann Sinn, wenn die Fahrzeuge am Standort effizient geladen werden können, idealerweise mit selbst produziertem regenerativem Strom.',
          'Bei Neubauten sind die Auflagen für E-Mobilität zu berücksichtigen. Wir informieren Sie über den Stand der Technik und die Veränderungen der kommenden Jahre.',
        ],
        image: {
          src: 'ladepunkt-elektromobilitaet',
          alt: 'Ladestecker wird an einem Elektrofahrzeug angeschlossen',
        },
      },
    ],
    related: [
      {
        trade: 'energie',
        reason: 'Erzeugung, Speicher und Ladepunkte laufen über dieselbe Verteilung.',
      },
      {
        trade: 'klima',
        reason: 'Regelung und Sensorik der Klimatechnik laufen über die Gebäudeleittechnik.',
      },
    ],
    process: {
      title: 'Von der Verteilung zur Bedienung',
      steps: [
        {
          title: 'Planung',
          body: 'Qualifizierte Planung zahlt sich aus: Funk für Information, große Querschnitte für Produktionsanlagen. Ansprechpartner für Bauherren, Architekten und Planer.',
        },
        {
          title: 'Installation und Netz',
          body: 'Elektroinstallation, Netzwerke, Antennen, Sicherheitstechnik, Industrie-Elektrik. Datenaustausch über Kabel oder Funk — Internet, Telefonie, Alarmanlage.',
        },
        {
          title: 'Gebäudemanagement',
          body: 'Einbruch, Brand, Licht, Zutritt, Energiemanagement. Bedienung im Raum, am PC oder Smartphone. Bei Gewerbe zählt, was später nachgerüstet werden muss.',
        },
      ],
    },
    contactGroupId: 'elektro',
    meta: {
      title: 'Elektroinstallation, KNX & Gebäudemanagement in Bühl | VEITH',
      description:
        'Elektroinstallation, Netzwerke, Sicherheitstechnik, intelligentes Gebäudemanagement, Beleuchtung und E-Mobilität. VEITH Gebäudetechnik, Bühl/Baden.',
    },
  },
]

export const tradeById = Object.fromEntries(trades.map((t) => [t.id, t])) as Record<TradeId, Trade>

export const tradeBySlug = Object.fromEntries(trades.map((t) => [t.slug, t])) as Record<string, Trade>
