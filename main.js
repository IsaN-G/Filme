const API_KEY = 'c9bed387';

const trailerMap = {
    "tt11315808":"_4FtwFaGR88", // Joker: Folie à Deux
    "tt10545296":"Avt5jFnIn_g", // Gladiator II
    "tt6263850":"7jG_oHtN3mY",  // Deadpool & Wolverine
    "tt2096673":"5IsgZPj1bTI", // Inside Out 2
    "tt11389872":"lxYRjgmW6A0", // Kingdom of the Planet of the Apes
    "tt15398776":"cE331qh3jYs", // Oppenheimer 
    "tt12037194":"Y9xlBFagk2U", // Furiosa
    "tt16426418":"aYJ8wcsC714", // Challengers
    "tt12593682":"XLNLERSD-_c", // Bullet Train
    "tt1517268":"4goO4tQRMAA",  // Barbie (2023)
    "tt9362722":"00YPh8HiNfs",  // Spider-Man: Across the Spider-Verse
    "tt15239678":"uEFq2Jp9YbE", // Dune: Part Two
    "tt1684562":"zXp_vuN7ZJU", // The Fall Guy
    "tt10640346":"EClUnohji1M", // Babylon – Rausch der Ekstase
  };
  const reihe1 = [
    "tt11315808", // Joker: Folie à Deux
    "tt10545296", // Gladiator II
    "tt6263850",  // Deadpool & Wolverine
    "tt2096673", // Inside Out 2
    "tt11389872", // Kingdom of the Planet of the Apes
    "tt15398776", // Oppenheimer 
    "tt12037194", // Furiosa
    "tt16426418", // Challengers
    "tt12593682", // Bullet Train
    "tt1517268",  // Barbie (2023)
    "tt9362722",  // Spider-Man: Across the Spider-Verse
    "tt15239678", // Dune: Part Two
    "tt1684562", // The Fall Guy
    "tt10640346", // Babylon – Rausch der Ekstase
];
const reihe2 = [
    "tt13443470", // The Black Phone 2
    "tt0120903",  // X-Men
    "tt1490017",  // The Lego Movie
    "tt0175142",  // Scary Movie
    "tt0159206",  // Sex and the City
    "tt0120737",  // The Lord of the Rings: The Fellowship of the Ring
    "tt29644189", // Wednesday
    "tt0114369",  // Se7en
    "tt0102926",  // The Silence of the Lambs
    "tt0993846",  // The Wolf of Wall Street
    "tt0114814",  // The Usual Suspects
    "tt0246578",  // Donnie Darko
    "tt0180093",  // Requiem for a Dream
    "tt7286456",  // Joker
    "tt0095016",  // Die Hard
    "tt4154796",  // Avengers: Endgame
    "tt0083658",  // Blade Runner
    "tt33043892", // Dexter: Resurrection
    "tt0468569", //  The Dark Knight
    "tt1856101",  // Blade Runner 2049
    "tt0107290",  // Jurassic Park
    "tt0137523",  // Fight Club
    "tt0080684",  // Star Wars: The Empire Strikes Back
    "tt4154756",  // Avengers: Infinity War
    
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

const reihe4 = [
    "tt16758398", // Dune: Part Three
    "tt10268488", // Civil War
    "tt15398776", // The Bikeriders
    "tt0109830", // Forrest Gump Trailer
    "tt0110912",   // Pulp Fiction
    "tt0133093",  // The Matrix Trailer
    "tt0816692",   // Interstellar Trailer
    "tt1375666",   // Inception Trailer
    "tt0111161",   // The Shawshank Redemption
    "tt0120737",   // The Lord of the Rings: The Fellowship of the Ring
    "tt0114369",   // Se7en
    "tt0102926",   // The Silence of the Lambs
    "tt0499549",   // Django Unchained
    "tt0114709",   // Toy Story
    "tt0110912",   // Pulp Fiction

];


  async function holeFilmdaten(filmId) {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${filmId}&apikey=${API_KEY}`);
      const film = await response.json();
  
      if (film.Response === "False") {
        console.warn(`Film ${filmId} konnte nicht geladen werden: ${film.Error}`);
        return null;
      }
  
      return {
        titel: film.Title,
        poster: film.Poster !== "N/A" ? film.Poster : "fallback.jpg", 
        trailer: film.Trailer || null 
      };
    } catch (error) {
      console.error("Fehler beim Laden des Films:", error);
      return null;
    }
  }


function getWatchlist() {
    return (JSON.parse(localStorage.getItem('watchlist')) || []).filter(id => typeof id === 'string' && id.startsWith('tt'));
}

function saveWatchlist(list) {
    localStorage.setItem('watchlist', JSON.stringify(list));
}

function toggleWatchlist(id) {
    let list = getWatchlist();
    let message = '';

    if (!list.includes(id)) {
        list.push(id);
        message = 'Film zur Watchlist hinzugefügt';
    } else {
        list = list.filter(item => item !== id);
        message = 'Film aus Watchlist entfernt';
    }

    saveWatchlist([...new Set(list)]); 
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

        const trailerId = trailerMap[id]; 
        if (trailerId) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerId}`;
            iframe.frameBorder = "0";
            iframe.allow = "autoplay; encrypted-media";
            iframe.allowFullscreen = true;
            div.appendChild(iframe);
        }

        div.addEventListener('click', () => {
            showModal(film);
        });

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
    const alleFilme = [...reihe1, ...reihe2, ...reihe3, ...reihe4];
    const container = document.getElementById('gridContainer');
    container.innerHTML = '';

    for (let i = 0; i < alleFilme.length; i++) {
        const id = alleFilme[i];
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
       
        const film = await res.json();
        if (film.Response === "False") {
            console.warn(`Film nicht gefunden: ${id}`);
            continue;
          }

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
    const videoContainer = document.getElementById('modal-video-container');
    const video = document.getElementById('modal-video');
    const videoId = trailerMap[film.imdbID];
  
    if (videoId) {
     
      video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`;
      videoContainer.style.display = 'block';
  
      
      document.getElementById('modal-title').style.display = 'none';
      document.getElementById('modal-poster').style.display = 'none';
      document.getElementById('modal-year').style.display = 'none';
      document.getElementById('modal-genre').style.display = 'none';
      document.getElementById('modal-actors').style.display = 'none';
      document.getElementById('modal-plot').style.display = 'none';
    } else {
    
      video.src = '';
      videoContainer.style.display = 'none';
  
      
      document.getElementById('modal-title').style.display = 'block';
      document.getElementById('modal-poster').style.display = 'block';
      document.getElementById('modal-year').style.display = 'block';
      document.getElementById('modal-genre').style.display = 'block';
      document.getElementById('modal-actors').style.display = 'block';
      document.getElementById('modal-plot').style.display = 'block';
  
      
      document.getElementById('modal-title').textContent = film.Title;
      document.getElementById('modal-poster').src = film.Poster;
      document.getElementById('modal-year').textContent = `Year: ${film.Year}`;
      document.getElementById('modal-genre').textContent = `Genre: ${film.Genre}`;
      document.getElementById('modal-actors').textContent = `Actors: ${film.Actors}`;
      document.getElementById('modal-plot').textContent = film.Plot;
    }
  
    document.getElementById('modal').style.display = 'block';
  }

  document.getElementById('closeModal').onclick = () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-video').src = '';
  };
  
  window.onclick = (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
      modal.style.display = 'none';
      document.getElementById('modal-video').src = '';
    }
  };

  async function renderWatchlist() {
    const watchlistContainer = document.getElementById("watchlist");
    watchlistContainer.innerHTML = ''; 

    const ids = [...new Set(getWatchlist())].filter(id => typeof id === 'string' && id.startsWith('tt'));

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const film = await res.json();

        if (film.Response === "False") continue;

        const div = document.createElement("div");
        div.className = "movie watchlist-item";

        
        if (i === 0 || i === 1) {
            div.classList.add("featured-xl"); 
        } else if (i === 2 || i === 3) {
            div.classList.add("featured-lg"); 
        }

        div.innerHTML = `
        <div class="poster-wrapper">
            <img src="${film.Poster}" alt="${film.Title}">
            <button class="heart" title="Entfernen" data-id="${film.imdbID}">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <h3>${film.Title}</h3>
        <p>${film.Year}</p>
    `;
        div.querySelector('.heart').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWatchlist(film.imdbID);
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
let headerPlayer;
let isMuted = true;


const HEADER_VIDEO_ID = "1pNP8rwvwY8"; 

function onYouTubeIframeAPIReady() {
    headerPlayer = new YT.Player('header-video', {
        videoId: HEADER_VIDEO_ID,
        playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            playlist: HEADER_VIDEO_ID, 
            mute: 1,
        },
        events: {
            onReady: (event) => {
                event.target.mute();     
                event.target.playVideo();
            }
        }
    });
}

document.getElementById('enable-sound').addEventListener('click', () => {
    if (!headerPlayer) return;

    isMuted = !isMuted;

    const icon = document.querySelector('#enable-sound i');
    if (isMuted) {
        headerPlayer.mute();
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    } else {
        headerPlayer.unMute();
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
    }

    document.getElementById('enable-sound').title = isMuted ? 'Ton einschalten' : 'Ton ausschalten';
});


  const darkToggle = document.getElementById("darkModeToggle");

  function setDarkMode(enabled) {
      document.documentElement.classList.toggle("dark-mode", enabled);
      localStorage.setItem("darkMode", enabled ? "true" : "false");
      darkToggle.title = enabled ? "Hellen Modus aktivieren" : "Dunklen Modus aktivieren";
      darkToggle.querySelector("i").className = enabled ? "fas fa-sun" : "fas fa-moon";
  }
  
  darkToggle.addEventListener("click", () => {
      const current = document.documentElement.classList.contains("dark-mode");
      setDarkMode(!current);
  });
  
  
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedMode = localStorage.getItem("darkMode");
  setDarkMode(savedMode === "true" || (savedMode === null && systemDark));
  
  
