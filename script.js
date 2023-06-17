// DOM elements
const moviesContainer = document.getElementById('movies-grid');
const loadMoreButton = document.getElementById('load-more-movies-btn');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('close-search-btn');
const nowPlayingButton = document.getElementById('now-playing');
const closeSearchButton = document.getElementById('close-search-btn');

// Global variables
let page = 1;
let currentMovies = [];
let query = '';

const API_KEY = '67944a3230b59028541bfc89d5a96060';
const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIES_ENDPOINT = '/movie/now_playing';

// Function to fetch movies from API
const fetchMovies = async () => {
  const url = `${BASE_URL}${MOVIES_ENDPOINT}?api_key=${API_KEY}&page=${page}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log('Error fetching movies:', error);
    return [];
  }
};

// Function to create movie card
const createMovieCard = (movie) => {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const movieImage = document.createElement('img');
  movieImage.classList.add('movie-poster');
  movieImage.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
  movieImage.alt = movie.title;
  movieCard.appendChild(movieImage);

  const movieVotes = document.createElement('p');
  movieVotes.classList.add('movie-votes');
  movieVotes.textContent = `⭐️ ${movie.vote_average}`;
  movieCard.appendChild(movieVotes);

  const movieTitle = document.createElement('p');
  movieTitle.classList.add('movie-title');
  movieTitle.textContent = movie.title;
  movieCard.appendChild(movieTitle);

  return movieCard;
};

// Function to render movies
const renderMovies = (movies) => {
  moviesContainer.innerHTML = '';
  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    moviesContainer.appendChild(movieCard);
  });
};

// Function to load more movies
const loadMoreMovies = async () => {
  page++;
  let movies = [];
  if (query === '') {
    movies = await fetchMovies();
  } else {
    movies = await searchMovies();
  }
  currentMovies = [...currentMovies, ...movies];
  renderMovies(currentMovies);
};

// Function to search movies
const searchMovies = async () => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;
    currentMovies = movies;
    moviesContainer.innerHTML = '';
    renderMovies(movies);
    page++;
    return movies;
  } catch (error) {
    console.log('Error searching movies:', error);
    return [];
  }
};

// Function to clear search results
const clearResults = () => {
  moviesContainer.innerHTML = '';
  renderMovies(currentMovies);
};

const clearResultsAndLoadOriginal = async () => {
  searchInput.value = '';
  query = '';
  page = 1;
  currentMovies = [];
  const movies = await fetchMovies();
  currentMovies = movies;
  renderMovies(movies);
};

const closeSearch = async () => {
  searchInput.value = '';
  query = '';
  page = 1;
  currentMovies = [];
  const movies = await fetchMovies();
  currentMovies = movies;
  renderMovies(movies);
  moviesContainer.classList.remove('search-active');
};

