import { useEffect, useState } from "react";
import { useParams, useHistory, useSearchParams } from "react-router-dom"; // Додатково імпортуємо хук useSearchParams
import clsx from "clsx";

import { getMovieReviews } from "../../sevices/API";
import style from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const history = useHistory();
  const [movieReviews, setMovieReviews] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function getInfoMovieReviews() {
      try {
        const data = await getMovieReviews(movieId);
        setMovieReviews(data.results);
      } catch (error) {
        console.log("error: ", error);
      }
    }

    getInfoMovieReviews();
  }, [movieId]);

  useEffect(() => {
    setSearchParams(searchParams);
  }, [searchParams]); // Передаємо параметри у URL

  return (
    <div>
      {movieReviews.length === 0 ? (
        <p>We don't have any reviews for this movie</p>
      ) : (
        <ul className={clsx(style.reviewsList)}>
          {Array.isArray(movieReviews) &&
            movieReviews.map((item) => {
              return (
                <li className={clsx(style.reviewsItem)} key={item.id}>
                  <h3>{item.author}</h3>
                  <p className={clsx(style.itemName)}>{item.content}</p>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
