# VEITH Gebäudetechnik — Website

Neubau des Webauftritts der Veith Gebäudetechnik GmbH, Bühl/Baden.
React 19 · Vite · TypeScript · SCSS · pnpm.

---

## Entwicklung

```bash
pnpm install
pnpm dev            # http://localhost:5173
pnpm build          # Typprüfung + Produktions-Build nach dist/
pnpm preview        # Build lokal ausliefern
```

### Asset-Pipelines

Diese Skripte erzeugen Dateien, die im Repository liegen. Sie laufen **nicht**
beim Build und müssen nur nach einer Änderung an der jeweiligen Quelle neu
angestoßen werden.

```bash
pnpm assets:logo      # SVG-Logoset aus der vermessenen Originalgrafik
pnpm assets:images    # AVIF/WebP/JPEG in mehreren Breiten + manifest.json
pnpm assets:sitemap   # public/sitemap.xml aus den tatsächlichen Routen
node scripts/build-og.mjs   # Open-Graph-Karte 1200×630
```

`assets:images` und `build-og.mjs` lesen aus `_scrape/`. Dieses Verzeichnis ist
bewusst **nicht** im Repository (Bildrechte liegen beim Kunden); die erzeugten
Dateien unter `public/img/` sind es.

### Qualitätssicherung

```bash
pnpm qa:responsive    # alle Routen × 11 Breakpoints, gegen laufenden Dev-Server
```

Prüft je Kombination: horizontaler Overflow (inkl. Verursacher), abgeschnittener
Text, zu kleine Touch-Targets, fehlende Alt-Texte, nicht ladende Bilder,
Überschriftenhierarchie und Konsolenfehler.

---

## Architektur

```
src/
  app/           Router und Routen-Tabelle
  components/
    layout/      Grundgerüst, Footer, Scroll-Verhalten
    navigation/  Header mit Mega-Menü, mobile Navigation
    ui/          Button, Image, Logo, Reveal, SectionHeader, NewsCard
    sections/    Seitenabschnitte der Startseite
    forms/       Kontaktformular
  data/          Inhalte als typisierte Datenmodule
  hooks/         useSeo, useReveal
  pages/         eine Datei je Route, mit eigener .scss
  styles/        tokens.scss, base.scss
  assets/logo/   generiertes SVG-Set
```

**Inhalte liegen in `src/data/`**, nicht in den Komponenten: `company.ts`,
`leistungen.ts`, `news.ts`, `karriere.ts`, `team.ts`, `service.ts`,
`navigation.ts`. Wer einen Text, eine Telefonnummer oder eine Stelle ändern
will, fasst genau eine Datei an.

### Designsystem

Alle Farben, Schriftgrößen, Abstände und Zeiten stehen in
`src/styles/tokens.scss`. Komponenten verwenden ausschließlich diese Tokens.

- **Blau führt** (`--c-navy`, `--c-blue`) — Flächen, Navigation, Links.
- **Orange signalisiert** (`--c-orange`) — ausschließlich Handlungen und
  Akzentlinien. Nie dekorativ, nie als Überschriftfarbe.
- Abschnitte wechseln über die Klassen `.on-mist` und `.on-night` den Grund;
  sie belegen die semantischen Tokens neu, statt Regeln zu überschreiben.
- Jeder Leistungsbereich hat einen eigenen Akzent (`--c-energie` …
  `--c-elektro`), der als `--accent` durch die Seite vererbt wird.

---

## Inhaltliche Grundregel

Die bestehende Website ist die **einzige** Faktenquelle. Zahlen, Zertifikate,
Referenzen, Kennzahlen, Leistungen, Standorte, Mitarbeitende und Partner dürfen
umformuliert, gekürzt und neu strukturiert, aber **nicht erfunden oder
verändert** werden. Betroffen sind vor allem:

- `data/company.ts` — Anschrift, Rufnummern, Öffnungszeiten, Registerdaten,
  die Kennzahlen des Kompetenzzentrums
- `data/team.ts` — Namen, Funktionen, Durchwahlen
- `data/news.ts` — Termine, Orte, Anmeldemodalitäten
- `pages/Impressum.tsx`, `pages/Datenschutz.tsx` — wortgetreu übernommen

---

## Deployment

Statisches Build-Ergebnis, ausgeliefert von nginx:

```bash
docker build -t veith-web .
docker run -p 8080:80 veith-web
```

`nginx.conf` setzt SPA-Fallback, Cache-Header (fingerprintete Assets ein Jahr,
`index.html` nie) und die üblichen Security-Header.

---

## Offene Punkte

- **Kontaktformular** hat kein Backend. Es validiert vollständig und übergibt
  die Anfrage anschließend an das Mailprogramm der Besucherin
  (`mailto:`) — es täuscht keinen Versand vor. Für echten serverseitigen
  Versand `handoff()` in `components/forms/ContactForm.tsx` gegen einen POST
  tauschen; Validierung und Zustände bleiben unverändert.
- **Datenschutzerklärung** wurde wortgetreu vom Bestand übernommen. Sie
  beschreibt Google Analytics, Google Web Fonts, Google Maps und YouTube —
  keines davon wird in diesem Neubau eingesetzt. Der Text sollte vor dem
  Livegang juristisch an den tatsächlichen Stand angepasst werden.
- **Referenzen** enthält keine Projektliste, weil die bestehende Seite keine
  führt. Sobald Referenzobjekte freigegeben sind, gehören sie in ein eigenes
  Datenmodul.
