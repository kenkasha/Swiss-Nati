# Projektdokumentation - Schweizer Nationalmannschaft Matchday Manager

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

<!-- Diese Vorlage ist für eine README.md im Repository gedacht. Abschnitte mit [Optional] können weggelassen werden, wenn in den Übungen nichts anderes verlangt wird. -->

## 1. Ausgangslage

Im Rahmen des Prototyping-Projekts wurde eine Webanwendung entwickelt, mit Informationen zur Schweizer Fussball-Nationalmannschaft, welche verwaltet und als Kaderplanung-Tool genutzt werden können. Die Anwendung ist kein statisches Mockup, sondern ein funktionsfähiger Prototyp mit Datenbankanbindung, Formularen, Detailansichten, Filterfunktionen, Resultatdarstellung und interaktiven Erweiterungen.

- **Problem:** 
Fussballinteressierte wie auch die Management-Ebene der Schweizer Fussball-Nationalmannschaft benötigen diverse Informationen über Spieler, Positionen, Vereine, Status, Gegner und Termine für die Planung von Fussballspielen. Diese Informationen sind oft unübersichtlich und nur eingeschränkt vergleichbar. Für interessierte Nutzer und Nutzerinnen fehlt eine zentrale, interaktive Lösung, mit der Spieler, Positionen, Spiele und mögliche Kaderplanungen übersichtlich verwaltet und betrachtet werden können.

- **Ziele:** 
Ziel dieses Projekts ist die Entwicklung einer interaktiven Webanwendung, welche die wichtigsten Informationen zur Schweizer Nationalmannschaft A zentral bündelt und benutzerfreundlich darstellt. Die Anwendung soll nicht nur Informationen anzeigen, sondern auch eine aktive Interaktion mit den Daten ermöglichen, zum Beispiel durch das Erfassen, Bearbeiten und Verwalten von Spielern und Spielen. Die Daten sollen ebenfalls in einer Datenbank (MongoDB) festgehalten werden.


- **Primäre Zielgruppe:** Fussballinteressierte Personen, die eine einfache Verwaltung für Spieler, Spiele der Schweizer Nationalmannschaft nutzen möchten. Im Projektkontext ist die Zielgruppe bewusst breit gehalten: Fans, organisatorisch interessierte Personen, Trainer:innen, Personen auf der Unternehmenesebene oder Personen, die einen Spieltag planen und visualisieren möchten.

- **Weitere Stakeholder [Optional]:** Ein weiterer Stakeholder könnte gemäss dem St.Galler Management-Modell die Konkurrenz sein. Die Konkurrenz bentötigt die Webanwendung bsp. um die Strategie der Wettbewerber zu analysieren und mit deren zu vergleichen.

## 2. Lösungsidee

Der **Swiss Nati Matchday Manager** ist eine Web-App zur Verwaltung von Spielern, Spielen, Resultaten und Aufstellungen der Schweizer Nationalmannschaft. Die App verbindet klassische Datenpflege mit visuellen und interaktiven Elementen: Spielerbilder, Flaggen, SFV-Branding, Resultatkarten, Aufstellungs-Visualisierung und ein kleines Penalty Game.

- **Kernfunktionalität:**
Die Swiss Nati Matchday Manager App deckt folgende Kernfunktionalitäten ab:

**Spielerverwaltung:** Eine Spielerübersicht zeigt Bild, Name und Position jedes Spielers mit direktem Detailzugriff. Nutzer können Spieler erstellen, bearbeiten und löschen. Die Spieler-Detailseite präsentiert alle gespeicherten Daten, während eine detaillierte Gesamtübersicht mit Sortierung und Mehrfachfilter-Optionen die Navigation erleichtert.
![Spielerliste](/static/screenshots/spielerübersicht.png)

**Spieleverwaltung:** Übersicht aller Spiele mit, Datum, Ort und Wettbewerb. Buttons ermöglichen direkte Navigation zur Aufstellung.
![Spieleliste](/static/screenshots/spielübersicht.png)

**Aufstellungsmanagement:** Das Herzstück der App ist die Matchday-Aufstellung pro Spiel mit einer auswählbaren Formation. Die positionsbasierte Spielerauswahl schützt vor doppelter Auswahl und gewährleistet logisch konsistente Kader. Alle Daten: Spieler, Spiele und Aufstellungen werden persistent in MongoDB gespeichert.
![Kader-Aufstellung](/static/screenshots/aufstellung.png)

**Zusätzliche Features:** Eine attraktive Startseite mit Carousel, Branding und direkten Workflow-Shortcuts bietet einen intuitiven Einstieg. Als kreative Erweiterung ist ein interaktives Penalty Game integriert, das die App über ihre Kernfunktionalität hinaus bereichert.


- **Annahmen [Optional]:**
  - Endnutzer möchten eine einfache Übesicht, welche Spieler und Spiele vorhanden sind.
  - Für häufige Fragen wie "Welche Spieler sind fit?" oder "Welche Spieler sind Rechtsfüsser?" ist eine filterbare Detailsübersicht hilfreich.
  - Eine Aufstellung auf einem Fussballfeld ist intuitiver als eine reine Positionsliste.
  - Resultate mit den entsprechenden Toren und Fouls erhöhen den Wiedererkennungswert und machen die App stärker thematisch.
  - Eine einfache, robuste App ist für den Prototyp wertvoller als eine komplexe Lösung mit Login.

Diese Hypothesen werden durch Usability-Tests mit Testpersonen überprüft, die bereits durchgeführt wurden (siehe Kapitel 3.5).

- **Abgrenzung [Optional]:**
  - Es gibt keine Login-Funktion und keine Rollenverwaltung.
  - Der Fokus liegt bewusst auf der Schweizer Nationalmannschaft A, damit der Projektumfang realistisch und gut umsetzbar bleibt
 

## 3. Vorgehen & Artefakte

Die Durchführung erfolgte phasenbasiert entlang des Human-Centered Design Prozesses. Zuerst wurde der Problemraum eingegrenzt und die Zielgruppe analysiert, danach wurden UI-Varianten entschieden, ein funktionsfähiger SvelteKit-Prototyp umgesetzt und mit Testpersonen validiert.


### 3.1 Understand & Define

- **Zielgruppenverständnis:**  
  Die Zielgruppe braucht eine einfache Möglichkeit, Spieler- und Spieldaten zu verwalten und diese Daten in konkrete Matchday-Situationen zu übertragen. Besonders wichtig sind schnelle Orientierung, klare Navigation und ein sichtbarer Mehrwert gegenüber einer einfachen Tabelle. Die App soll daher nicht nur Daten speichern, sondern diese auch in Fussballlogik übersetzen: Aufstellungen, Resultate, Spielerstatus und Gegner.

  Informationen zur Schweizer Nati sind oft auf verschiedene Quellen verteilt, z. B. Spielerinformationen, Vereinsdaten, Spieltermine und Resultate. Für eine einfache Matchday-Planung fehlt eine zentrale Übersicht, in der Spieler und Spiele verwaltet und anschliessend für eine Aufstellung genutzt werden können. Eine reine Liste ist für den Fussball-Kontext nur begrenzt hilfreich, da auch die Positionierung der Spieler relevant ist.

  Für den fachlichen Kontext wurden bestehende Informationsquellen zur Schweizer Nationalmannschaft betrachtet. Daraus wurden relevante Datenfelder für den Prototyp abgeleitet, z. B. Name, Position, Club, Status, Grösse, Geburtsdatum, Marktwert, bevorzugter Fuss, Spielgegner, Datum, Ort, Wettbewerb und Resultat.

  Eine beispielhafte Persona ist eine fussballinteressierte Person, die sich schnell einen Überblick über Spieler und Spiele der Schweizer Nati verschaffen möchte. Sie möchte Spieler erfassen, Spiele planen oder ansehen und eine mögliche Startelf zusammenstellen. Wichtig sind einfache Bedienung, klare Navigation und eine visuelle Darstellung der Aufstellung.

