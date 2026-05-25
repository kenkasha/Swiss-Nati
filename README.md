# Projektdokumentation - Swiss Nati Matchday Manager

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

Im Rahmen des Prototyping-Projekts wird eine Webanwendung entwickelt, mit der Daten zur Schweizer Fussball-Nationalmannschaft verwaltet werden können. Die Anwendung soll nicht nur eine statische Webseite sein, sondern ein funktionsfähiger Prototyp mit Datenbankanbindung.

- **Problem:** Für die Planung von Spielen und Kadern braucht es eine einfache Übersicht über Spieler, deren Positionen, Vereine und Status sowie über kommende Spiele der Schweizer Nationalmannschaft. Ohne digitale Übersicht müssen solche Informationen manuell gesammelt oder in unterschiedlichen Quellen gesucht werden. Zusätzlich fehlt in einfachen Übersichten oft eine visuelle Darstellung, wie eine mögliche Startelf für ein bestimmtes Spiel aussehen könnte.

- **Ziele:**  
  - Spieler erfassen und anzeigen  
  - Spieler bearbeiten und Detailinformationen anzeigen  
  - Spiele erfassen und anzeigen  
  - Spiele bearbeiten, sofern sie noch nicht vergangen sind  
  - Daten dauerhaft in einer Datenbank speichern  
  - Eine verständliche und einfache Benutzeroberfläche erstellen  
  - Eine online zugängliche Version der App bereitstellen  
  - Eine visuelle Matchday-Aufstellung pro Spiel mit auswählbarer Formation umsetzen  

- **Primäre Zielgruppe:** Personen, die sich für die Schweizer Nationalmannschaft interessieren und eine einfache Übersicht über Spieler und Spiele erstellen möchten. Im Projektkontext kann dies z. B. als Tool für Fans, Trainer:innen oder Organisator:innen verstanden werden.

- **Weitere Stakeholder [Optional]:** Dozierende im Modul Prototyping, Testpersonen für die spätere Evaluation.

## 2. Lösungsidee

Der **Swiss Nati Matchday Manager** ist eine Web-App zur Verwaltung von Spielern und Spielen der Schweizer Nationalmannschaft. Zusätzlich wird eine erste Matchday-Aufstellung angeboten, mit der vorhandene Spieler auf einem Fussballfeld ausgewählt werden können.

- **Kernfunktionalität:**  
  - Spieler anzeigen  
  - Neue Spieler erfassen  
  - Spieler bearbeiten  
  - Spieler-Detailseite mit allen Daten anzeigen  
  - Detailsübersicht aller Spieler anzeigen  
  - Spiele anzeigen  
  - Neue Spiele erfassen  
  - Spiele bearbeiten, solange sie nicht vergangen sind  
  - Daten aus MongoDB laden  
  - Daten über Formulare in MongoDB speichern  
  - Matchday-Aufstellung pro Spiel anzeigen und speichern  
  - Formation pro Spiel auswählen  
  - Spieler positionsbasiert auswählen  
  - verhindern, dass ein Spieler in einer Aufstellung doppelt gewählt wird  
  - Spielerbilder in Übersichten, Details und Aufstellung anzeigen  
  - Bootstrap-Carousel auf der Startseite anzeigen  
  - Online-Verfügbarkeit über Netlify  

- **Annahmen [Optional]:**  
  - Nutzende möchten Spieler und Spiele möglichst schnell erfassen können.  
  - Eine Kartenansicht ist für einen ersten Prototyp verständlicher als eine komplexe Tabelle.  
  - Eine visuelle Aufstellung erhöht den Nutzen der App, weil die Daten nicht nur angezeigt, sondern auch in einem Fussball-Kontext verwendet werden können.  
  - Für einen ersten Prototyp reichen wenige zentrale Felder aus.

- **Abgrenzung [Optional]:**  
  Aktuell enthält der Prototyp noch keine Login-Funktion und keine Rollenverwaltung. Die App ist als fachlicher Prototyp für die Verwaltung von Spielern, Spielen und Matchday-Aufstellungen ausgelegt. Nicht im Fokus stehen Live-Daten, automatische Resultat-Updates, Benutzerkonten oder eine produktive Rechteverwaltung. Spielerbilder werden als visuelle Prototyp-Assets verwendet; für die finale Abgabe müssen Quellen und Nutzungsrechte sauber dokumentiert werden.

## 3. Vorgehen & Artefakte

Die Durchführung erfolgt phasenbasiert; dokumentieren Sie die wichtigsten Ergebnisse je Phase.

### 3.1 Understand & Define

- **Zielgruppenverständnis:**  
  Die Zielgruppe benötigt eine einfache Möglichkeit, Spieler und Spiele der Schweizer Nationalmannschaft zu erfassen und übersichtlich darzustellen. Der Fokus liegt auf einer einfachen Bedienung und einem klaren Hauptworkflow. Zusätzlich ist es für den Fussball-Kontext sinnvoll, eine mögliche Startelf nicht nur als Liste, sondern visuell auf einem Feld darzustellen.

  **Proto-Persona:**  

  | Merkmal | Beschreibung |
  | --- | --- |
  | Name | Luca, 24, Fussballfan und organisatorisch interessierte Person |
  | Ziel | Spiele, Spielerstatus und mögliche Aufstellungen der Schweizer Nationalmannschaft schnell überblicken |
  | Bedürfnisse | einfache Navigation, klare Spielerdaten, schnelle Bearbeitung, visuelle Aufstellung pro Spiel |
  | Frustpunkte | Informationen sind oft verteilt, Änderungen an Position oder Status sind mühsam nachzuführen |
  | Erfolgskriterium | Luca kann ein Spiel planen, passende Spieler auswählen und die Aufstellung später wieder anpassen |

