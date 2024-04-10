import React, { useState, useEffect } from 'react';
import { fetchSearchMovies } from '../../filmsApi';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../../components/SearchForm/SearchForm';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params] = useSearchParams();
  const [lastSearchQuery, setLastSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData(query) {
      if (query !== '') {
        try {
          setIsLoading(true);
          setError(false);
          const dataResp = await fetchSearchMovies(query);
          if (dataResp.length === 0) {
            setError('No movies found for your request');
          }
          setMovies(dataResp);
          setLastSearchQuery(query);
        } catch (error) {
          setError('Oops, HTTP issue!');
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchData(params.get('query') || '');
  }, [params]);

  const handleSearch = async newQuery => {
    if (newQuery.trim() === '') {
      setError('The query is empty, please input a search request');
      return;
    }

    setMovies([]);
    params.set('query', newQuery);
  };

  return (
    <div className={css.searchPage}>
      <SearchForm
        lastSearchQuery={lastSearchQuery}
        handleSearch={handleSearch}
      />
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          <ul className={css.movieList}>
            {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
            {isLoading && <Loader />}
          </ul>
        </>
      )}
    </div>
  );
};

export default MoviesPage;
