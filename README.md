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

- **Problem:** Für die Planung von Spielen und Kadern braucht es eine einfache Übersicht über Spieler, deren Positionen, Vereine und Status sowie über kommende Spiele der Schweizer Nationalmannschaft. Ohne digitale Übersicht müssen solche Informationen manuell gesammelt oder in unterschiedlichen Quellen gesucht werden.
- **Ziele:**  
  - Spieler erfassen und anzeigen  
  - Spiele erfassen und anzeigen  
  - Daten dauerhaft in einer Datenbank speichern  
  - Eine verständliche und einfache Benutzeroberfläche erstellen  
  - Eine online zugängliche Version der App bereitstellen  
- **Primäre Zielgruppe:** Personen, die sich für die Schweizer Nationalmannschaft interessieren und eine einfache Übersicht über Spieler und Spiele erstellen möchten. Im Projektkontext kann dies z. B. als Tool für Fans, Trainer:innen oder Organisator:innen verstanden werden.
- **Weitere Stakeholder [Optional]:** Dozierende im Modul Prototyping, Testpersonen für die spätere Evaluation.

## 2. Lösungsidee

Der **Swiss Nati Matchday Manager** ist eine kleine Web-App zur Verwaltung von Spielern und Spielen der Schweizer Nationalmannschaft.

- **Kernfunktionalität:**  
  - Spieler anzeigen  
  - Neue Spieler erfassen  
  - Spiele anzeigen  
  - Neue Spiele erfassen  
  - Daten aus MongoDB laden  
  - Daten über Formulare in MongoDB speichern  
  - Online-Verfügbarkeit über Netlify  

- **Annahmen [Optional]:**  
  - Nutzende möchten Spieler und Spiele möglichst schnell erfassen können.  
  - Eine Kartenansicht ist für einen ersten Prototyp verständlicher als eine komplexe Tabelle.  
  - Für einen ersten Prototyp reichen wenige zentrale Felder aus.

- **Abgrenzung [Optional]:**  
  Aktuell enthält der Prototyp noch keine Login-Funktion, keine Rollenverwaltung und keine vollständige Kaderplanung. Funktionen wie Spieler bearbeiten, Spielerbilder, Rückennummern oder eine visuelle Aufstellung sind mögliche Erweiterungen für die finale Abgabe.

## 3. Vorgehen & Artefakte

Die Durchführung erfolgt phasenbasiert; dokumentieren Sie die wichtigsten Ergebnisse je Phase.

### 3.1 Understand & Define

- **Zielgruppenverständnis:**  
  Die Zielgruppe benötigt eine einfache Möglichkeit, Spieler und Spiele der Schweizer Nationalmannschaft zu erfassen und übersichtlich darzustellen. Der Fokus liegt auf einer einfachen Bedienung und einem klaren Hauptworkflow.

- **Wesentliche Erkenntnisse:**  
  - Die Anwendung soll nicht zu komplex werden.  
  - Die wichtigsten Daten sollen direkt sichtbar sein.  
  - Die App soll einen echten Workflow zeigen: Daten erfassen, speichern und wieder anzeigen.  
  - Eine Datenbankanbindung ist wichtig, damit Daten nicht nur lokal im Browser bestehen bleiben.

### 3.2 Sketch

- **Variantenüberblick:**  
  Es wurden mehrere mögliche Projektideen überlegt, z. B. eine reine Spielerübersicht, eine Matchday-Planung oder ein Kaderplaner. Die gewählte Richtung ist eine Kombination aus Spieler- und Spielverwaltung.

- **Skizzen:**  
  Bisher wurden die Grundseiten konzeptionell skizziert:
  - Startseite / Home
  - Spielerübersicht
  - Spieler erfassen
  - Spieleübersicht
  - Spiel erfassen

  Für die finale Dokumentation werden hier später Screenshots oder Skizzen ergänzt.

### 3.3 Decide

- **Gewählte Variante & Begründung:**  
  Gewählt wurde der **Swiss Nati Matchday Manager**, weil die Idee einfach genug für eine realistische Umsetzung ist, aber trotzdem genügend Erweiterungspotenzial bietet. Die App hat einen klaren Nutzen und kann später sinnvoll erweitert werden, z. B. mit Spielerstatus, Formation, Kaderplanung oder Bearbeitungsfunktionen.

