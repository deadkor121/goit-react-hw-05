import { Suspense, useEffect, useState } from 'react';
import { Outlet, useParams, NavLink } from 'react-router-dom';
import { getMovieById } from '../../filmsApi';
import Loader from '../../components/Loader/Loader';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

const MovieDetailsPage = () => {
  const imagePath = 'https://image.tmdb.org/t/p/w500/';
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        const data = await getMovieById(movieId);

        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  const setLinkClass = ({ isActive }) => {
    return clsx(css.linkItem, isActive && css.linkActive);
  };

  return (
    <div className={css.container}>
      <ButtonBack />
      {isLoading && <Loader />}
      {error && <b>HTTP error!</b>}
      {movie && (
        <div className={css.contentWrapper}>
          <div className={css.imgWrapper}>
            <img
              src={`${imagePath}${movie.backdrop_path}`}
              alt={movie.title}
              className={css.contentImg}
            />
          </div>
          <div className={css.description}>
            <h2>
              {movie.title} ({movie.release_date.split('-')[0]})
            </h2>
            <p>User Score : {Math.round(movie.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <div>
              <h4>Genres</h4>
              <ul className={css.genresList}>
                {movie.genres.map(genre => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className={css.extraContentWrapper}>
        <p className={css.extraContent}>Additional information</p>
        <ul className={css.additionalList}>
          <li>
            <NavLink to="cast" className={setLinkClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={setLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