- **Wesentliche Erkenntnisse:**
  - Ein klarer Datenworkflow ist zentral: erfassen, speichern, anzeigen, bearbeiten.
  - Die App muss trotz vieler Funktionen einfach navigierbar bleiben.
  - Eine reine Tabelle wäre für den Fussballkontext zu trocken; visuelle Elemente erhöhen Verständlichkeit.
  - Filter und Sortierung werden wichtiger, sobald mehr Spielerdaten gepflegt werden.
  - Vergangene Spiele brauchen eine andere Logik als zukünftige Spiele.
  - Erweiterungen sollen den fachlichen Kontext stärken und nicht nur dekorativ sein.

### 3.2 Sketch

- **Variantenüberblick:**

  In der Sketch-Phase wurde die Methode **Crazy 8s** verwendet. Dabei wurden mehrere Varianten für ein zentrales Feature der App skizziert. Ziel war es, schnell unterschiedliche Ideen sichtbar zu machen, ohne bereits auf perfektes Design oder technische Details zu achten.

  Skizziert wurden unter anderem folgende Varianten:

  - **Kartenübersicht:** Spieler werden übersichtlich als Karten dargestellt.
  - **Detailpopup:** Zusätzliche Informationen zu einem Spieler werden in einer Detailansicht angezeigt.
  - **Watchlist / Auswahlfunktion:** Spieler können für eine persönliche Auswahl oder spätere Aufstellung vorgemerkt werden.
  - **Split-View:** Spielerübersicht und Auswahl werden nebeneinander angezeigt.
  - **Listenansicht:** Spieler werden kompakt in einer Liste dargestellt.
  - **Profilkarte:** Ein einzelner Spieler wird gross mit Bild und Zusatzinformationen dargestellt.

- **Skizzen:**  
  Die Skizzen wurden im Rahmen der Übung erstellt und als Screenshot im Projektordner abgelegt. Das Feedback zeigte, dass vor allem eine klare Trennung zwischen Übersicht, Detailansicht und persönlicher Auswahl verständlich ist. Deshalb wurden die Ideen **Kartenübersicht**, **Detailansicht** und **Auswahlfunktion** als besonders sinnvoll bewertet.

  Für den Prototyp wurde zuerst die **Kartenübersicht** umgesetzt, weil sie eine gute Übersicht bietet, einfach verständlich ist und technisch realistisch umgesetzt werden kann. Die Idee der persönlichen Auswahl wurde später in Richtung **Matchday-Aufstellung** weiterentwickelt, bei der vorhandene Spieler auf einem Fussballfeld ausgewählt werden können.

  **Artefakt:**  
  ![Crazy 8s Skizze](screenshots/skizze-crazy8s.png)

  **Architekturdiagramm als Draw.io-kompatible SVG-Datei:**

  ![Architekturdiagramm](docs/architecture.drawio.svg)


### 3.3 Decide

- **Gewählte Variante & Begründung:**  
  Für die weitere Umsetzung wurde der **Swiss Nati Matchday Manager** gewählt. Die Entscheidung basiert auf den Erkenntnissen aus der Sketch-Phase und dem Feedback zur Kartenübersicht, Detailansicht und persönlichen Auswahlfunktion. Besonders die Kombination aus Übersicht, Detailinformationen und späterer Auswahlmöglichkeit wurde als sinnvoll bewertet.

  Die wichtigsten Entscheidkriterien waren:

  - **Übersichtlichkeit:** Spieler sollen schnell gefunden und verglichen werden können.
  - **Einfache Navigation:** Nutzer:innen sollen ohne Erklärung von der Startseite zur Spielerliste und weiter zu den Spielerdetails gelangen.
  - **Umsetzbarkeit:** Die Lösung sollte im Rahmen des Prototyping-Projekts realistisch implementierbar sein.
  - **Erweiterungspotenzial:** Die App kann später um Spiele, Resultate, Aufstellungen oder Bearbeitungsfunktionen erweitert werden.
  - **Passung zum Thema:** Die Schweizer Nationalmannschaft bietet einen klaren fachlichen Kontext für Spieler-, Spiel- und Matchday-Daten.

- **End-to-End-Ablauf:**  
  Im Mockup wurde ein einfacher Hauptworkflow definiert. Nutzer:innen starten auf der Startseite, wechseln zur Spielerliste und können dort einzelne Spieler genauer betrachten. Zusätzlich gibt es eine Rücknavigation, damit die Nutzer:innen wieder zur Liste oder zur Startseite zurückkehren können.

  Der geplante End-to-End-Ablauf lautet:

  1. Nutzer:in öffnet die Startseite.
  2. Nutzer:in klickt auf „Spieler ansehen“.
  3. Die Spielerliste wird angezeigt.
  4. Nutzer:in wählt über „Spielerdetails“ einen Spieler aus.
  5. Die Detailansicht des Spielers wird geöffnet.
  6. Nutzer:in kann zurück zur Spielerliste navigieren.
  7. Nutzer:in kann über „Home“ zurück zur Startseite wechseln.

  Daraus ergaben sich folgende Workflows:

  - **Workflow 1:** Startseite → Spielerliste → Spielerdetails
  - **Workflow 2:** Spielerdetails → Zurück zur Liste → Spielerliste
  - **Workflow 3:** Spielerdetails → Home → Startseite

- **Mockup:**  
  Für die Decide-Phase wurde ein klickbares Referenz-Mockup in Figma erstellt. Das Mockup diente als Vorlage für die spätere technische Umsetzung und zeigte den grundlegenden Aufbau der App.

  **Figma-Prototyp:**  
  https://www.figma.com/proto/jSjO3zsLiY3hEfV5FhSHzi/Mockup?node-id=3-2&t=i3yBrfPhFa07ZzBa-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A2

  Für das Mockup wurde eine **Desktop-Ansicht** gewählt, da Inhalte wie Spielerliste und Spielerdetails auf einem grösseren Bildschirm übersichtlicher dargestellt werden können. Das Farbschema orientiert sich an der Schweizer Nationalmannschaft und verwendet vor allem **Rot, Weiss und Grau**. Der Prototyp wurde bewusst einfach gehalten, damit die wichtigsten Inhalte und Navigationswege klar erkennbar sind.

  Im Zentrum des Mockups stehen drei Screens:

  - **Startseite:** Einstieg in die App mit Titel und Navigation zu den wichtigsten Bereichen.
  - **Spielerliste:** Übersicht über ausgewählte Spieler mit Bild, Name, Position und Button zu den Details.
  - **Spielerdetails:** Detailansicht mit grösseren Spielerinformationen, Club, Rückennummer und persönlichem Rating.

  **Mockup-Screenshots:**  

  ![Mockup Startseite](screenshots/mockup-startseite.png)

  ![Mockup Spielerliste](screenshots/mockup-spielerliste.png)

  ![Mockup Spielerdetails](screenshots/mockup-spielerdetails.png)

  Das Mockup wurde später in der Umsetzung erweitert. Zusätzlich zur ursprünglichen Spielerübersicht wurden im finalen Prototyp auch Spiele, Resultate, Spielerdetails und eine Matchday-Aufstellung ergänzt. Daraus folgt ein neuer End-to-End-Ablauf:

