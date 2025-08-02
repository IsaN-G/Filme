const API_KEY = 'c9bed387';

const trailerMap = {
    "tt0110912": "s7EdQ4FqbhY",   // Pulp Fiction
    "tt0133093": "m8e-FF8MsqU",   // The Matrix Trailer
    "tt0109830": "uPIEn0M8su0",   // Forrest Gump Trailer
    "tt0816692": "zSWdZVtXT7E",   // Interstellar Trailer
    "tt1375666": "YoHD9XEInc0",   // Inception Trailer
    "tt0111161": "NmzuHjWmXOc",   // The Shawshank Redemption
    "tt0120737": "V75dMMIW2B4",   // The Lord of the Rings: The Fellowship of the Ring
    "tt0114369": "znmZoVkCjpI",   // Se7en
    "tt0102926": "hA0V38vGf2k",   // The Silence of the Lambs
    "tt0499549": "5PSNL1qE6VY",   // Django Unchained
    "tt0110413": "hEJnMQG9ev8",   // Léon: The Professional
    "tt0120815": "hEJnMQG9ev8",   // Saving Private Ryan
    "tt0088763": "qvsgGtivCgs",   // Back to the Future
    "tt0114709": "6hB3S9bIaco",   // Toy Story
    
  };
  const reihe1 = [
    "tt0109830",  // Forrest Gump
    "tt0133093", //  The Matrix
    "tt0816692",  // Interstellar
    "tt1375666",  // Inception
    "tt0110912", //  Pulp Fiction
    "tt0120737",  // The Lord of the Rings: The Fellowship of the Ring
    "tt0114369",  // Se7en
    "tt29644189", // Wednesday
    "tt0111161", //  The Shawshank Redemption
    "tt0102926",  // The Silence of the Lambs
    "tt0499549",  // Avatar
    "tt0110413",  // Léon: The Professional
    "tt0120815",  // Saving Private Ryan
    "tt0088763",  // Back to the Future
    "tt0114709",  // Toy Story
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
    "tt0111161", //  The Shawshank Redemption
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
    "tt11315808", // Joker: Folie à Deux
    "tt10545296", // Gladiator II
    "tt6263850",  // Deadpool & Wolverine
    "tt12915716", // Inside Out 2
    "tt11389872", // Kingdom of the Planet of the Apes
    "tt16758398", // Dune: Part Three
    "tt12037194", // Furiosa
    "tt14537248", // Challengers
    "tt10268488", // Civil War
    "tt15398776", // The Bikeriders
    "tt1517268",  // Barbie (2023)
    "tt9362722",  // Spider-Man: Across the Spider-Verse
    "tt1462764",  // Dune: Part Two
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
        poster: film.Poster !== "N/A" ? film.Poster : "fallback.jpg", // Fallback bei fehlendem Poster
        trailer: film.Trailer || null // Optional: ein eigenes Trailer-Feld, wenn du das ergänzt
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

    saveWatchlist([...new Set(list)]); // Deduplizieren
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
      // Nur den Trailer zeigen
      video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`;
      videoContainer.style.display = 'block';
  
      // Alle anderen Infos ausblenden
      document.getElementById('modal-title').style.display = 'none';
      document.getElementById('modal-poster').style.display = 'none';
      document.getElementById('modal-year').style.display = 'none';
      document.getElementById('modal-genre').style.display = 'none';
      document.getElementById('modal-actors').style.display = 'none';
      document.getElementById('modal-plot').style.display = 'none';
    } else {
      // Falls kein Trailer vorhanden, Modal komplett ausblenden oder eine Nachricht zeigen
      video.src = '';
      videoContainer.style.display = 'none';
  
      // Alternativ kannst du hier wieder alles einblenden, falls gewünscht
      document.getElementById('modal-title').style.display = 'block';
      document.getElementById('modal-poster').style.display = 'block';
      document.getElementById('modal-year').style.display = 'block';
      document.getElementById('modal-genre').style.display = 'block';
      document.getElementById('modal-actors').style.display = 'block';
      document.getElementById('modal-plot').style.display = 'block';
  
      // Und mit Film-Infos befüllen, falls du willst:
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
    watchlistContainer.innerHTML = ''; // wichtig: vorher leeren

    const ids = [...new Set(getWatchlist())].filter(id => typeof id === 'string' && id.startsWith('tt'));

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const film = await res.json();

        if (film.Response === "False") continue;

        const div = document.createElement("div");
        div.className = "movie watchlist-item";

        // Markiere bestimmte Filme als "größer"
        if (i === 0 || i === 1) {
            div.classList.add("featured-xl"); // sehr groß
        } else if (i === 2 || i === 3) {
            div.classList.add("featured-lg"); // mittelgroß
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


  const video = document.getElementById('header-video');
  let current = 0;
  
  function playNextClip() {
      video.style.opacity = '0';
      setTimeout(() => {
        const clips = [];
        headerPlayer.playVideo()
          video.play();
          current = (current + 1) % clips.length;
          video.style.opacity = '1';
      }, 500);
  }
  

  let headerPlayer;
  let isMuted = true;
  
  function onYouTubeIframeAPIReady() {
    headerPlayer = new YT.Player('header-video', {
      videoId: 'QWF9dn6peBM', // Trailer-ID aus deinem Header-Embed
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        loop: 1,
        playlist: 'QWF9dn6peBM',
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      },
      events: {
        onReady: (event) => {
          event.target.playVideo();
        }
      }
    });
  }
  
  document.getElementById('enable-sound').addEventListener('click', () => {
    if (headerPlayer) {
      if (isMuted) {
        headerPlayer.unMute();
        isMuted = false;
        document.querySelector('#enable-sound i').classList.remove('fa-volume-mute');
        document.querySelector('#enable-sound i').classList.add('fa-volume-up');
        document.getElementById('enable-sound').title = 'Ton ausschalten';
      } else {
        headerPlayer.mute();
        isMuted = true;
        document.querySelector('#enable-sound i').classList.remove('fa-volume-up');
        document.querySelector('#enable-sound i').classList.add('fa-volume-mute');
        document.getElementById('enable-sound').title = 'Ton einschalten';
      }
    }
  }); 
 