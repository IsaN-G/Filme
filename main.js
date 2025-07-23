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
    "tt0816692",  // Interstellar
    "tt1375666",  // Inception
    "tt1856101",  // Blade Runner 2049
    "tt0107290",  // Jurassic Park
    "tt0137523",  // Fight Club
    "tt0080684",  // Star Wars: The Empire Strikes Back
    "tt4154756",  // Avengers: Infinity War
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
    "tt0993846",  // The Wolf of Wall Street
    "tt0114814",  // The Usual Suspects
    "tt0246578",  // Donnie Darko
    "tt0180093",  // Requiem for a Dream
    "tt7286456",  // Joker
    "tt0095016",  // Die Hard
    "tt4154796",  // Avengers: Endgame
    
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
    "tt0088763",  // Back to the Future
    "tt0068646",  // The Godfather
    "tt6751668",  // Parasite
    "tt0169547",  // American Beauty
    "tt0325980",  // Pirates of the Caribbean: The Curse of the Black Pearl
    "tt0108052",  // Schindler's List
];

function getWatchlist() {
    return JSON.parse(localStorage.getItem('watchlist')) || [];
}

function saveWatchlist(list) {
    localStorage.setItem('watchlist', JSON.stringify(list));
}

function toggleWatchlist(id) {
    let list = getWatchlist();
    let message = '';

    if (list.includes(id)) {
        list = list.filter(item => item !== id);
        message = 'Film aus Watchlist entfernt';
    } else {
        list.push(id);
        message = 'Film zur Watchlist hinzugefügt';
    }


    saveWatchlist(list);
    renderWatchlist();
    showToast(message);
}
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 1500);
}

function isInWatchlist(id) {
    return getWatchlist().includes(id);
}

async function ladeTopTenFilme() {
    const container = document.getElementById('topTenContainer');
    container.innerHTML = '';

    for (let i = 0; i < reihe1.length; i++) {
        const id = reihe1[i];
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const film = await res.json();
        const div = document.createElement("div");
        div.className = "top-ten-movie";
        div.innerHTML = `
            <div class="number">${i + 1}</div>
            <img src="${film.Poster !== 'N/A' ? film.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${film.Title}">

        `;
        container.appendChild(div);
    }
}
ladeTopTenFilme();

const row = document.getElementById('topTenContainer');
const btnLeft = document.querySelector('.scroll-btn.left');
const btnRight = document.querySelector('.scroll-btn.right');

btnLeft.addEventListener('click', () => {
    row.scrollBy({ left: -400, behavior: 'smooth' });
});

btnRight.addEventListener('click', () => {
    row.scrollBy({ left: 400, behavior: 'smooth' });
});

async function ladeFilmeAlleInGrid() {
    const alleFilme = [...reihe1, ...reihe2, ...reihe3]; 
    const container = document.getElementById('gridContainer');
    container.innerHTML = '';

    for (let i = 0; i < alleFilme.length; i++) {
        const id = alleFilme[i];
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
       
        const film = await res.json();
       

        const div = document.createElement("div");
        div.className = "movie";

      
        if (i === 0) {
            div.classList.add('large');
        } else if (i === 1 || i === 2) {
            div.classList.add('medium');
        } else if (i >= 3 && i <= 6) {
            div.classList.add('small');
        } else {
            div.classList.add('small'); 
        }

        div.innerHTML = `
            <img src="${film.Poster !== 'N/A' ? film.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${film.Title}">
                <div class="info">
                <h3>${film.Title}</h3>
                <p>${film.Year}</p>
                <i 
                    class="heart ${isInWatchlist(film.imdbID) ? 'fas' : 'far'} fa-heart"
                    title="${isInWatchlist(film.imdbID) ? 'Aus Watchlist entfernen' : 'Zur Watchlist hinzufügen'}"
                    data-id="${film.imdbID}">
                </i>
            </div>
        `;
       
        div.addEventListener('click', (e) => {
            if (e.target.classList.contains('heart')) {
                e.stopPropagation();
                e.target.classList.add('clicked');
                setTimeout(() => e.target.classList.remove('clicked'), 200);
                toggleWatchlist(e.target.dataset.id);
                e.target.classList.toggle('fas');
                e.target.classList.toggle('far');
                e.target.title = isInWatchlist(e.target.dataset.id) ? 'Aus Watchlist entfernen' : 'Zur Watchlist hinzufügen';
                return;
            }
            showModal(film);
        });

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

async function renderWatchlist() {
    const watchlistContainer = document.getElementById('watchlist');
    const title = document.getElementById('watchlist-title');
    const ids = getWatchlist();

    if (ids.length === 0) {
        watchlistContainer.innerHTML = '<p>Deine Watchlist ist leer.</p>';
        title.style.display = 'none';
        return;
    }

    title.style.display = 'block';
    watchlistContainer.innerHTML = '';

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      
        const film = await res.json();

        const div = document.createElement("div");
        div.className = "movie watchlist-item";
if (i < 5) {
    div.classList.add(`item-area-${i + 1}`);
}
        div.innerHTML = `
           <img src="${film.Poster !== 'N/A' ? film.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${film.Title}">
                <div class="info">
                <h3>${film.Title}</h3>
                <p>${film.Year}</p>
                <i 
                    class="heart fas fa-heart"
                    title="Aus Watchlist entfernen"
                    data-id="${film.imdbID}">
                </i>
            </div>
        `;

        div.querySelector('.heart').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWatchlist(film.imdbID);
            renderWatchlist(); 
        });

        watchlistContainer.appendChild(div);
    }
}

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const searchTitle = document.getElementById('search-title');
const loader = document.getElementById('loader');