- **End-to-End-Ablauf:**
  1. Nutzer:in öffnet die Startseite.
  2. Nutzer:in navigiert zu Spieler oder Spiele.
  3. Nutzer:in erstellt oder bearbeitet Datensätze.
  4. Die Daten werden in MongoDB gespeichert.
  5. Die Daten erscheinen in Übersicht, Details und Filtertabelle.
  6. Nutzer:in öffnet die Aufstellungsseite.
  7. Nutzer:in wählt Spiel und Formation.
  8. Nutzer:in weist verfügbare Spieler den Positionen zu.
  9. Die Aufstellung wird gespeichert und kann später wieder geladen werden.
  10. Vergangene Spiele können in der Resultatansicht betrachtet werden.

  ```mermaid
  flowchart LR
      A[Home] --> B[Spieler]
      A --> C[Spiele]
      A --> D[Game]
      B --> E[Detailsübersicht]
      C --> F[Resultate]
      C --> G[Aufstellung]
      G --> H[Formation wählen]
      H --> I[Spieler positionsbasiert zuweisen]
      I --> J[Lineup speichern]
  ```

  **User-Flow-Diagramm als Draw.io-kompatible SVG-Datei:**

  ![User Flow](docs/user-flow.drawio.svg)



### 3.4 Prototype

#### 3.4.1. Entwurf (Design)

Beschreibt die Gestaltung und Interaktion.

> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.

- **Informationsarchitektur:**  
  Die Informationsarchitektur der App ist nach den wichtigsten Nutzerbereichen aufgebaut. Die Navigation führt nicht technisch durch einzelne Dateien, sondern orientiert sich an den Hauptaufgaben der Nutzer:innen: Spieler ansehen und verwalten, Spiele planen, Resultate betrachten und Aufstellungen erstellen.

  Die App ist in folgende Hauptbereiche gegliedert:

  - **Home:** Einstieg in die App mit Überblick, Carousel und direkten Links zu den wichtigsten Workflows.
  - **Spieler:** Bereich zur Verwaltung der Spielerdaten.
    - Spielerliste mit kompakten Spielerkarten
    - Spieler-Detailseite mit erweiterten Informationen
    - Detailsübersicht mit Filter- und Sortierfunktionen
    - Spieler erstellen und bearbeiten als unterstützende Aktionen
  - **Spiele:** Bereich zur Verwaltung und Anzeige von Spielen.
    - Spieleliste mit Gegner, Datum, Ort, Wettbewerb und Status
    - Spiel erstellen und bearbeiten als unterstützende Aktionen
    - Resultate für vergangene Spiele
  - **Aufstellung:** Matchday-Bereich, in dem pro Spiel eine Formation gewählt und Spieler auf einem Fussballfeld positioniert werden können.
  - **Penalty Game:** Spielerische Zusatzfunktion, welche vorhandene Spielerdaten für eine interaktive Mini-Anwendung nutzt.

  Dadurch entsteht eine klare Struktur: Die Nutzer:innen starten auf der Home-Seite, wechseln zu Spielern oder Spielen und können die Daten anschliessend in der Aufstellung oder in den Resultaten weiterverwenden.

- **User Interface Design:**  
  Die App nutzt eine rote Swiss-Nati-Farbwelt, SFV-Logo-Elemente, lokale Flaggen und Spielerbilder. Die Startseite dient als Einstieg in die wichtigsten Workflows. Spieler werden auf Karten angezeigt, während vollständige Daten in der Detailsübersicht tabellarisch dargestellt werden. Spiele erscheinen als Match-Karten mit Flaggen, Resultate als dunkle Scorecards mit Toren und Karten. Die Aufstellung verwendet ein Fussballfeld, damit Positionen räumlich erkennbar werden. Das Penalty Game ist bewusst spielerischer gestaltet und nutzt CSS-Animationen.

**Screenshots:** 
![Kader-Aufstellung](/static/screenshots/aufstellung.png)
![Spieleliste](/static/screenshots/spielübersicht.png)
![Spielerliste](/static/screenshots/spielerübersicht.png)


- **Designentscheidungen:**  
  Für die Gestaltung des Prototyps wurden mehrere zentrale Entscheidungen getroffen. Spieler und Spiele werden primär als Karten dargestellt, weil diese Darstellungsform schneller erfassbar und visuell ansprechender ist als eine reine Tabelle. Gleichzeitig wird für die detaillierte Spielerdatenübersicht bewusst eine Tabelle verwendet, da dort viele Informationen wie Grösse, Geburtsdatum, Marktwert, Status oder bevorzugter Fuss besser verglichen und gefiltert werden können.

  Für spezielle Bereiche wie die Aufstellung, Resultate und das Penalty Game wurden eigene CSS-Regeln verwendet. Diese Seiten unterscheiden sich funktional und visuell stärker vom Standardlayout und benötigen deshalb eine eigene Gestaltung. Die Aufstellung wird als Fussballfeld dargestellt, damit die Positionen der Spieler räumlich verständlich sind und der Matchday-Kontext klar erkennbar wird.

  Ein weiteres Gestaltungselement ist das Swiss-Nati-Branding. Farben, Logos, Flaggen und Spielerbilder werden bewusst eingesetzt, damit die App thematisch zusammenhängend wirkt und sofort erkennbar ist, dass es um die Schweizer Nationalmannschaft geht. Die Startseite verwendet deshalb ein Carousel, grosse Einstiegskarten und direkte Call-to-Action-Links, damit Nutzer:innen schnell zu den wichtigsten Bereichen gelangen.

  Auch die Behandlung von vergangenen und zukünftigen Spielen wurde bewusst unterschiedlich gestaltet. Zukünftige Spiele stehen stärker im Kontext der Planung und Aufstellung, während vergangene Spiele als Resultate mit Score, Toren und Kartenereignissen dargestellt werden. Die Resultatkarten verwenden feste Spalten und einheitliche Abstände, damit Tore und Karten über verschiedene Spiele hinweg vergleichbar und sauber ausgerichtet bleiben.

  Für die Detailsübersicht wurden Excel-ähnliche Filter gewählt, weil dieses Muster vielen Nutzer:innen bekannt ist und eine effiziente Suche nach mehreren Kriterien ermöglicht. Dadurch können Spieler nicht nur angeschaut, sondern gezielt nach Position, Status, Geburtsjahr oder weiteren Eigenschaften gefiltert werden.

#### 3.4.2. Umsetzung (Technik)

Fasst die technische Realisierung des Prototyps zusammen.

- **Technologie-Stack:**  
  Für die Umsetzung wurde der im Modul vorgegebene Technologie-Stack mit SvelteKit verwendet. Ergänzend wurden Bootstrap für das Layout, MongoDB Atlas für die Datenhaltung und Netlify für das Deployment eingesetzt.

  - SvelteKit
  - Svelte 5
  - JavaScript
  - HTML / CSS
  - Bootstrap
  - MongoDB Atlas
  - Netlify
  - Git / GitHub