- **Wesentliche Erkenntnisse:**  
  - Die Anwendung soll nicht zu komplex werden.  
  - Die wichtigsten Daten sollen direkt sichtbar sein.  
  - Die App soll einen echten Workflow zeigen: Daten erfassen, speichern und wieder anzeigen.  
  - Eine Datenbankanbindung ist wichtig, damit Daten nicht nur lokal im Browser bestehen bleiben.  
  - Eine visuelle Aufstellungsseite macht den Prototyp greifbarer und stärker auf das Thema Fussball ausgerichtet.  

### 3.2 Sketch

- **Variantenüberblick:**  
  Es wurden mehrere mögliche Projektideen überlegt, z. B. eine reine Spielerübersicht, eine Matchday-Planung oder ein Kaderplaner. Die gewählte Richtung ist eine Kombination aus Spielerverwaltung, Spielverwaltung und einer ersten visuellen Aufstellungsfunktion.

  | Variante | Nutzen | Einschränkung | Entscheid |
  | --- | --- | --- | --- |
  | reine Spielerübersicht | schnell umsetzbar, klare Datenpflege | wenig thematischer Mehrwert | verworfen |
  | reine Spielplanung | Spiele können strukturiert verwaltet werden | Spielerbezug fehlt | verworfen |
  | Kader- und Matchday-Manager | verbindet Spieler, Spiele und Aufstellung | höherer Umsetzungsaufwand | gewählt |

  **Priorisierte Anforderungen:**

  | Priorität | Anforderung | Begründung |
  | --- | --- | --- |
  | Must | Spieler und Spiele erfassen, anzeigen und speichern | entspricht dem Mindestumfang und zeigt den zentralen Datenworkflow |
  | Must | Daten dauerhaft in MongoDB speichern | macht den Prototyp funktionsfähig und nachvollziehbar |
  | Must | App online verfügbar machen | Voraussetzung für Abgabe und Evaluation |
  | Should | Spieler und Spiele bearbeiten | realistische Nutzung, da Status, Positionen und Spieldaten sich ändern |
  | Should | Aufstellung pro Spiel speichern | grosser fachlicher Mehrwert für Matchday-Planung |
  | Should | doppelte Spielerauswahl verhindern | verhindert fachlich falsche Aufstellungen |
  | Could | Bootstrap-Carousel und visuelle Startseite | verbessert Präsentation und Einstieg |
  | Could | Druck-/Exportfunktion für Aufstellungen | mögliche spätere Erweiterung für realistische Weitergabe |

- **Skizzen:**  
  Bisher wurden die Grundseiten konzeptionell skizziert:
  - Startseite / Home
  - Spielerübersicht
  - Spieler erfassen
  - Spieleübersicht
  - Spiel erfassen
  - Matchday-Aufstellung mit Fussballfeld

  Für die finale Dokumentation werden hier später Screenshots, Skizzen oder ein Referenz-Mockup ergänzt.

### 3.3 Decide

- **Gewählte Variante & Begründung:**  
  Gewählt wurde der **Swiss Nati Matchday Manager**, weil die Idee einfach genug für eine realistische Umsetzung ist, aber trotzdem genügend Erweiterungspotenzial bietet. Die App hat einen klaren Nutzen und kann später sinnvoll erweitert werden, z. B. mit Spielerstatus, Formation, Kaderplanung, Spielerbearbeitung oder gespeicherten Aufstellungen.

  **Entscheidungsmatrix:**

  | Entscheidung | Gewählte Lösung | Begründung |
  | --- | --- | --- |
  | Frontend-Framework | SvelteKit | passt zur Modulvorgabe, ermöglicht Routing, Server-Load-Funktionen und Form Actions |
  | Datenbank | MongoDB Atlas | flexible Dokumentstruktur für Spieler, Spiele und Lineups |
  | UI-Basis | Bootstrap | schnelle, responsive Grundgestaltung mit vertrauten Komponenten |
  | Darstellungsform Spieler | Karten plus Detailseite | schnelle Übersicht, aber trotzdem vollständige Daten verfügbar |
  | Aufstellung | eigenes Fussballfeld-Layout | fachlich passender als eine reine Tabelle |
  | Speicherung der Aufstellung | pro Spiel | realistisch, da jedes Spiel eine andere Formation und Besetzung haben kann |
  | Validierung | Client- und serverseitig | bessere Bedienbarkeit und Schutz vor fachlich ungültigen Daten |