- **End-to-End-Ablauf:**  
  1. Nutzer:in öffnet die App.  
  2. Nutzer:in navigiert zur Spielerübersicht oder Spieleübersicht.  
  3. Nutzer:in klickt auf „Neuer Spieler“ oder „Neues Spiel“.  
  4. Nutzer:in füllt das Formular aus.  
  5. Die Daten werden in MongoDB gespeichert.  
  6. Die neuen Daten erscheinen in der Übersicht.

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
  - Spieler erstellen
  - Spiele
  - Spiel erstellen

- **User Interface Design:**  
  Die Oberfläche verwendet eine einfache Navigation und Bootstrap-Komponenten. Spieler und Spiele werden als Karten dargestellt. Dadurch sind die wichtigsten Informationen schnell sichtbar.

- **Designentscheidungen:**  
  - Kartenlayout statt Tabelle, weil es für einen ersten Prototyp übersichtlicher wirkt.  
  - Bootstrap wurde verwendet, um schnell ein responsives und einheitliches Layout umzusetzen.  
  - Formulare sind bewusst einfach gehalten, damit der Workflow klar bleibt.  
  - Die Navigation enthält nur die wichtigsten Seiten.

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
  - `src/routes/games/+page.svelte` für die Spieleübersicht
  - `src/routes/games/+page.server.js` zum Laden der Spiele
  - `src/routes/games/create/+page.svelte` für das Spielformular
  - `src/routes/games/create/+page.server.js` zum Speichern neuer Spiele
  - `src/lib/server/db.js` für die Datenbankfunktionen

- **Daten & Schnittstellen:**  
  Die Daten werden in MongoDB Atlas gespeichert. Es gibt aktuell zwei Collections:
  - `players`
  - `games`

  Über SvelteKit `load`-Funktionen werden die Daten geladen. Über Form Actions werden neue Datensätze erstellt und in MongoDB gespeichert.

- **Deployment:**  
  Online-Version: https://swiss-nati-matchday-manager.netlify.app

- **Besondere Entscheidungen:**  
  Die Umgebungsvariable `DB_URI` wird nicht im GitHub Repository gespeichert, sondern lokal in `.env` und online in Netlify als Environment Variable hinterlegt. Dadurch werden Datenbankzugangsdaten nicht öffentlich gemacht.

### 3.5 Validate

- **URL der getesteten Version:**  
  https://swiss-nati-matchday-manager.netlify.app

- **Ziele der Prüfung:**  
  In der späteren Evaluation soll geprüft werden:
  - Verstehen Nutzende die Navigation?
  - Können Nutzende einen Spieler erfassen?
  - Können Nutzende ein Spiel erfassen?
  - Sind die angezeigten Informationen verständlich?
  - Fehlen wichtige Felder wie Rückennummer, Spielerfoto oder Bearbeitungsfunktion?

- **Vorgehen:**  
  Geplant ist ein kurzer moderierter Test mit 2 bis 3 Personen. Die Testpersonen sollen typische Aufgaben direkt in der App durchführen.

- **Stichprobe:**  
  Noch nicht durchgeführt. Geplant sind Personen aus dem Umfeld der Zielgruppe, z. B. Kommiliton:innen oder Personen mit Interesse an Fussball.

- **Aufgaben/Szenarien:**  
  Geplante Testaufgaben:
  1. Öffne die App und finde die Spielerübersicht.
  2. Erfasse einen neuen Spieler.
  3. Prüfe, ob der neue Spieler in der Übersicht erscheint.
  4. Erfasse ein neues Spiel.
  5. Prüfe, ob das neue Spiel in der Spieleübersicht erscheint.
  6. Beschreibe, welche Funktion dir noch fehlt.

- **Kennzahlen & Beobachtungen:**  
  Noch nicht durchgeführt. Für die finale Evaluation sollen Erfolgsquote, beobachtete Schwierigkeiten und qualitative Rückmeldungen dokumentiert werden.

- **Zusammenfassung der Resultate:**  
  Noch nicht durchgeführt.

- **Abgeleitete Verbesserungen:**  
  Mögliche Verbesserungen für die nächste Iteration:
  - Spieler bearbeiten
  - Spielerstatus farblich besser unterscheiden
  - Rückennummer ergänzen
  - Spielerfoto ergänzen
  - Spiele nach Datum sortieren
  - Kader- oder Matchday-Ansicht ergänzen

