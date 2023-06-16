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

