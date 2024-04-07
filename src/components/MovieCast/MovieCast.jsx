import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { getMovieCast } from "../../sevices/API";
import style from "./MovieCast.module.css";

const MovieCast = () => {
  const { moviesId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    async function getInfoMoviesCast() {
      try {
        const data = await getMovieCast(moviesId);
        setMovieCast(data.cast);
      } catch (error) {
        console.log("error: ", error);
      } finally {
        console.log();
      }
    }

    getInfoMoviesCast();
  }, [moviesId]);

  return (
    <ul className={clsx(style.castList)}>
      {Array.isArray(movieCast) &&
        movieCast.map((item) => {
          return (
            <li className={clsx(style.castItem)} key={item.id}>
              <img
                className={clsx(style.itemImg)}
                src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                alt=""
              />
              <p className={clsx(style.itemName)}>{item.name}</p>
            </li>
          );
        })}
    </ul>
  );
};
export default MovieCast;
