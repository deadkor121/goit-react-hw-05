import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsById } from '../../filmsApi';
import Loader from '../Loader/Loader';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        const data = await getReviewsById(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getReviews();
  }, [movieId]);
  return (
    <div>
      {isLoading && <Loader />}
      {error && <b>HTTP error!</b>}
      <ul className={css.reviewList}>
        {reviews.length ? (
          reviews.map(review => (
            <li key={review.id} className={css.reviewListItem}>
              <p className={css.reviewAuthor}>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <div>We do not have any reviews on this film</div>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