- **End-to-End-Ablauf:**  
  1. Nutzer:in öffnet die App.  
  2. Nutzer:in navigiert zur Spielerübersicht oder Spieleübersicht.  
  3. Nutzer:in klickt auf „Neuer Spieler“ oder „Neues Spiel“.  
  4. Nutzer:in füllt das Formular aus.  
  5. Die Daten werden in MongoDB gespeichert.  
  6. Die neuen Daten erscheinen in der Übersicht.  
  7. Nutzer:in öffnet die Seite „Aufstellung“.  
  8. Nutzer:in wählt ein Spiel und eine passende Formation aus.  
  9. Nutzer:in wählt vorhandene Spieler positionsbasiert für die Positionen auf dem Fussballfeld aus.  
  10. Die ausgewählten Spieler werden visuell mit Bild und Name in der Aufstellung dargestellt.  
  11. Die Aufstellung wird spielbezogen gespeichert und kann später wieder angepasst werden.

  ```mermaid
  flowchart LR
      A[Home] --> B[Spieler verwalten]
      A --> C[Spiele planen]
      A --> D[Aufstellung öffnen]
      B --> E[Spieler erfassen oder bearbeiten]
      C --> F[Spiel erstellen oder bearbeiten]
      D --> G[Spiel auswählen]
      G --> H[Formation wählen]
      H --> I[Spieler positionsbasiert zuweisen]
      I --> J[Aufstellung speichern]
  ```

- **Mockup:**  
  Für die aktuelle Zwischenabgabe wurde zuerst ein funktionsfähiger Prototyp umgesetzt. Ein detaillierteres Referenz-Mockup wird für die finale Dokumentation ergänzt.

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)

Beschreibt die Gestaltung und Interaktion.

> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.

- **Informationsarchitektur:**  
  Die App besteht aktuell aus folgenden Hauptbereichen:
  - Home
  - Spieler
  - Spieler-Details
  - Spieler-Detailsübersicht
  - Spieler erstellen
  - Spieler bearbeiten
  - Spiele
  - Spiel erstellen
  - Spiel bearbeiten
  - Aufstellung
  - Game

- **User Interface Design:**  
  Die Oberfläche verwendet eine einfache Navigation und Bootstrap-Komponenten. Spieler und Spiele werden als Karten dargestellt. Dadurch sind die wichtigsten Informationen schnell sichtbar. Die Startseite nutzt ein automatisches Bootstrap-Carousel und klickbare Einstiegskarten zu den wichtigsten Workflows. Die Aufstellungsseite verwendet ein eigenes Fussballfeld-Layout mit positionsabhängigen Dropdown-Feldern, Spielerbildern und Formationsauswahl.

- **Designentscheidungen:**  
  - Kartenlayout statt Tabelle, weil es für einen ersten Prototyp übersichtlicher wirkt.  
  - Bootstrap wurde verwendet, um schnell ein responsives und einheitliches Layout umzusetzen.  
  - Formulare sind bewusst einfach gehalten, damit der Workflow klar bleibt.  
  - Die Navigation enthält nur die wichtigsten Seiten.  
  - Die Startseite bietet direkte, anklickbare Einstiege in Spieler, Spiele und Aufstellung.  
  - Für die Aufstellung wurde ein eigenes CSS-Stylesheet erstellt, damit das Fussballfeld visuell eigenständig gestaltet werden kann.  
  - Spielerbilder werden in der Aufstellung klein und rund dargestellt, damit die Auswahl visuell besser erkennbar ist.  
  - Vergangene Spiele werden dunkler markiert und können nicht mehr bearbeitet werden, damit der Status eines Spiels klar erkennbar ist.

#### 3.4.2. Umsetzung (Technik)

Fasst die technische Realisierung zusammen.

- **Technologie-Stack:**  
  - SvelteKit  
  - JavaScript  
  - HTML / CSS  
  - Bootstrap  
  - MongoDB Atlas  
  - Netlify  
  - Git / GitHub  

- **Tooling:**  
  - Visual Studio Code  
  - GitHub Repository  
  - Netlify Deployment  
  - MongoDB Atlas / MongoDB Compass  
  - ChatGPT als Unterstützung bei Planung, Fehleranalyse, Code-Erklärung und Dokumentationsentwurf  

- **Struktur & Komponenten:**  
  Wichtige Routen und Dateien:
  - `src/routes/+layout.svelte` für Layout und Navigation
  - `src/routes/+page.svelte` für die Startseite
  - `src/routes/players/+page.svelte` für die Spielerübersicht
  - `src/routes/players/+page.server.js` zum Laden der Spieler
  - `src/routes/players/create/+page.svelte` für das Spielerformular
  - `src/routes/players/create/+page.server.js` zum Speichern neuer Spieler
  - `src/routes/players/[id]/details/+page.svelte` für die Detailseite eines Spielers
  - `src/routes/players/[id]/edit/+page.svelte` für das Bearbeiten eines Spielers
  - `src/routes/players/overview/+page.svelte` für die tabellarische Detailsübersicht
  - `src/routes/games/+page.svelte` für die Spieleübersicht
  - `src/routes/games/+page.server.js` zum Laden der Spiele
  - `src/routes/games/create/+page.svelte` für das Spielformular
  - `src/routes/games/create/+page.server.js` zum Speichern neuer Spiele
  - `src/routes/games/[id]/edit/+page.svelte` für das Bearbeiten künftiger Spiele
  - `src/routes/lineup/+page.svelte` für die Matchday-Aufstellung
  - `src/routes/lineup/+page.server.js` zum Laden von Spielern, Spielen und gespeicherten Aufstellungen
  - `src/routes/lineup/lineup.css` für das Fussballfeld-Design
  - `src/routes/game/+page.svelte` als leere zusätzliche Navigationsseite
  - `src/lib/server/db.js` für die Datenbankfunktionen
  - `static/players` für Spielerbilder
  - `static/carousel` für Bilder des Bootstrap-Carousels

