const movieListEl = document.querySelector(".movie__list");
const searchValue = document.querySelector(".search__value");
const n = 6;
let movieData = {};
let isModalOpen = false;


// SEARCH MOVIES
function searchTerm(event) {
  const movieId = event.target.value;
  getMovies(movieId);
  loading();
  searchValue.innerHTML = movieId;
}


// RENDER MOVIES
function renderMovies() {
  if (movieData.Search) {
    movieListEl.innerHTML = movieData.Search
    .map((movie) => getMovieDescription(movie))
    .slice(0, n)
    .join("");

    document.querySelector('.no__movies--container').style.display = 'none';
    movieListEl.style.display = 'block';
  }
  else {
    console.log("Movie not found");
      
    document.querySelector('.no__movies--container').style.display = 'block';
    movieListEl.style.display = 'none';
  }
}


// GETING MOVIES FROM BACKEND
async function getMovies(movieId) {
  const movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=fb20479&s=${movieId}`);
  movieData = await movies.json();
  setTimeout(() => {
    renderMovies();
  }, 1000);
}


// HTML GENERATION
function getMovieDescription(movie) {
  return `<div class="movie" onclick="toggleModal()">
            <figure>
                <img src="${movie.Poster}"alt="" class="movie__img"/>
            </figure>
            <div class="movie__description--list">
                <h3 class="movie__description movie__title">${movie.Title}</h3>
                <p class="movie__description movie__year"><span class="movie__description--heading">Year:</span> ${movie.Year}</p>
            </div>
          </div>

          <div class="modal">
            <div class="modal__half modal__about">
              <figure>
                <img src="${movie.Poster}"alt="" class="movie__img"/>
              </figure>
            </div>
              
            <div class="modal__half modal__contact">
              <i class="fas fa-times modal__exit click" onclick="toggleModal()"></i>
              <div>
              <h3 class="movie__description movie__title">${movie.Title}</h3>
              </div>
            </div>
          </div>`;
}

function renderFilteredMovies(filteredMovies) {
  movieListEl.innerHTML = filteredMovies
    .slice(0, n)
    .map((movie) => getMovieDescription(movie))
    .join("");
}


// LOADING FUNCTION
function loading(load) {
  const loading = document.querySelector(".loading__spinner");

  loading.classList += " loading__spinner--visible";
  setTimeout(() => {
    loading.classList.remove("loading__spinner--visible");
  }, 2000);
}


// TOGGLE MODAL
function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}