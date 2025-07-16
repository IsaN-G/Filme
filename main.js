const API_KEY = 'c9bed387'; // <-- Hier deinen API-Key einfügen

// Beispiel-IDs für jede Reihe
const reihe1 = [
    "tt13443470", // The Black Phone 2
    "tt29644189",// Wednesday
    "tt0083658", // Blade Runner
    "tt33043892" // Dexter: Resurrection
];  

const reihe2 = [
    "tt0120903",  // X-Men
    "tt1490017",   // The Lego Movie
    "tt0175142",  // Scary Movie
    "tt0159206"   // Sex and the City
];

const reihe3 = [
    "tt0120902",  // The X-Files
    "tt0078346",  // Superman
    "tt0227538",  // Spy Kids
    "tt0462538",  // The Simpsons Movie
];

// Funktion um Daten von der OMDb API zu holen
async function ladeFilme(reihe, elementId) {
    const container = document.getElementById(elementId);
    for (let id of reihe) {
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const film = await res.json();

        const div = document.createElement("div");
        div.className = "movie";
        div.innerHTML = `
            <img src="${film.Poster}" alt="${film.Title}">
            <h3>${film.Title}</h3>
            <p>${film.Year}</p>
        `;
        container.appendChild(div);
    }
}

// Seitenaufbau
ladeFilme(reihe1, "reihe1");
ladeFilme(reihe2, "reihe2");
ladeFilme(reihe3, "reihe3");
