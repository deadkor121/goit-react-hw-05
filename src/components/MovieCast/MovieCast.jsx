import { getCreditsById } from '../../filmsApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const imagePath = 'https://image.tmdb.org/t/p/w500/';
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCredits() {
      try {
        setIsLoading(true);
        const data = await getCreditsById(movieId);
        setCredits(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getCredits();
  }, [movieId]);
  return (
    <div>
      {isLoading && <Loader />}
      {error && <b>HTTP error!</b>}
      <ul className={css.castList}>
        {credits &&
          credits.cast &&
          credits.cast.map(actor => (
            <li key={actor.id} className={css.castListItem}>
              <img src={`${imagePath}${actor.profile_path}`} alt={actor.name} />
              <p>{actor.name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieCast;