- **Daten & Schnittstellen:**  
  Die Daten werden in MongoDB Atlas gespeichert. Es gibt aktuell drei zentrale Collections:
  - `players`
  - `games`
  - `lineups`

  Über SvelteKit `load`-Funktionen werden die Daten geladen. Über Form Actions werden neue Datensätze erstellt oder bestehende Datensätze aktualisiert und in MongoDB gespeichert. Die Aufstellungsseite lädt vorhandene Spieler und Spiele aus der Datenbank, speichert die Aufstellung pro Spiel und prüft zusätzlich serverseitig, dass ein Spieler nicht doppelt in derselben Aufstellung vorkommt.

  | Collection | Zweck | Beispiele für Daten |
  | --- | --- | --- |
  | `players` | Verwaltung der Spielerdaten | Name, Position, Club, Status, Marktwert |
  | `games` | Verwaltung der Spiele | Gegner, Datum, Ort, Wettbewerb |
  | `lineups` | Speicherung der Aufstellungen pro Spiel | Spiel-ID, Formation, gewählte Spieler pro Position |

- **Deployment:**  
  Online-Version: https://swiss-nati-matchday-manager.netlify.app

- **Besondere Entscheidungen:**  
  Die Umgebungsvariable `DB_URI` wird nicht im GitHub Repository gespeichert, sondern lokal in `.env` und online in Netlify als Environment Variable hinterlegt. Dadurch werden Datenbankzugangsdaten nicht öffentlich gemacht. Für die Aufstellung wurde bewusst eine spielbezogene Speicherung umgesetzt, weil Aufstellungen je nach Gegner, Datum und Formation variieren. Zusätzlich werden Positionsänderungen von Spielern mit der Aufstellungslogik synchronisiert, damit veraltete Auswahlen nicht bestehen bleiben.

### 3.5 Validate

- **URL der getesteten Version:**  
  https://swiss-nati-matchday-manager.netlify.app

- **Ziele der Prüfung:**  
  In der späteren Evaluation soll geprüft werden:
  - Verstehen Nutzende die Navigation?
  - Können Nutzende einen Spieler erfassen?
  - Können Nutzende ein Spiel erfassen?
  - Können Nutzende Spieler und Spiele bearbeiten?
  - Sind die angezeigten Informationen verständlich?
  - Finden Nutzende die Spieler-Detailseite und die Detailsübersicht?
  - Ist die Matchday-Aufstellung pro Spiel als Funktion verständlich?
  - Ist klar, weshalb vergangene Spiele nicht mehr bearbeitet werden können?
  - Sind Spielerbilder, Formationen und positionsabhängige Auswahl hilfreich?

- **Vorgehen:**  
  Geplant ist ein kurzer moderierter Test mit 2 bis 3 Personen. Die Testpersonen sollen typische Aufgaben direkt in der App durchführen.

- **Stichprobe:**  
  Das Testing wurden mit zwei Studierenden aus durchgeführt.

- **Aufgaben/Szenarien:**  
Zuerst soll sie die App öffnen und sich in der Navigation orientieren, indem sie die Spielerübersicht 
findet. Anschliessend soll sie zwei neue Spieler erfassen und überprüfen, ob diese korrekt in der 
Spielerübersicht angezeigt werden. Danach soll sie ein neues Spiel erstellen und kontrollieren, ob 
dieses in der Spieleübersicht erscheint. Als Erweiterung wird zusätzlich die Aufstellungsseite getestet: 
Die Testperson soll die Seite „Aufstellung“ öffnen, ein Spiel auswählen, eine Formation ändern und mindestens drei Spieler verschiedenen 
Positionen auf dem Fussballfeld zuweisen. Zusätzlich soll geprüft werden, ob ein Spieler doppelt gewählt werden kann und ob vergangene Spiele in der Spieleübersicht verständlich markiert sind. Zum Abschluss wird die Testperson gefragt, welche 
Funktionen ihr noch fehlen, was unklar war und ob sie Schwierigkeiten bei der Bedienung hatte. 

- **Kennzahlen & Beobachtungen:**  
  Noch nicht formell durchgeführt. Für die finale Evaluation sollen Erfolgsquote, beobachtete Schwierigkeiten und qualitative Rückmeldungen dokumentiert werden.

  | Testaufgabe | Erfolgskriterium | Beobachtung | Mögliche Verbesserung |
  | --- | --- | --- | --- |
  | Spieler erfassen | Spieler erscheint danach in der Spielerliste | noch final zu testen | Formularhinweise präzisieren, falls Felder unklar sind |
  | Spieler bearbeiten | geänderte Position oder Status ist sichtbar | noch final zu testen | Synchronisation mit Aufstellung prüfen |
  | Spiel erfassen | Spiel erscheint in der Spieleübersicht | noch final zu testen | Datum und Wettbewerb klar beschriften |
  | vergangenes Spiel prüfen | Bearbeiten ist nicht möglich und Status ist erkennbar | noch final zu testen | Markierung bei Bedarf deutlicher gestalten |
  | Aufstellung erstellen | Spiel, Formation und Spieler können ausgewählt und gespeichert werden | noch final zu testen | Positionskarten bei kleinen Bildschirmen optimieren |
  | doppelte Spielerauswahl testen | derselbe Spieler kann nicht mehrfach gewählt werden | noch final zu testen | Fehlermeldung oder Auswahlhinweis ergänzen |