- **Tooling:**  
  Für Entwicklung, Datenverwaltung, Deployment und Dokumentation wurden folgende Tools genutzt:

  - **Visual Studio Code** als Entwicklungsumgebung
  - **GitHub** für Versionsverwaltung und Repository
  - **Netlify** für Deployment und Hosting
  - **MongoDB Atlas** als Cloud-Datenbank
  - **MongoDB Compass** zur Kontrolle und Bearbeitung der Datenbankinhalte
  - **Draw.io Extension** für `.drawio.svg`-Diagramme
  - **Mermaid** für einfache Diagramme direkt in der Markdown-Dokumentation
  - **KI-Unterstützung:** Der Einsatz von KI-Tools wird separat in Kapitel 6 dokumentiert.

- **Struktur & Komponenten:**  
  Die App ist nach der SvelteKit-Routenstruktur aufgebaut. Die wichtigsten Seiten, Komponenten und Hilfsdateien sind:

  - `src/routes/+layout.svelte`: globales Layout, Navigation und Branding
  - `src/routes/+page.svelte`: Startseite mit Hero-Bereich, Carousel und Workflow-Einstiegen
  - `src/routes/players/+page.svelte`: Spielerübersicht
  - `src/routes/players/create/+page.svelte`: Formular zum Erfassen neuer Spieler
  - `src/routes/players/[id]/details/+page.svelte`: Spieler-Detailseite
  - `src/routes/players/[id]/edit/+page.svelte`: Spieler bearbeiten
  - `src/routes/players/overview/+page.svelte`: Detailsübersicht mit Filter- und Sortierfunktionen
  - `src/routes/games/+page.svelte`: Spieleübersicht
  - `src/routes/games/create/+page.svelte`: Formular zum Erfassen neuer Spiele
  - `src/routes/games/[id]/edit/+page.svelte`: Spiel bearbeiten
  - `src/routes/games/results/+page.svelte`: Resultatansicht
  - `src/routes/lineup/+page.svelte`: Matchday-Aufstellung
  - `src/routes/lineup/lineup.css`: eigenes Stylesheet für das Fussballfeld
  - `src/routes/game/+page.svelte`: Penalty Game
  - `src/lib/server/db.js`: zentrale Datenbankfunktionen
  - `src/lib/country-flags.js`: Länder-, Flaggen- und Anzeigeformatierung
  - `src/lib/match-results.js`: Resultate, Tore und Kartenereignisse
  - `static/players`, `static/flags`, `static/logo`, `static/carousel`: statische Assets
  - `docs/*.drawio.svg`: Diagramme für die Projektdokumentation

