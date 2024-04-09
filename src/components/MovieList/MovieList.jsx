import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const imagePath = 'https://image.tmdb.org/t/p/w500/';
  const location = useLocation();

  return (
    <>
      {movies.map(movie => (
        <li key={movie.id} className={css.listItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={css.itemLink}
          >
            <div className={css.imgWrapper}>
              <img
                src={`${imagePath}${movie.backdrop_path}`}
                alt={movie.title}
                className={css.listItemImg}
              />
            </div>

            <h3 className={css.itemTitle}>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </>
  );
};
export default MovieList;