- **Zusammenfassung der Resultate:**  
  Noch nicht formell durchgeführt. Erste eigene Tests zeigen, dass die Grundworkflows funktionieren: Spieler und Spiele können online erstellt und angezeigt werden. Die Aufstellungsseite lädt vorhandene Spieler und erlaubt eine visuelle Auswahl auf dem Fussballfeld.

- **Abgeleitete Verbesserungen:**  
  Mögliche Verbesserungen für die nächste Iteration:
  - Evaluation formal durchführen und Resultate mit Kennzahlen dokumentieren
  - Screenshots der finalen Workflows ergänzen
  - Quellen und Nutzungsrechte der Spielerbilder prüfen und dokumentieren
  - Video-Walkthrough vorbereiten
  - optional Export- oder Druckfunktion für Aufstellungen ergänzen
  - optional Such- und Filterfunktionen in der Detailsübersicht ausbauen

## 4. Erweiterungen [Optional]

Dokumentiert Erweiterungen über den Mindestumfang hinaus.

> **Hinweis:** Jede Erweiterung ist separat nach dem folgenden Schema zu beschreiben.

### 4.1 Matchday-Aufstellung mit Fussballfeld

- **Beschreibung & Nutzen:**  
  Zusätzlich zur Spieler- und Spielverwaltung wurde eine visuelle Matchday-Aufstellung umgesetzt. Auf einer eigenen Seite können vorhandene Spieler aus der Datenbank über Dropdowns auf Positionen eines Fussballfelds verteilt werden. Die Aufstellung ist pro Spiel gespeichert, unterstützt mehrere Formationen und verhindert doppelte Spieler-Auswahlen. Dadurch wird der Prototyp stärker auf den Fussball-Kontext ausgerichtet und bietet mehr Nutzen als eine reine Datenliste.

- **Wo umgesetzt:**  
  - **Frontend:** `src/routes/lineup/+page.svelte`  
  - **Backend / Datenladen:** `src/routes/lineup/+page.server.js` lädt Spieler, Spiele und gespeicherte Lineups  
  - **Styling:** `src/routes/lineup/lineup.css` enthält das Fussballfeld-Layout, Positionen, Linien und Spielerbild-Darstellung  
  - **Assets:** Spielerbilder liegen in `static/players`  
  - **Datenbank:** Die Spieler stammen aus `players`, Spiele aus `games`, Aufstellungen aus `lineups`  

- **Referenz:**  
  Die Erweiterung ist in der App unter `/lineup` bzw. über den Navigationspunkt „Aufstellung“ sichtbar.

- **Aus Evaluation abgeleitet?:**  
  Noch nicht aus einer formellen Evaluation abgeleitet. Die Erweiterung wurde als thematisch passende Vertiefung umgesetzt, damit die App nicht nur Daten verwaltet, sondern auch einen konkreten Matchday-Workflow unterstützt.

### 4.2 Eigenes Stylesheet für die Aufstellungsansicht

- **Beschreibung & Nutzen:**  
  Für die Aufstellungsseite wurde ein eigenes Stylesheet erstellt. Dadurch ist die Gestaltung des Fussballfelds von der übrigen App-Struktur getrennt und kann später einfacher angepasst werden. Das verbessert die Übersichtlichkeit im Code und unterstützt eine saubere Projektstruktur.

- **Wo umgesetzt:**  
  - **Frontend / Styling:** `src/routes/lineup/lineup.css`  
  - **Import:** Das Stylesheet wird in `src/routes/lineup/+page.svelte` importiert  

- **Referenz:**  
  Sichtbar auf der Seite „Aufstellung“, insbesondere durch das grüne Fussballfeld, Linien, Positionskarten und Spielerbilder.

- **Aus Evaluation abgeleitet?:**  
  Nein. Die Umsetzung basiert auf einer technischen und gestalterischen Entscheidung, um die Erweiterung klar vom restlichen Layout zu trennen.

### 4.3 Spieler-Details, Bearbeitung und Detailsübersicht

- **Beschreibung & Nutzen:**  
  Die Spielerübersicht zeigt bewusst nur die wichtigsten Informationen: Name, Position und Bild. Über den Button „Details“ öffnet sich eine Unterseite mit allen gespeicherten Daten. Zusätzlich gibt es eine Detailsübersicht aller Spieler. Spieler können bearbeitet werden, inklusive Status, Position und Marktwert. Dadurch bleibt die Hauptübersicht ruhig, während Detailinformationen trotzdem vollständig verfügbar sind.

