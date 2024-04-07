import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { getMovieReviews } from "../../sevices/API";
import style from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { moviesId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    async function getInfoMovieReviews() {
      try {
        const data = await getMovieReviews(moviesId);
        setMovieReviews(data.results);
      } catch (error) {
        console.log("error: ", error);
      } finally {
        console.log();
      }
    }

    getInfoMovieReviews();
  }, [moviesId]);

  return (
    <div>
      {movieReviews.length === 0 ? (
        <p>We don`t have any reviews for this movie</p>
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