- **Daten & Schnittstellen:**  
  Die Daten werden in **MongoDB Atlas** gespeichert. Dadurch bleiben Spieler, Spiele und Aufstellungen dauerhaft erhalten und gehen nicht verloren, wenn die App oder der Browser geschlossen wird.

  Es werden drei zentrale Collections verwendet:

  | Collection | Zweck | Beispiele für Daten |
  | --- | --- | --- |
  | `players` | Verwaltung der Spielerdaten | Name, Position, Club, Status, Marktwert |
  | `games` | Verwaltung der Spiele | Gegner, Datum, Ort, Wettbewerb, Resultat |
  | `lineups` | Speicherung der Aufstellungen pro Spiel | Spiel-ID, Formation, gewählte Spieler pro Position |

  Die Daten werden über serverseitige SvelteKit `load`-Funktionen geladen. Neue oder geänderte Datensätze werden über Form Actions verarbeitet und in MongoDB gespeichert. Die Aufstellungen werden in einer eigenen Collection gespeichert, damit eine Formation pro Spiel später wieder geladen werden kann.

  Zusätzlich wurden Datenabhängigkeiten berücksichtigt: Beim Löschen eines Spiels werden zugehörige Aufstellungen entfernt. Beim Ändern von Spielerpositionen werden gespeicherte Aufstellungen synchronisiert, damit Spieler nicht auf unpassenden Positionen bestehen bleiben.

  **Technische Architektur als Mermaid-Diagramm:**

  ```mermaid
  flowchart TD
      U[Nutzer:in] --> R[SvelteKit Routing]
      R --> P[Pages und Form Actions]
      P --> L[src/lib/server/db.js]
      L --> M[(MongoDB Atlas)]
      P --> A[Statische Assets]
      A --> F[Flaggen, Logos, Spielerbilder]
      P --> N[Netlify Deployment]

- **Deployment:**  
https://github.com/kenkasha/Swiss-Nati.git
- **Besondere Entscheidungen:**
  - gab es keine

### 3.5 Validate

- **Screenshot der getesteten Version**  
![Aufstellung](/static/screenshots/falscheaufstellung.png)

- **Ziele der Prüfung:**  
  Ziel der Evaluation war es zu prüfen, ob die wichtigsten Workflows des Prototyps für Nutzer:innen verständlich und selbstständig durchführbar sind. Dabei standen nicht nur die technischen Funktionen im Fokus, sondern auch Navigation, Verständlichkeit, visuelle Gestaltung und fachliche Logik der App.

  Konkret sollten folgende Fragen beantwortet werden:

  - Verstehen Testpersonen den Zweck der App bereits auf der Startseite?
  - Finden Testpersonen die zentralen Bereiche wie Spieler, Spiele, Resultate und Aufstellung?
  - Können Testpersonen Spieler und Spiele selbstständig erfassen?
  - Sind Detailseiten, Detailsübersicht und Filterfunktionen verständlich?
  - Ist der Unterschied zwischen zukünftigen und vergangenen Spielen nachvollziehbar?
  - Ist die Aufstellung als Matchday-Workflow verständlich?
  - Wirkt die App visuell konsistent und passend zur Schweizer Nationalmannschaft?

- **Vorgehen:**  
  Die Evaluation wurde als kurzer moderierter Usability-Test durchgeführt. Die Testpersonen erhielten konkrete Aufgaben und sollten diese direkt in der deployten App lösen. Während der Nutzung wurden sie gebeten, laut zu denken, damit Unklarheiten, Erwartungen und mögliche Probleme sichtbar werden. Die Testleitung griff möglichst wenig ein und stellte nur bei Bedarf kurze Rückfragen, zum Beispiel: „Was würdest du als Nächstes tun?“ oder „Was erwartest du auf dieser Seite?“.

  Die Beobachtungen wurden während des Tests notiert und anschliessend ausgewertet. Auffällige Punkte wurden priorisiert und teilweise direkt in einer nächsten Iteration im Prototyp verbessert.

- **Stichprobe:**  
  Getestet wurde mit zwei Personen aus dem Umfeld des Moduls Prototyping. Beide Personen sind mit Webanwendungen vertraut, waren aber nicht an der Umsetzung des Projekts beteiligt.

  - **Testperson A:** Studentin, sportinteressiert, nutzt regelmässig Webanwendungen.
  - **Testperson B:** Student, technisch affin, kennt einfache Web- und Datenbankanwendungen.

- **Aufgaben/Szenarien:**  
  Die Testpersonen sollten typische Kernaufgaben des Prototyps durchführen. Dabei wurden sowohl die Grundfunktionen als auch die wichtigsten Erweiterungen geprüft.

  1. Startseite öffnen und beschreiben, welche Funktionen der App erwartet werden.
  2. Spielerübersicht öffnen und einen Spieler im Detail ansehen.
  3. Einen neuen Spieler erfassen und prüfen, ob dieser in der Übersicht erscheint.
  4. Detailsübersicht öffnen und nach Position oder Status filtern.
  5. Ein neues Spiel erfassen.
  6. Spieleübersicht prüfen und zwischen zukünftigen und vergangenen Spielen unterscheiden.
  7. Resultate öffnen und Tor- sowie Karteninformationen interpretieren.
  8. Aufstellungsseite öffnen, ein Spiel wählen, Formation ändern und mehrere Spieler platzieren.
  9. Prüfen, ob ein Spieler mehrfach in der Aufstellung ausgewählt werden kann.
  10. Penalty Game öffnen und einen Schuss ausführen.

- **Kennzahlen & Beobachtungen:**  

  Die Bewertung des Schweregrads wurde einfach gehalten:  
  **0 = kein Problem**, **1 = kleines Usability-Problem**, **2 = relevantes Problem mit Verbesserungsbedarf**.

  | Testaufgabe | Erfolgskriterium | Beobachtung | Schweregrad | Abgeleitete Verbesserung |
  | --- | --- | --- | --- | --- |
  | Navigation verstehen | zentrale Bereiche werden gefunden | Die Navigation war grundsätzlich verständlich. Spieler, Spiele und Aufstellung wurden schnell gefunden. | 0 | keine Änderung nötig |
  | Spieler erfassen | neuer Spieler erscheint in der Übersicht | Das Formular wurde verstanden und korrekt ausgefüllt. | 0 | keine Änderung nötig |
  | Spieler-Details öffnen | Detailinformationen werden gefunden | Die Detailseite wurde verstanden, da der Button klar erkennbar war. | 0 | keine Änderung nötig |
  | Detailsübersicht nutzen | Filter werden verstanden und angewendet | Der ursprüngliche Einzelauswahl-Filter war zu eingeschränkt, da mehrere Werte gleichzeitig erwartet wurden. | 2 | Excel-ähnliche Checkbox-Filter umgesetzt |
  | Geburtsdatum filtern | sinnvoll nach Alter/Jahr filtern | Ein Filter nach vollständigem Geburtsdatum war wenig hilfreich. Erwartet wurde eher eine Filterung nach Jahr. | 2 | Filter auf Geburtsjahr geändert |
  | Spiel erfassen | neues Spiel erscheint in der Spieleübersicht | Das Formular war verständlich, Datum und Gegner konnten korrekt erfasst werden. | 0 | keine Änderung nötig |
  | Vergangene Spiele erkennen | Status ist nachvollziehbar | Der Unterschied zwischen vergangenen und zukünftigen Spielen war grundsätzlich verständlich. | 1 | Status visuell klarer dargestellt |
  | Aufstellung erstellen | Spiel, Formation und Spieler sind wählbar | Der Workflow wurde verstanden. Positiv war, dass Spieler nicht doppelt gewählt werden konnten. | 1 | Spielerbilder und Layout verfeinert |
  | Resultate lesen | Tore und Karten sind klar erkennbar | Die Inhalte waren verständlich, aber die Ausrichtung war zwischen Spielen teilweise uneinheitlich. | 1 | feste Spalten und Mindesthöhen umgesetzt |
  | Branding wahrnehmen | App wirkt thematisch passend | Farben, Flaggen, Logo und Spielerbilder wurden positiv wahrgenommen. | 0 | Logo-Positionen vereinheitlicht |
  | Penalty Game testen | Schuss kann ausgeführt werden | Die Funktion wurde als kreative Erweiterung wahrgenommen, ist aber nicht zentral für den Hauptworkflow. | 1 | als optionale Erweiterung belassen |

- **Zusammenfassung der Resultate:**  
  Die Evaluation zeigte, dass die zentralen Workflows verstanden und erfolgreich durchgeführt werden konnten. Besonders Spieler erfassen, Spiele erfassen, Detailseiten öffnen und die Aufstellung nutzen funktionierten grundsätzlich gut. Die wichtigsten Verbesserungsbereiche lagen nicht bei der Grundfunktionalität, sondern bei der Bedienung der Detailsübersicht, der Filterlogik, doppelte Auswahlfunktion in der Aufstellung und der einheitlichen Darstellung von Resultaten. Diese Punkte wurden anschliessend im Prototyp überarbeitet.

- **Abgeleitete Verbesserungen:**  
  Aus der Evaluation wurden folgende Verbesserungen abgeleitet und priorisiert:

  1. **Excel-ähnliche Mehrfachfilter in der Detailsübersicht umsetzen**  
     Die Testpersonen erwarteten, mehrere Werte gleichzeitig auswählen zu können. Deshalb wurden Checkbox-Filter ergänzt.

  2. **Geburtsdatum nach Geburtsjahr filterbar machen**  
     Das vollständige Geburtsdatum war als Filter zu granular. Die Filterung nach Jahr ist für Vergleiche hilfreicher.

  3. **Resultate einheitlicher ausrichten**  
     Tore und Karten wurden besser strukturiert, damit die Resultatkarten über verschiedene Spiele hinweg vergleichbar bleiben.

  4. **Aufstellung visuell verbessern**  
     Spielerbilder, Layout und Positionsdarstellung wurden verfeinert, damit die Aufstellung verständlicher und ansprechender wirkt.

  5. **Branding vereinheitlichen**  
     Logo, Flaggen und Swiss-Nati-Farbwelt wurden stärker vereinheitlicht, damit die App zusammenhängender wirkt.

  6. **Länder- und Flaggenlogik verbessern**  
     Ländernamen wurden normalisiert, damit z. B. `USA` korrekt angezeigt wird und Flaggen zuverlässig geladen werden.

  7. **Doppelte Auswahl von Spielern vermeiden bei der Aufstellung**  
     Ein Spieler ist in einer Aufstellung nur noch einmal wählbar und nicht mehrmals sobald er angewählt wurde.

## 4. Erweiterungen [Optional]

Dokumentiert werden Erweiterungen, die über den Mindestumfang hinausgehen. Der Mindestumfang der App umfasst das Erfassen, Anzeigen und Speichern von Spielern und Spielen. Die folgenden Erweiterungen wurden ergänzt, um den Prototyp funktional, visuell und fachlich stärker auf den Matchday-Kontext der Schweizer Nationalmannschaft auszurichten.

### 4.1 Matchday-Aufstellung mit Fussballfeld

- **Beschreibung & Nutzen:**  
  Zusätzlich zur Spieler- und Spielverwaltung wurde eine visuelle Matchday-Aufstellung umgesetzt. Nutzer:innen können ein Spiel auswählen, eine Formation festlegen und passende Spieler den Positionen auf einem Fussballfeld zuweisen. Dadurch werden die gespeicherten Spielerdaten nicht nur angezeigt, sondern in einem konkreten Fussball-Workflow weiterverwendet. Die Darstellung auf dem Feld ist verständlicher und thematisch passender als eine reine Tabelle oder Liste.

  Die Erweiterung enthält zudem eine Logik, die doppelte Spielerauswahl verhindert. Dadurch kann ein Spieler nicht gleichzeitig auf mehreren Positionen eingesetzt werden. Die Aufstellung wird pro Spiel gespeichert und kann später wieder geladen werden.

- **Wo umgesetzt:**  
  - **Frontend:** `src/routes/lineup/+page.svelte`
  - **Backend / Datenladen:** `src/routes/lineup/+page.server.js`
  - **Styling:** `src/routes/lineup/lineup.css`
  - **Datenbank:** Collection `lineups`
  - **Assets:** Spielerbilder aus `static/players`
  - **Datenbankfunktionen:** `src/lib/server/db.js`

- **Referenz:**  
  Die Erweiterung ist über den Navigationspunkt **Aufstellung** sichtbar. Zusätzlich wird sie in Kapitel 3.4.1 beim User Interface Design und in Kapitel 3.4.2 bei der technischen Umsetzung beschrieben.

- **Aus Evaluation abgeleitet?:**  
  Teilweise. Die Grundidee wurde als fachliche Erweiterung geplant. Layout, Spielerbilder und Bedienbarkeit wurden aufgrund eigener Tests und Beobachtungen weiter verfeinert.

### 4.2 Erweiterte Spielerverwaltung mit Details, Bearbeitung und Filter

- **Beschreibung & Nutzen:**  
  Die ursprüngliche Spielerübersicht wurde erweitert, damit die App nicht nur eine einfache Liste zeigt. Spieler können inzwischen detailliert betrachtet, bearbeitet und in einer vollständigen Detailsübersicht gefiltert werden. Die Hauptübersicht bleibt dadurch kompakt, während zusätzliche Informationen wie Club, Status, Grösse, Geburtsdatum, Marktwert oder bevorzugter Fuss in separaten Ansichten zugänglich sind.

  Besonders die Detailsübersicht bietet einen Mehrwert, weil Nutzer:innen gezielt nach Eigenschaften suchen können, z. B. nach Position, Status, Geburtsjahr oder bevorzugtem Fuss. Dafür wurden Excel-ähnliche Mehrfachfilter umgesetzt.

- **Wo umgesetzt:**  
  - **Spielerübersicht:** `src/routes/players/+page.svelte`
  - **Spieler-Detailseite:** `src/routes/players/[id]/details/+page.svelte`
  - **Spieler bearbeiten:** `src/routes/players/[id]/edit/+page.svelte`
  - **Detailsübersicht mit Filtern:** `src/routes/players/overview/+page.svelte`
  - **Backend / Datenbankfunktionen:** `src/lib/server/db.js`
  - **Datenbank:** Collection `players`

- **Referenz:**  
  Sichtbar unter dem Navigationspunkt **Spieler** sowie in der **Detailsübersicht**. Die Funktion wird ausserdem in Kapitel 3.4.1 beim UI Design und in Kapitel 3.5 bei der Evaluation erwähnt.

- **Aus Evaluation abgeleitet?:**  
  Ja, teilweise. Die Filterlogik wurde aufgrund der Evaluation angepasst. Der ursprüngliche Filter war zu eingeschränkt, weshalb Excel-ähnliche Mehrfachfilter und ein sinnvollerer Geburtsjahr-Filter umgesetzt wurden.

### 4.3 Erweiterte Spieleverwaltung mit Resultaten und Schutz vergangener Spiele

- **Beschreibung & Nutzen:**  
  Die Spieleverwaltung wurde erweitert, sodass nicht nur Spiele erfasst und angezeigt werden können. Vergangene Spiele werden als Resultate dargestellt und enthalten Score, Torschützen, Kartenereignisse und Flaggen. Dadurch wird zwischen geplanten Spielen und bereits gespielten Partien unterschieden.

  Zusätzlich werden vergangene Spiele anders behandelt als zukünftige Spiele. Zukünftige Spiele dienen stärker der Planung und Aufstellung, während vergangene Spiele als Resultate betrachtet werden. Beim Löschen eines Spiels werden zugehörige Aufstellungen entfernt, damit keine veralteten Daten bestehen bleiben.

- **Wo umgesetzt:**  
  - **Spieleübersicht:** `src/routes/games/+page.svelte`
  - **Spiel erfassen:** `src/routes/games/create/+page.svelte`
  - **Spiel bearbeiten:** `src/routes/games/[id]/edit/+page.svelte`
  - **Resultatansicht:** `src/routes/games/results/+page.svelte`
  - **Resultatdaten:** `src/lib/match-results.js`
  - **Flaggenlogik:** `src/lib/country-flags.js`
  - **Assets:** `static/flags`
  - **Datenbank:** Collection `games`

- **Referenz:**  
  Sichtbar unter **Spiele** und **Resultate**. Die Resultatseite wird in Kapitel 3.4.1 als wichtiger Screen des Prototyps beschrieben.

- **Aus Evaluation abgeleitet?:**  
  Teilweise. Die grundsätzliche Trennung zwischen zukünftigen und vergangenen Spielen wurde fachlich geplant. Die einheitlichere Darstellung von Toren und Karten wurde aufgrund visueller Prüfung und Evaluation verbessert.

### 4.4 Branding, Startseite und visuelle Assets

- **Beschreibung & Nutzen:**  
  Die App wurde visuell stärker an die Schweizer Nationalmannschaft angepasst. Dazu gehören eine rote Swiss-Nati-Farbwelt, Flaggen, Logo-Elemente, Spielerbilder und ein Carousel auf der Startseite. Dadurch wirkt der Prototyp nicht wie eine generische Verwaltungsapp, sondern thematisch passend zum Projekt.

  Die Startseite wurde zusätzlich mit direkten Einstiegskarten erweitert. Nutzer:innen können dadurch schneller zu den wichtigsten Bereichen wie Spieler, Spiele und Aufstellung wechseln.

- **Wo umgesetzt:**  
  - **Startseite:** `src/routes/+page.svelte`
  - **Globales Layout / Navigation:** `src/routes/+layout.svelte`
  - **Flaggenlogik:** `src/lib/country-flags.js`
  - **Spielerbilder:** `static/players`
  - **Flaggen:** `static/flags`
  - **Logos:** `static/logo`
  - **Carousel-Bilder:** `static/carousel`

- **Referenz:**  
  Sichtbar auf der Startseite sowie auf mehreren Unterseiten wie Spieler, Spiele, Resultate und Aufstellung.

- **Aus Evaluation abgeleitet?:**  
  Teilweise. Die visuelle Gestaltung wurde iterativ verbessert. Die Testpersonen nahmen Branding, Flaggen und Spielerbilder positiv wahr, weshalb diese Elemente beibehalten und vereinheitlicht wurden.

### 4.5 Penalty Game als spielerische Zusatzfunktion

- **Beschreibung & Nutzen:**  
  Als zusätzliche interaktive Erweiterung wurde ein Penalty Game umgesetzt. Nutzer:innen können einen Feldspieler als Schützen auswählen. Der Goalie wird automatisch aus den vorhandenen Spielern mit Position `Goalie` bestimmt. Der Zielpunkt folgt der Maus, der Ball fliegt sichtbar zum Ziel und Tore sowie Paraden werden gezählt.

  Diese Funktion ist nicht Teil des Kernworkflows, erweitert die App aber thematisch passend und zeigt, dass vorhandene Spielerdaten auch für spielerische Interaktionen genutzt werden können.

- **Wo umgesetzt:**  
  - **Frontend:** `src/routes/game/+page.svelte`
  - **Datenladen:** `src/routes/game/+page.server.js`
  - **Datenbasis:** Collection `players`
  - **Styling / Animation:** direkt in der Game-Seite bzw. zugehörigen Styles

- **Referenz:**  
  Sichtbar über den Navigationspunkt **Game**.

- **Aus Evaluation abgeleitet?:**  
  Nein. Das Penalty Game wurde als kreative Zusatzfunktion umgesetzt. In der Evaluation wurde es als optionale Erweiterung wahrgenommen, aber nicht als zentraler Bestandteil des Hauptworkflows bewertet.

## 5. Projektorganisation [Optional]

- **Repository & Struktur:**  
  Das Projekt wird über GitHub versioniert und verwaltet.

  **GitHub Repository:**  
  https://github.com/kenkasha/Swiss-Nati.git

  Die Projektstruktur orientiert sich an der SvelteKit-Logik und ist nach Seiten, gemeinsamer Logik, Datenbankzugriffen, statischen Assets und Dokumentationsartefakten gegliedert:

  - `src/routes`: Seiten, Routen, Formulare und serverseitige Load-Funktionen
  - `src/lib`: gemeinsame Hilfslogik, z. B. Länder-/Flaggenlogik und Resultatdaten
  - `src/lib/server`: serverseitige Datenbankfunktionen und MongoDB-Anbindung
  - `static`: öffentlich verfügbare Assets wie Spielerbilder, Flaggen, Logos und Carousel-Bilder
  - `screenshots`: Screenshots für die Projektdokumentation
  - `docs`: Diagramme und zusätzliche Dokumentationsartefakte, z. B. Draw.io-Dateien

- **Issue-Management:**  
  Für die Projektorganisation wurden offene Aufgaben als To-do-Liste geführt und schrittweise abgearbeitet. Die Aufgaben wurden nach Funktionsbereichen und Abgabeanforderungen priorisiert. Besonders wichtig waren die Fertigstellung der Kernfunktionen, die Evaluation, die Projektdokumentation, Screenshots, Bildquellen sowie die Vorbereitung der finalen Abgabe.

  | Aufgabe | Status |
  | --- | --- |
  | Spieler erfassen, anzeigen, bearbeiten und löschen | erledigt |
  | Spiele erfassen, anzeigen, bearbeiten und löschen | erledigt |
  | Matchday-Aufstellung mit gespeicherten Lineups umsetzen | erledigt |
  | Resultatansicht mit Toren, Karten und Flaggen ergänzen | erledigt |
  | Detailsübersicht mit Filter- und Sortierfunktionen erstellen | erledigt |
  | Penalty Game als Zusatzfunktion umsetzen | erledigt |
  | README strukturkonform finalisieren | erledigt |
  | Diagramme und Screenshots ergänzen | erledigt |
  | Evaluation durchführen und dokumentieren | erledigt |
  | Video-Walkthrough vorbereiten | offen |
  | Bildquellen und Nutzungsrechte final prüfen | offen |
  | GitHub-Zip und Moodle-Abgabe vorbereiten | offen |

- **Commit-Praxis:**  
  Änderungen wurden regelmässig über Git versioniert und auf GitHub synchronisiert. Für grössere Arbeitsschritte wurden sprechende Commit Messages verwendet, damit die Entwicklung des Prototyps nachvollziehbar bleibt. Beispiele für solche Arbeitsschritte sind die Einrichtung des Deployments, die Umsetzung der Spieler- und Spieleverwaltung, die Ergänzung der Aufstellung, die Resultatansicht sowie die Aktualisierung der Dokumentation.

  Für die finale Abgabe wird nach den letzten Anpassungen nochmals ein finaler Commit erstellt und auf GitHub gepusht. Anschliessend wird geprüft, ob das automatische Netlify-Deployment erfolgreich durchgeführt wurde und die Online-Version den aktuellen Stand zeigt.

## 6. KI-Deklaration

Die folgende Deklaration beschreibt den Einsatz von KI im Projekt. KI wurde unterstützend eingesetzt. Die fachlichen Entscheidungen, die Umsetzung im Projekt, das Testen und die finale Verantwortung liegen bei mir.

### 6.1 KI-Tools

- **Eingesetzte Tools:**  
  Im Projekt wurde hauptsächlich **Copilot und ChatGPT** als Unterstützung verwendet. Zusätzlich wurde KI-Unterstützung für Code-Erklärungen, Fehlersuche, Dokumentationsentwürfe und Bildgenerierung genutzt. Eine Claude-Erweiterung in Visual Studio Code wurde geprüft bzw. installiert, war jedoch nicht das zentrale Werkzeug für die Umsetzung.

- **Zweck & Umfang:**  
  KI wurde in verschiedenen Projektphasen unterstützend eingesetzt:

  - **Ideenfindung und Projektabgrenzung:** Unterstützung bei der Konkretisierung der Projektidee „Swiss Nati Matchday Manager“ und bei der Abgrenzung des Umfangs.
  - **Technische Umsetzung:** Hilfe bei SvelteKit-Routen, Form Actions, MongoDB-Anbindung, Netlify Deployment, Git/GitHub-Abläufen und Fehleranalyse.
  - **UI und Styling:** Unterstützung bei Bootstrap-Struktur, CSS-Anpassungen, Fussballfeld-Layout, Spielerbildern, Resultatkarten und visuellen Verbesserungen.
  - **Datenaufbereitung:** Unterstützung beim Erstellen und Formatieren von Spieler-Testdaten im CSV- und JSON-Format.
  - **Dokumentation:** Formulierungshilfe für README-Kapitel, KI-Deklaration, Evaluation, Erweiterungen und technische Beschreibung.
  - **Bildgenerierung:** Erstellung von prototypischen Carousel- und Stadionbildern, um die App visuell ansprechender zu gestalten.

  Die KI wurde somit sowohl für konzeptionelle als auch technische und dokumentarische Aufgaben genutzt. Der Einsatz war unterstützend und iterativ, nicht vollständig automatisiert.

- **Eigene Leistung und Abgrenzung:**  
  Die Projektidee, die Auswahl der finalen Funktionen, die fachlichen Entscheidungen und die finale Umsetzung wurden von mir verantwortet. KI-Vorschläge wurden nicht ungeprüft übernommen, sondern in Visual Studio Code eingefügt, angepasst und im Browser getestet. Fehler wurden iterativ korrigiert. Auch die finale Entscheidung, welche Funktionen in die App und Dokumentation aufgenommen werden, lag bei mir.

  Eigenständig erarbeitet bzw. verantwortet wurden insbesondere:

  - Auswahl und Eingrenzung der Projektidee
  - Entscheidung für die finalen Funktionen
  - Umsetzung und Testen im eigenen Projekt
  - Pflege der Daten in MongoDB
  - Deployment auf Netlify
  - Durchführung der Evaluation
  - finale Kontrolle der Dokumentation
  - Verantwortung für Quellen, Bildrechte und Korrektheit

### 6.2 Prompt-Vorgehen

Beim Prompting wurde schrittweise und problemorientiert gearbeitet. Meist wurde zuerst das konkrete Ziel oder Problem beschrieben, danach wurden relevante Codeausschnitte, Screenshots oder Fehlermeldungen ergänzt. Die Antworten der KI wurden anschliessend im Projekt getestet und bei Bedarf angepasst.

Typisches Vorgehen:

1. **Problem oder Ziel beschreiben**  
   Beispiel: Eine neue Seite erstellen, Daten aus MongoDB laden, Spieler bearbeiten oder ein Layoutproblem lösen.

2. **Kontext bereitstellen**  
   Häufig wurden bestehende Dateien, Screenshots, Fehlermeldungen oder aktuelle Codeausschnitte mitgegeben, damit die KI gezielter helfen konnte.

3. **Schrittweise Umsetzung**  
   Änderungen wurden bewusst in kleinen Schritten umgesetzt, z. B. zuerst Route erstellen, danach Serverdatei, danach Frontend, danach Styling.

4. **Testen und Nachbessern**  
   Nach jeder grösseren Änderung wurde die App lokal oder online geprüft. Bei Fehlern wurden die Fehlermeldungen erneut verwendet, um gezielt nachzubessern.

5. **Dokumentation ergänzen**  
   Die KI wurde auch genutzt, um bestehende README-Texte sprachlich zu verbessern und an die Vorlage anzupassen.

Bei Quellen und Urheberrecht wurde darauf geachtet, dass externe Inhalte nicht ungeprüft übernommen werden. Spieler- und Marktdaten wurden als Testdaten für den Prototyp verwendet. Bei Bildern und Assets muss für die finale Abgabe geprüft und dokumentiert werden, ob die Nutzung erlaubt ist oder ob lizenzfreie bzw. selbst generierte Platzhalter verwendet werden.

### 6.3 Reflexion

Der Einsatz von KI war für das Projekt sehr hilfreich, weil komplexe technische Themen in kleinere und verständlichere Schritte zerlegt wurden. Besonders beim Einstieg in SvelteKit, MongoDB, GitHub und Netlify half KI dabei, Vorgehensweisen zu verstehen und Fehler schneller zu finden. Auch bei CSS-Problemen, Datenformatierung und README-Formulierungen war die Unterstützung nützlich.

Gleichzeitig zeigte sich, dass KI-Vorschläge nicht automatisch korrekt oder vollständig passend sind. Teilweise mussten Codevorschläge angepasst werden, weil sie nicht exakt zur bestehenden Projektstruktur passten oder visuell nicht das gewünschte Ergebnis lieferten. Deshalb war es wichtig, jeden Schritt selbst zu testen, die Funktionsweise zu verstehen und die Vorschläge kritisch zu prüfen.

Ein Risiko besteht darin, KI-generierten Code oder Text zu übernehmen, ohne ihn ausreichend zu verstehen. Um dieses Risiko zu reduzieren, wurden Änderungen schrittweise eingebaut, im Browser getestet und bei Bedarf mit `npm run build` überprüft. Ausserdem wurden technische und fachliche Entscheidungen bewusst selbst getroffen.

Insgesamt hat KI den Entwicklungsprozess beschleunigt und beim Lernen unterstützt. Die Verantwortung für die finale App, die Dokumentation, die Evaluation sowie rechtliche Aspekte wie Quellen und Bildrechte bleibt jedoch vollständig bei mir.

## 7. Anhang 

- **Online-Version:**  
  https://swiss-nati-matchday-manager.netlify.app/

- **GitHub Repository:**  
https://github.com/kenkasha/Swiss-Nati.git

- **Architekturdiagramm:**  
  `docs/architecture.drawio.svg`

- **User-Flow-Diagramm:**  
  `docs/user-flow.drawio.svg`

- **Verwendete Technologien:**  
  SvelteKit, Svelte 5, JavaScript, HTML/CSS, Bootstrap, MongoDB Atlas, Netlify, GitHub

- **Build-Test:**  
  `npm run build` wurde während der Schlussphase wiederholt erfolgreich ausgeführt.

### Quellen

Für den Prototyp wurden verschiedene öffentlich zugängliche Quellen und Testdaten verwendet. Die Daten dienen ausschliesslich dem Zweck des Prototyping-Projekts.

- **Spieler- und Teamdaten:**  
  Die Spielerliste und grundlegende Informationen zur Schweizer Nationalmannschaft wurden anhand öffentlich zugänglicher Informationen von `football.ch` recherchiert.

- **Erweiterte Spielerdaten:**  
  Ergänzende Informationen wie Marktwerte, Grösse, Geburtsdatum, aktueller Club und bevorzugter Fuss wurden anhand öffentlich zugänglicher Informationen von `transfermarkt.ch` recherchiert und für den Prototyp als Testdaten aufbereitet.

- **Resultat- und Spieldaten:**  
  Die im Prototyp verwendeten Spiele, Resultate, Tore und Kartenereignisse dienen als Testdaten zur Darstellung der Funktionalität.


### Assets

- **Spielerbilder:**  
  Ablage im Projekt unter `static/players`. Die Bilder werden im Prototyp zur visuellen Darstellung der Spieler verwendet. Für eine produktive Veröffentlichung müssten die Bildrechte nochmals geprüft oder durch eigene bzw. lizenzfreie Platzhalter ersetzt werden.

- **Flaggen:**  
  Ablage im Projekt unter `static/flags`. Die Flaggen werden zur besseren Erkennbarkeit der Gegner und Teams verwendet.

- **Logos:**  
  Ablage im Projekt unter `static/logo`. Die Logos dienen dem thematischen Branding der App. Für eine produktive Veröffentlichung müsste die Logo-Nutzung rechtlich geprüft werden.

- **Carousel-Bilder:**  
  Ablage im Projekt unter `static/carousel`. Die Bilder werden auf der Startseite zur visuellen Gestaltung verwendet und wurden als prototypische Bildassets für dieses Projekt erstellt.

- **Screenshots:**  
  Ablage im Projekt unter `screenshots`. Die Screenshots dokumentieren Mockups, Skizzen und wichtige Ansichten des Prototyps.

- **Diagramme:**  
  Ablage im Projekt unter `docs`. Dazu gehören Draw.io-kompatible SVG-Dateien und Diagramme für Architektur und User Flow.

### Testskript & Materialien

- **Testaufgaben / Evaluation:**  
  Die Testaufgaben und Beobachtungen sind in Kapitel 3.5 Validate dokumentiert.

- **Skizzen:**  
  Die Crazy-8s-Skizze ist als Screenshot unter `screenshots/skizze-crazy8s.png` abgelegt.

- **Mockup:**  
  Das klickbare Figma-Mockup ist in Kapitel 3.3 Decide verlinkt und mit Screenshots dokumentiert.

### Rohdaten / Auswertung

- **Spielerdaten:**  
  Die Spielerdaten wurden als Testdaten in MongoDB Atlas importiert und in der Collection `players` gespeichert.

- **Spieldaten:**  
  Die Spieldaten werden in der Collection `games` gespeichert.

- **Aufstellungen:**  
  Gespeicherte Matchday-Aufstellungen werden in der Collection `lineups` gespeichert.

- **Evaluation:**  
  Die Auswertung der Usability-Tests ist in Kapitel 3.5 Validate zusammengefasst.

### Hinweis zu Urheberrecht und Nutzung

Die verwendeten Daten und Assets dienen dem Prototyping-Kontext und der Demonstration der Funktionalität. Für eine produktive Veröffentlichung müssten Bildrechte, Logo-Nutzung, Datenquellen und Lizenzen nochmals geprüft und gegebenenfalls durch eigene, lizenzfreie oder offiziell freigegebene Assets ersetzt werden.