- **Wo umgesetzt:**  
  - `src/routes/players/+page.svelte`
  - `src/routes/players/[id]/details/+page.svelte`
  - `src/routes/players/[id]/edit/+page.svelte`
  - `src/routes/players/overview/+page.svelte`
  - `src/lib/server/db.js`

- **Aus Evaluation abgeleitet?:**  
  Teilweise aus iterativer Nutzung des Prototyps: Die ursprüngliche Spielerkarte war mit vielen Daten überladen. Durch Details und Übersicht werden Schnellansicht und vollständige Datenansicht getrennt.

### 4.4 Spielbearbeitung mit Schutz vergangener Spiele

- **Beschreibung & Nutzen:**  
  Spiele können bearbeitet werden, solange sie noch nicht vergangen sind. Vergangene Spiele werden dunkler markiert und können nicht mehr bearbeitet werden. Dadurch bleibt die Datenlogik plausibel: Bereits ausgetragene Spiele sollen nicht wie zukünftige Planungsdaten behandelt werden.

- **Wo umgesetzt:**  
  - `src/routes/games/+page.svelte`
  - `src/routes/games/[id]/edit/+page.svelte`
  - `src/routes/games/[id]/edit/+page.server.js`

- **Aus Evaluation abgeleitet?:**  
  Diese Erweiterung entstand aus der fachlichen Überlegung, dass vergangene und zukünftige Spiele unterschiedlich behandelt werden müssen.

### 4.5 Bootstrap-Carousel und klickbare Startseiten-Workflows

- **Beschreibung & Nutzen:**  
  Auf der Startseite wurde ein automatisches Bootstrap-Carousel ergänzt. Zusätzlich sind die drei wichtigsten Workflow-Karten vollständig anklickbar: Spieler verwalten, Spiele planen und Kader aufstellen. Dadurch wirkt die Startseite stärker wie ein nutzbarer Einstiegspunkt und führt schneller zu den zentralen Funktionen.

- **Wo umgesetzt:**  
  - `src/routes/+page.svelte`
  - `static/carousel`

- **Aus Evaluation abgeleitet?:**  
  Die Anpassung unterstützt Bedienbarkeit und Präsentation im Video-Walkthrough. Für die finale Abgabe können Screenshots dieser Startseite in die Dokumentation übernommen werden.

### 4.6 Filter- und Sortierfunktion in der Detailsübersicht

- **Beschreibung & Nutzen:**  
  In der Spieler-Detailsübersicht können die Daten direkt über kleine Dropdowns in den Tabellenköpfen gefiltert und sortiert werden, ähnlich wie in Excel. So können z. B. nur fitte Spieler, verletzte Spieler oder Rechtsfüssler angezeigt werden. Zusätzlich kann nach Namen, Grösse, Geburtsdatum oder Marktwert sortiert werden. Dadurch wird die Übersicht bei vielen Spielern besser nutzbar und unterstützt typische Fragen wie „Wer ist fit?“ oder „Welche Rechtsfüssler stehen zur Verfügung?“.

- **Wo umgesetzt:**  
  - **Frontend:** `src/routes/players/overview/+page.svelte`
  - **Logik:** clientseitige Filterung und Sortierung auf Basis der geladenen Spielerdaten

- **Referenz:**  
  Sichtbar unter dem Navigationspunkt Spieler > Detailsübersicht.

- **Aus Evaluation abgeleitet?:**  
  Die Erweiterung basiert auf der Beobachtung, dass eine vollständige Tabelle mit allen Spielerdaten bei zunehmender Datenmenge schwerer zu durchsuchen ist. Filter und Sortierung verbessern deshalb Bedienbarkeit und Übersichtlichkeit.

### 4.7 Penalty Game

- **Beschreibung & Nutzen:**  
  Auf der Game-Seite wurde ein kleines Penalty-Spiel umgesetzt. Nutzende wählen einen Feldspieler als Schützen aus. Im Tor steht automatisch ein Spieler mit Position `Goalie`. Der Zielpunkt folgt der Maus im Tor; per Klick wird genau dorthin geschossen. Der Goalie bewegt sich im Leerlauf seitlich im Tor und reagiert beim Schuss automatisch aus seiner aktuellen Position heraus. Zusätzlich wurde die Szene als Pseudo-3D-Ansicht gestaltet: Spielfeld mit Perspektive, animierte CSS-Schützenfigur, sichtbarer Anlauf zum Ball, Startball am Elfmeterpunkt, perspektivisch grösserer Ballstart, sichtbarer Ballflug zur angeklickten Torstelle und Goalie-Bewegung. Nach jedem Schuss kehrt der Ball automatisch zum Elfmeterpunkt zurück. Das Spiel zeigt Tore, Paraden und Versuche an. Dadurch wird die App spielerischer und nutzt die vorhandenen Spielerdaten in einem interaktiven Kontext.

- **Wo umgesetzt:**  
  - **Frontend:** `src/routes/game/+page.svelte`
  - **Datenladen:** `src/routes/game/+page.server.js`
  - **Datenbasis:** Spieler aus der MongoDB-Collection `players`; Goalies werden über die Position `Goalie` erkannt

- **Referenz:**  
  Sichtbar über den Navigationspunkt `Game`.

