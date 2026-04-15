# 🎬 **NextView** – Streaming Demo

**Eine moderne, voll funktionsfähige Streaming-Website** (Netflix-Style)  
mit Suchfunktion, Watchlist, Top-10-Row, Trailer-Vorschau und Dark Mode – komplett als **statische HTML/CSS/JS-App**.

---

## ✨ Features

- ✅ **Hero-Banner** mit YouTube-Trailer im Hintergrund (automatisch abspielen + Sound-Toggle)
- ✅ **Echtzeit-Suche** über OMDB API
- ✅ **Watchlist** (Filme merken / entfernen) mit localStorage-Persistenz
- ✅ **Top 10 / Top 14** horizontal scrollbare Reihe mit Hover-Trailer-Vorschau
- ✅ **Empfohlene Filme** Grid mit verschiedenen Größen
- ✅ **Detail-Modal** mit Trailer oder Film-Infos (Titel, Jahr, Genre, Schauspieler, Plot)
- ✅ **Dark Mode** Toggle (automatisch nach System-Einstellung)
- ✅ **Herz-Animationen** + Toast-Benachrichtigungen
- ✅ **Pulsierende Highlight-Effekte** für Watchlist-Filme
- ✅ **Voll responsive** (Desktop + Mobile)
- ✅ **Keine Backend-Abhängigkeit** – läuft komplett im Browser

---

## 🛠 Technologie-Stack

- **HTML5** + **SCSS** (kompiliert zu CSS)
- **Vanilla JavaScript** (keine Frameworks)
- **OMDB API** für Filmdaten
- **YouTube Iframe API** für Trailer
- **Font Awesome** Icons
- **localStorage** für Watchlist
- **CSS Grid + Flexbox** + moderne Animationen

---

## 🚀 So starten (super einfach)

1. **Dateien herunterladen**  
   Alle Dateien in einen Ordner legen:
   - `index.html`
   - `style.css`
   - `main.js`
   - (optional: `style.scss` und `style.css.map` für Entwicklung)

2. **Im Browser öffnen**  
   Doppelklick auf **`index.html`** – fertig!  
   Die Seite läuft **ohne Server**.

---

## 🔑 Wichtige Hinweise

- Der **OMDB API-Key** (`c9bed387`) ist bereits im Code hinterlegt.
- Die **YouTube-Trailer** funktionieren sofort.
- Alle Filme sind vordefiniert (IMDb-IDs in `main.js`).
- Die Watchlist bleibt nach dem Neuladen erhalten (localStorage).

---

## 📸 Wie die App funktioniert

1. **Hero-Video** startet automatisch (stumm)
2. **Suche** oben in der Navigationsleiste
3. **Top 10** → mit Maus drüber = Trailer startet
4. **Filme anklicken** → großes Modal mit Trailer oder Infos
5. **Herz** anklicken → zur Watchlist hinzufügen/entfernen
6. **Watchlist** wird automatisch unter dem Header angezeigt
7. **Dark Mode** mit dem Mond-Symbol umschalten

---

## 🔧 Anpassungen (einfach möglich)

- Neue Filme hinzufügen → Arrays `reihe1`, `reihe2`, `reihe3`, `reihe4` in `main.js` erweitern
- Anderer Header-Trailer → `HEADER_VIDEO_ID` in `main.js` ändern
- Eigenen API-Key → `const API_KEY` in `main.js`
- Farben & Design → alles in `style.scss` (oder direkt in `style.css`)
- Logo/Text → in `index.html` ändern

---

## 📁 Dateien

| Datei              | Beschreibung                          |
|--------------------|---------------------------------------|
| `index.html`       | Hauptseite + Struktur                 |
| `style.css`        | Kompiliertes CSS (aus SCSS)          |
| `style.scss`       | Quellcode für Styling                 |
| `main.js`          | Alle Logik (API, Watchlist, Modal…)  |
| `README.md`        | Diese Datei                           |
