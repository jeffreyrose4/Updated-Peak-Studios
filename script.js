const movieListEl = document.querySelector(".movie__list");
const searchValue = document.querySelector(".search__value");
const n = 10;
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
  } else {
    console.log("Movie not found");

    document.querySelector('.no__movies--container').style.display = 'block';
    movieListEl.style.display = 'none';
  }
}

// GET MOVIES FROM BACKEND
async function getMovies(movieId) {
  const movies = await fetch(`https://www.omdbapi.com/?apikey=fb20479&s=${movieId}`);
  movieData = await movies.json();
  setTimeout(() => {
    renderMovies();
  }, 2000);
}

// HTML GENERATION
function getMovieDescription(movie) {
  return `<div class="movie" onclick="toggleModal('${movie.imdbID}')">
            <figure>
                <img src="${movie.Poster}" alt="" class="movie__img"/>
            </figure>
            <div class="movie__description--list">
                <h3 class="movie__description movie__title">${movie.Title}</h3>
                <p class="movie__description movie__year"><span class="movie__description--heading">Year:</span> ${movie.Year}</p>
            </div>
          </div>`;
}

// LOADING FUNCTION
function loading() {
  const loading = document.querySelector(".loading__spinner");
  loading.classList.add("loading__spinner--visible");
  setTimeout(() => {
    loading.classList.remove("loading__spinner--visible");
  }, 2000);
}

// TOGGLE MODAL
function toggleModal(imdbID) {
  if (isModalOpen) {
    isModalOpen = false;
    document.body.classList.remove("modal--open");
  } else {
    isModalOpen = true;
    fetch(`https://www.omdbapi.com/?apikey=fb20479&i=${imdbID}`)
      .then(response => response.json())
      .then(data => renderMovieInfo(data));
    document.body.classList.add("modal--open");
  }
}

// RENDER MOVIE INFO
function renderMovieInfo(movieInfo) {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
    <div class="modal__half modal__about">
      <figure>
        <img src="${movieInfo.Poster}" alt="" class="modal__movie--img"/>
      </figure>
    </div>
    <div class="modal__half modal__contact">
      <i class="fas fa-times modal__exit click" onclick="toggleModal()"></i>
      <div class="modal__movie--description">
        <h3 class="movie__description modal__movie--title">${movieInfo.Title}</h3>
        <h3 class="movie__description modal__movie--rated">${movieInfo.Rated}</h3>
        <h3 class="movie__description modal__movie--plot">${movieInfo.Plot}</h3>
        <h3 class="movie__description modal__movie--actors">${movieInfo.Actors}</h3>
      </div>
    </div>`;
}