- **Aus Evaluation abgeleitet?:**  
  Nein. Die Erweiterung wurde als zusätzliche, thematisch passende Produktfunktion ergänzt, um den Prototyp interaktiver zu machen und bestehende Daten kreativ weiterzuverwenden.

## 5. Projektorganisation [Optional]

- **Repository & Struktur:**  
  GitHub Repository: https://github.com/kenkasha/Swiss-Nati

- **Issue-Management:**  
  Für die finale Projektphase wird GitHub Issues als einfaches Issue-Management genutzt. Damit werden offene Aufgaben sichtbar gemacht und der Fortschritt vor der Abgabe nachvollziehbar dokumentiert. Die Issues sind bewusst auf abgaberelevante Punkte ausgerichtet:

  | Issue | Status | Zweck |
  | --- | --- | --- |
  | Evaluation mit Testpersonen durchführen | geschlossen | dokumentiert, dass die Evaluation als eigener Arbeitsschritt geplant und erledigt wurde |
  | Video-Walkthrough vorbereiten | offen | stellt sicher, dass alle zentralen Workflows im Abgabevideo gezeigt werden |
  | README finalisieren | offen | bündelt finale Dokumentationsarbeiten |
  | Bildquellen prüfen | offen | unterstützt die Einhaltung von Urheberrecht und Quellenangaben |
  | Screenshots in README ergänzen | offen | verbessert Nachvollziehbarkeit und visuelle Dokumentation |

- **Commit-Praxis:**  
  Es wurden mehrere Commits erstellt, z. B. für den initialen Projektstand, die Vorbereitung des Netlify Deployments, README-Anpassungen, Spieler- und Spielefunktionen sowie die Aufstellungs-Erweiterung. Für die weitere Entwicklung sollen weiterhin sprechende Commit Messages verwendet werden.

- **Deployment-Prozess:**  
  Die App ist über Netlify mit dem GitHub Repository verbunden. Nach einem Push auf den `main` Branch wird die App automatisch neu deployed. Die MongoDB-Verbindung wird über die Environment Variable `DB_URI` in Netlify bereitgestellt.

## 6. KI-Deklaration

Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt.

### 6.1 KI-Tools

- **Eingesetzte Tools:**  
  ChatGPT wurde als Unterstützung im Projekt eingesetzt. Zusätzlich wurde eine Claude-Erweiterung in Visual Studio Code installiert bzw. geprüft, die aktuelle Umsetzung wurde jedoch hauptsächlich mit Unterstützung von ChatGPT und eigener Umsetzung in VS Code erstellt.

- **Zweck & Umfang:**  
  ChatGPT wurde verwendet für:
  - Erklärung von SvelteKit-Konzepten
  - Unterstützung beim Aufbau der Projektstruktur
  - Hilfe bei MongoDB-Anbindung
  - Unterstützung beim Deployment mit Netlify
  - Fehleranalyse
  - Formulierungshilfe für die Projektdokumentation
  - Planung möglicher Erweiterungen
  - Unterstützung bei der Umsetzung der Matchday-Aufstellung
  - Unterstützung bei der Umsetzung von Spieler-Details, Spielbearbeitung, Validierungen und Bootstrap-Elementen
  - Unterstützung bei der fortlaufenden Aktualisierung der Projektdokumentation
  - Erklärung von GitHub-, Commit- und Sync-Abläufen

- **Eigene Leistung (Abgrenzung):**  
  Die Entscheidungen zur Projektidee, zur finalen Umsetzung, zur Auswahl der Funktionen und zur Abgabe liegen bei mir. Der Code wurde mit Unterstützung erstellt, von mir übernommen, angepasst, getestet und in der App eingesetzt. Die Verantwortung für Korrektheit, Funktionsfähigkeit und Dokumentation liegt bei mir.

### 6.2 Prompt-Vorgehen

Beim Einsatz von ChatGPT wurde schrittweise gearbeitet. Zuerst wurden Anforderungen und Projektidee besprochen. Danach wurden konkrete technische Schritte abgefragt, z. B. wie Routen, Formulare, Datenbankfunktionen oder das Deployment umgesetzt werden können. Die Antworten wurden jeweils geprüft, in VS Code umgesetzt und im Browser getestet. Bei Fehlermeldungen wurden Screenshots oder Codeausschnitte verwendet, um gezielt Hilfe zur Fehlerbehebung zu erhalten.

Für die Erweiterung der Matchday-Aufstellung wurde ebenfalls iterativ vorgegangen: Zuerst wurde die Idee eingegrenzt, danach wurden Route, Server-Load-Funktion, Svelte-Seite und CSS schrittweise umgesetzt und getestet. Probleme mit Bildpfaden und Bildgrösse wurden durch Anpassungen der Projektstruktur und CSS-Regeln behoben.

Spätere Erweiterungen wurden ebenfalls schrittweise umgesetzt: Zuerst wurde jeweils das gewünschte Verhalten beschrieben, danach wurden bestehende Dateien geprüft, die Änderung eingebaut und anschliessend im Browser bzw. über den Build geprüft. Dadurch entstand ein iterativer Workflow, bei dem die App und die Dokumentation laufend an den aktuellen Stand angepasst wurden.

**KI-Agenten-Workflow im Projekt:**