## 4. Erweiterungen [Optional]

Dokumentiert Erweiterungen über den Mindestumfang hinaus.

> **Hinweis:** Jede Erweiterung ist separat nach dem folgenden Schema zu beschreiben.

### 4.1 Geplante Erweiterung: Spielerstatus visuell unterscheiden

- **Beschreibung & Nutzen:**  
  Der Status eines Spielers soll visuell besser unterscheidbar sein. Aktuell werden Statuswerte wie „fit“, „fraglich“ oder „verletzt“ angezeigt. Für eine bessere Usability sollen unterschiedliche Farben verwendet werden, z. B. grün für fit, gelb/orange für fraglich und rot für verletzt.

- **Wo umgesetzt:**  
  Geplant im Frontend der Spielerübersicht in `src/routes/players/+page.svelte`.

- **Referenz:**  
  Wird nach Umsetzung mit Screenshot ergänzt.

- **Aus Evaluation abgeleitet?:**  
  Noch nicht aus einer formellen Evaluation abgeleitet. Die Idee basiert auf einer ersten eigenen Beobachtung beim Testen der App.

## 5. Projektorganisation [Optional]

- **Repository & Struktur:**  
  GitHub Repository: https://github.com/kenkasha/Swiss-Nati

- **Issue-Management:**  
  Für die aktuelle Zwischenversion wurde noch kein ausführliches Issue-Management verwendet. Für die finale Abgabe können GitHub Issues genutzt werden, um Erweiterungen und Verbesserungen festzuhalten.

- **Commit-Praxis:**  
  Es wurden erste Commits erstellt, z. B. für den initialen Projektstand und die Vorbereitung des Netlify Deployments. Für die weitere Entwicklung sollen sprechende Commit Messages verwendet werden.

## 6. KI-Deklaration

Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt.

### 6.1 KI-Tools

- **Eingesetzte Tools:**  
  ChatGPT wurde als Unterstützung im Projekt eingesetzt.

- **Zweck & Umfang:**  
  ChatGPT wurde verwendet für:
  - Erklärung von SvelteKit-Konzepten
  - Unterstützung beim Aufbau der Projektstruktur
  - Hilfe bei MongoDB-Anbindung
  - Unterstützung beim Deployment mit Netlify
  - Fehleranalyse
  - Formulierungshilfe für die Projektdokumentation
  - Planung möglicher Erweiterungen

- **Eigene Leistung (Abgrenzung):**  
  Die Entscheidungen zur Projektidee, zur finalen Umsetzung, zur Auswahl der Funktionen und zur Abgabe liegen bei mir. Der Code wurde mit Unterstützung erstellt, von mir übernommen, angepasst, getestet und in der App eingesetzt. Die Verantwortung für Korrektheit, Funktionsfähigkeit und Dokumentation liegt bei mir.

### 6.2 Prompt-Vorgehen

Beim Einsatz von ChatGPT wurde schrittweise gearbeitet. Zuerst wurden Anforderungen und Projektidee besprochen. Danach wurden konkrete technische Schritte abgefragt, z. B. wie Routen, Formulare, Datenbankfunktionen oder das Deployment umgesetzt werden können. Die Antworten wurden jeweils geprüft, in VS Code umgesetzt und im Browser getestet. Bei Fehlermeldungen wurden Screenshots oder Codeausschnitte verwendet, um gezielt Hilfe zur Fehlerbehebung zu erhalten.

### 6.3 Reflexion

Der KI-Einsatz war hilfreich, weil komplexe technische Schritte in kleinere Einzelschritte zerlegt wurden. Besonders beim Einstieg in SvelteKit, MongoDB, GitHub und Netlify war dies unterstützend. Gleichzeitig mussten die Vorschläge überprüft werden, da die Verantwortung für die korrekte Umsetzung nicht bei der KI liegt. Wichtig war deshalb, jeden Schritt selbst zu testen und die Funktionsweise zu verstehen.

## 7. Anhang [Optional]

- **Online-Version:** https://swiss-nati-matchday-manager.netlify.app
- **GitHub Repository:** https://github.com/kenkasha/Swiss-Nati
- **Verwendete Technologien:** SvelteKit, Bootstrap, MongoDB Atlas, Netlify, GitHub