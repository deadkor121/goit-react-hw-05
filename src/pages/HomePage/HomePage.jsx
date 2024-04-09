import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../filmsApi';
import Loader from '../../components/Loader/Loader';
import css from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [trendingFilms, setTrendingFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        const dataResp = await fetchTrendingMovies();
        setTrendingFilms(dataResp);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);
  return (
    <div className={css.homePageBody}>
      <h2 className={css.title}>Trending today</h2>
      <ul className={css.dataList}>
        {isLoading && <Loader />}
        {error && <b>HTTP error!</b>}
        <MovieList movies={trendingFilms} />
      </ul>
    </div>
  );
};

export default HomePage;
