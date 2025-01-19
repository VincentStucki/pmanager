# Reflexion: **pManager**  
**Modul**: 183 – Applikationssicherheit implementieren  
**Autoren**: Kenz Abdelkebir, Vincent Stucki  
**Klasse**: 5IM22a  
**Projektzeitraum**: _11.12.2924 - 19.01.2025_ `Abgabe: 19.01.2025`
---
## Projektziele und Umsetzung
Das Hauptziel von **pManager** war die Entwicklung einer benutzerfreundlichen, sicheren Passwort-Verwaltung. Die klare Trennung zwischen Frontend (*Next.js*) und Backend (*Node.js*) spiegelt sich in einer sauberen Architektur wider. Besonders hervorzuheben ist die Verwendung moderner Verschlüsselungsmethoden (**AES**, **BCrypt**, **Salting**) und die Integration von **JSON Web Tokens (JWT)** zur Benutzer-Authentifizierung.

Unsere Umsetzung wurde intensiv mit **Postman** getestet, um eine robuste Funktionalität sicherzustellen.

---

## Positive Aspekte
1. **Sicherheitsaspekte:**  
   Die Implementierung von symmetrischer und asymmetrischer Verschlüsselung garantiert, dass sensible Daten wie Passwörter nicht im Klartext gespeichert werden. **Salting** und die Prüfung der Passwortkomplexität erhöhen die Sicherheit zusätzlich.
   
2. **UI/UX-Optimierungen:**  
   Die Benutzeroberfläche wurde mit modernen Designrichtlinien intuitiv gestaltet.

3. **Benutzerfreundlichkeit:**  
   Funktionen wie die Rubrik-Einteilung (*„Privates“, „Geschäft“*) und die einfache Bearbeitung oder Löschung von Einträgen tragen zur Anwendungsfreundlichkeit bei.

4. **Architektur:**  
   Die klare Trennung in zwei Schichten (*„2-Schichten-Architektur“*) sorgt für Wartungsfreundlichkeit und Skalierbarkeit. Die Nutzung von **NextAuth** erleichtert die Integration von Authentifizierungsmechanismen.

---

## Herausforderungen
1. **Datenbankintegration:**  
   Aktuell werden Daten in einem Mockup gespeichert. Eine echte Datenbank-Integration (z. B. **PostgreSQL** oder **MongoDB**) wäre ein wichtiger nächster Schritt, um die Persistenz zu verbessern.

2. **Fehlerbehandlung:**  
   Obwohl grundlegende Fehler wie ungültige Logins behandelt werden, fehlen teilweise detaillierte Fehlermeldungen, die den Benutzer besser unterstützen könnten.

3. **Deployment:**  
   Der aktuelle Entwicklungsstand zeigt ein funktionsfähiges System. Ein Deployment auf eine Hosting-Plattform (z. B. **AWS**, **Vercel**) wäre notwendig, um **pManager** produktionsreif zu machen.

4. **Java-Problem:**  
   Ursprünglich war geplant, das Backend mit **Java** umzusetzen. Aufgrund zahlreicher Fehler entschied man sich jedoch für die Implementierung mit **Node.js**.

---

## Potenziale und Ausblick
Das Projekt hat das Potenzial, sich zu einer vollwertigen Open-Source-Lösung zu entwickeln. Folgende Verbesserungen könnten in zukünftigen Iterationen umgesetzt werden:
- **Erweiterte Benutzerverwaltung:**  
  Neben dem zentralen Login könnten Registrierungen oder Multi-User-Support integriert werden.
  
- **Erweiterte Sicherheitsfunktionen:**  
  Funktionen wie Zwei-Faktor-Authentifizierung (*2FA*) oder ein Sicherheits-Dashboard würden das Vertrauen der Nutzer weiter erhöhen.

---

## Fazit
Das Projekt **pManager** zeigt, dass sichere und benutzerfreundliche Passwort-Verwaltung in einer Web-Anwendung realisierbar ist. Die starke Fokussierung auf Sicherheitsaspekte ist ein großes Plus. Gleichzeitig gibt es Potenziale für Verbesserungen, insbesondere in der Integration und Skalierbarkeit. Der Weg hin zu einer produktionsreifen Anwendung ist vielversprechend, und **pManager** könnte sich als nützliches Tool etablieren, insbesondere im Open-Source-Bereich.
**Starten**: npm run server (Node.js), npm run dev (Next.js).
**User Login**: username: user, password: pass123.

## Grösste Probleme
1. Die grösstmöglliche Sicherheit zu implementieren in Java (Nicht funktioniert, Zeitaufwand: ca. 8Lektionen...), deshalb auf Node.js umgestellt.
2. API-Request sicher zu stellen, dass es nur ein Request geben kann, wenn der User sich angemeldet hat. (Nicht funktioniert, 4Lektionen+ aufwand...)
