const API_KEY = 'c9bed387';


const reihe1 = [
    "tt13443470", // The Black Phone 2
    "tt29644189", // Wednesday
    "tt0083658",  // Blade Runner
    "tt33043892", // Dexter: Resurrection
    "tt0110912", //  Pulp Fiction
    "tt0111161", //  The Shawshank Redemption
    "tt0468569", //  The Dark Knight
    "tt0133093", //  The Matrix
];  

const reihe2 = [
    "tt0120903",  // X-Men
    "tt1490017",  // The Lego Movie
    "tt0175142",  // Scary Movie
    "tt0159206",  // Sex and the City
    "tt0120737",  // The Lord of the Rings: The Fellowship of the Ring
    "tt0109830",  // Forrest Gump
    "tt0114369",  // Se7en
    "tt0102926",  // The Silence of the Lambs
];

const reihe3 = [
    "tt0120902",  // The X-Files
    "tt0078346",  // Superman
    "tt0227538",  // Spy Kids
    "tt0462538",  // The Simpsons Movie
    "tt0443706", //  Zodiac
    "tt2267998", //  Gone Girl
    "tt0353969", //  Memories of Murder
    "tt1392214", // Prisoners
];

async function ladeFilme(reihe, elementId) {
    const container = document.getElementById(elementId);
    for (let id of reihe) {
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const film = await res.json();

        const div = document.createElement("div");
        div.className = "movie";
        div.innerHTML = `
        <img src="${film.Poster}" alt="${film.Title}">
        <div class="info">
        <h3>${film.Title}</h3>
        <p>${film.Year}</p>
        </div>
        `;
        div.addEventListener('click', () => showModal(film));
        container.appendChild(div);
    }
}
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

function showModal(film) {
    document.getElementById('modal-title').textContent = film.Title;
    document.getElementById('modal-poster').src = film.Poster;
    document.getElementById('modal-year').textContent = `Year: ${film.Year}`;
    document.getElementById('modal-genre').textContent = `Genre: ${film.Genre}`;
    document.getElementById('modal-actors').textContent = `Actors: ${film.Actors}`;
    document.getElementById('modal-plot').textContent = film.Plot;
    modal.style.display = 'block';
}

closeModal.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};



// Seitenaufbau
ladeFilme(reihe1, "reihe1");
ladeFilme(reihe2, "reihe2");
ladeFilme(reihe3, "reihe3");
