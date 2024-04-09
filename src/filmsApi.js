import axios from 'axios';

// URL базової адреси
const baseURL = 'https://api.themoviedb.org/3';

// Заголовок авторизації
const headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDE1ZDU1ZmJmNTJkZGJiMzgwYmY3OTRkMWQ5ZjE2ZCIsInN1YiI6IjY1ZjVkYmFhZDRkNTA5MDE2NGFiNGJhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JLcjF8iHOjbCLIG4N99UwwNYG-BrarS14qIyT4eAAw8',
};

// Функція для отримання трендових фільмів
export const fetchTrendingMovies = async () => {
  const response = await axios.get('trending/movie/day', { baseURL, headers });
  return response.data.results;
};

// Функція для отримання деталей фільму за його ID
export const getMovieById = async movieId => {
  const response = await axios.get(`movie/${movieId}`, { baseURL, headers });
  return response.data;
};

// Функція для отримання кредитів фільму за його ID
export const getCreditsById = async movieId => {
  const response = await axios.get(`movie/${movieId}/credits`, {
    baseURL,
    headers,
  });
  return response.data;
};

// Функція для отримання відгуків фільму за його ID
export const getReviewsById = async movieId => {
  const response = await axios.get(`movie/${movieId}/reviews`, {
    baseURL,
    headers,
  });
  return response.data.results;
};

// Функція для пошуку фільмів за запитом
export const fetchSearchMovies = async searchQuery => {
  const response = await axios.get('search/movie', {
    baseURL,
    headers,
    params: {
      query: searchQuery,
    },
  });
  return response.data.results;
};
