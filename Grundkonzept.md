# Grundkonzept: **pManager**  
**Modul**: 183 – Applikationssicherheit implementieren  
**Autoren**: Kenz Abdelkebir, Vincent Stucki  
**Klasse**: 5IM22a  
**Projektzeitraum**: _11.12.2924 - 19.01.2025_ `Abgabe: 19.01.2025`
---

## 1. Einleitung  

**pManager** ist ein Projekt für die Speicherung von Passwörtern, sie soll ein Passwort-Safe als Web-Anwendung sein, programmiert mit BE (Java) und FE (Next.js)


---

## 2. Projektumfang  

### 2.1 Funktion und Zweck
Die Anwendung verwaltet verschlüsselt gespeicherte Zugangsdaten (z. B. URLs, Benutzernamen, Passwörter, E-Mails, Bemerkungen) und organisiert sie in Rubriken (z. B. „Privates“, „Geschäft“). Funktionen:

 - Speichern und Bearbeiten: Einträge können hinzugefügt, geändert, gelöscht und Rubriken zugeordnet werden.
 - Verschlüsselung: Zugangsdaten werden mit einem frei wählbaren symmetrischen (z. B. AES) oder asymmetrischen (z. B. RSA) Verfahren verschlüsselt.
 - Authentisierung: Benutzer melden sich über ein zentrales Login-Fenster an, woraufhin die Daten entschlüsselt und angezeigt werden.
 - Datenquelle: Speicherung erfolgt  einem Mockup. 
 
Eine 2-Schichten-Architektur ist mit BE (Java) und FE (Next.js) gegeben. 

Passwortänderung: Benutzer können ihr Master-Passwort in einem speziellen Fenster ändern.
Benutzerverwaltung ist fest im Programm vorgesehen, eine Registrierung neuer Benutzer entfällt.

### 2.2 Sicherheit
Unsere Passwörter...
 - ...werden extern gespeichert und nicht im Klartext, mithilfe von AES, B-Crypt, sowie Salting. 
 - ...werden das Passwort mit **** anzeigen lassen auf der Seite.
 - ...überprüfte Komplexitäten haben und im Falle, wird der Benutzer gewarnt.
 - ...werden asymetrisch Verschlüsselt sein.
 - ...speichern als temp-Login in einen Token, damit der Benutzer stetig eingeloggt bleibt. 
 - ...


## Ausblick  
Wie setzen pManager als Open-Source-Projekt auf GitHub für sichere Login auf, welches gegen die meisten möglichen Hackingattacken gesichert ist. pManager legt den Fokus auf Sicherheit und Benutzerfreundlichkeit.