searchTitle.style.display = 'none';

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

async function handleSearch() {
    const query = searchInput.value.trim();
    searchResults.innerHTML = '';
    searchTitle.style.display = 'none';

    if (!query) {
        return;
    }

    loader.style.display = 'inline-block';

    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
   
        
        const data = await res.json();

        loader.style.display = 'none';

        if (data.Response === "True") {
            searchTitle.textContent = 'Suchergebnisse';
            searchTitle.style.display = 'block';
            ladeSuchErgebnisse(data.Search);
        } else {
            searchTitle.textContent = 'Keine Ergebnisse gefunden.';
            searchTitle.style.display = 'block';
            searchResults.innerHTML = '';
        }
    } catch (err) {
        console.error(err);
        loader.style.display = 'none';
    }
    searchInput.value = '';
}
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', () => {
    alert('Login-Feature kommt bald 😉');
});


function ladeSuchErgebnisse(searchArray) {
    searchResults.innerHTML = '';

    searchArray.forEach(film => {
        const div = document.createElement("div");
        div.className = "movie";
        div.innerHTML = `
           <img src="${film.Poster !== 'N/A' ? film.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${film.Title}">
            <div class="info">
            <h3>${film.Title}</h3>
            <p>${film.Year}</p>
            <i 
                class="heart ${isInWatchlist(film.imdbID) ? 'fas' : 'far'} fa-heart" 
                title="${isInWatchlist(film.imdbID) ? 'Aus Watchlist entfernen' : 'Zur Watchlist hinzufügen'}" 
                data-id="${film.imdbID}">
        </i>
            </div>
        `;

        div.addEventListener('click', async (e) => {
            if (e.target.classList.contains('heart')) {
                e.stopPropagation();
                e.target.classList.add('clicked');
                setTimeout(() => e.target.classList.remove('clicked'), 200);
                toggleWatchlist(e.target.dataset.id);
                e.target.classList.toggle('fas');
                e.target.classList.toggle('far');
                return;
            }

            const res = await fetch(`https://www.omdbapi.com/?i=${film.imdbID}&apikey=${API_KEY}`);
         
            const fullFilm = await res.json();
            showModal(fullFilm);
        });

        searchResults.appendChild(div);
    });
}
ladeFilmeAlleInGrid();

 


  
  const video = document.getElementById('header-video');
  let current = 0;
  
  function playNextClip() {
      video.style.opacity = '0';
      setTimeout(() => {
          video.src = clips[current];
          video.load();
          video.play();
          current = (current + 1) % clips.length;
          video.style.opacity = '1';
      }, 500);
  }
  
  video.addEventListener('ended', playNextClip);
  playNextClip();
          
     