| Schritt | Vorgehen | Qualitätssicherung |
| --- | --- | --- |
| 1. Problem beschreiben | Anforderungen oder beobachtete Fehler wurden in natürlicher Sprache beschrieben, oft ergänzt durch Screenshots | Ziel und erwartetes Verhalten wurden jeweils konkret formuliert |
| 2. Kontext prüfen | Bestehende Dateien, Routen und Datenbankfunktionen wurden vor Änderungen gelesen | Änderungen sollten zum bestehenden Code-Stil passen |
| 3. Umsetzung planen | Mögliche Lösung wurde in kleine Schritte zerlegt | grössere Änderungen wurden bewusst iterativ umgesetzt |
| 4. Code anpassen | Änderungen wurden direkt im Projekt umgesetzt | bestehende Funktionen sollten nicht unnötig verändert werden |
| 5. Testen | App wurde im Browser geprüft; zusätzlich wurde der Build verwendet, wenn technische Sicherheit nötig war | Fehlermeldungen und visuelle Probleme wurden erneut analysiert |
| 6. Dokumentieren | README wurde nach grösseren Features aktualisiert | Dokumentation bleibt mit dem Prototyp synchron |

Die KI wurde damit als Pair-Programming- und Reflexionshilfe genutzt. Vorschläge wurden nicht ungeprüft übernommen, sondern im Projektkontext kontrolliert, angepasst und getestet. Besonders hilfreich war die Kombination aus Screenshots, konkreten Fehlermeldungen und gezielten Änderungswünschen, weil dadurch UI-Probleme und technische Fehler genauer eingegrenzt werden konnten.

### 6.3 Reflexion

Der KI-Einsatz war hilfreich, weil komplexe technische Schritte in kleinere Einzelschritte zerlegt wurden. Besonders beim Einstieg in SvelteKit, MongoDB, GitHub und Netlify war dies unterstützend. Gleichzeitig mussten die Vorschläge überprüft werden, da die Verantwortung für die korrekte Umsetzung nicht bei der KI liegt. Wichtig war deshalb, jeden Schritt selbst zu testen und die Funktionsweise zu verstehen.

Ein Risiko beim KI-Einsatz ist, dass Code übernommen wird, ohne ihn ausreichend zu verstehen. Deshalb wurde der Code schrittweise eingefügt, im Browser getestet und bei Fehlern angepasst. Für die finale Abgabe muss zusätzlich geprüft werden, dass verwendete Bilder und Assets rechtlich korrekt verwendet oder durch eigene bzw. lizenzfreie Assets ersetzt werden.

## 7. Anhang [Optional]

- **Online-Version:** https://swiss-nati-matchday-manager.netlify.app
- **GitHub Repository:** https://github.com/kenkasha/Swiss-Nati
- **Verwendete Technologien:** SvelteKit, Bootstrap, MongoDB Atlas, Netlify, GitHub
- **Aktueller Stand:** Fortgeschrittener Prototyp mit Spieler-, Spiele-, Detail-, Bearbeitungs- und Aufstellungsfunktionen
- **Hinweis zu Spielerbildern:** Die aktuell verwendeten Spielerbilder dienen im Prototyp als visuelle Test-Assets. Für die finale Abgabe müssen Quellen, Nutzungsrechte und Urheberrecht geprüft und dokumentiert oder die Bilder durch eigene bzw. lizenzfreie Platzhalter ersetzt werden.

**Offene Punkte vor der finalen Abgabe:**

- Evaluation mit 2 bis 3 Testpersonen vollständig durchführen
- Beobachtungen, Kennzahlen und konkrete Verbesserungen dokumentieren
- Screenshots der finalen App in der Dokumentation ergänzen
- Bildquellen und Nutzungsrechte prüfen und dokumentieren
- Deployment-Link nach finalem Push nochmals testen
- Video-Walkthrough vorbereiten und alle zentralen Workflows zeigen
- KI-Einsatz final prüfen und vollständig deklarieren

**Fortlaufendes Änderungsprotokoll:**

- Spielerübersicht vereinfacht: Name, Position, Bild und Details-Button
- Spieler-Detailseiten und Detailsübersicht ergänzt
- Spielerbearbeitung erweitert, inklusive Marktwert
- Spielererfassung um zusätzliche Datenfelder erweitert
- Spielebearbeitung ergänzt und für vergangene Spiele gesperrt
- Vergangene Spiele visuell dunkler markiert
- Aufstellung pro Spiel speicherbar gemacht
- Formationsauswahl pro Spiel ergänzt
- Positionsbasierte Spielerauswahl umgesetzt
- Doppelte Spielerauswahl in der Aufstellung verhindert
- Spielerbilder in Übersicht, Details und Aufstellung integriert
- Bootstrap-Carousel auf der Startseite ergänzt
- Startseitenkarten als klickbare Workflows umgesetzt
- Filter- und Sortierfunktion in der Spieler-Detailsübersicht ergänzt
- Penalty Game mit Schützenwahl, beweglichem automatischem Goalie, Pseudo-3D-Animation, CSS-Schützenfigur, Anlaufanimation, sichtbarem Ballflug, automatischer Ballrückkehr und Punkteanzeige ergänzt
