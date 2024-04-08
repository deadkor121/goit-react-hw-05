import { NavLink } from "react-router-dom";
import clsx from "clsx";

import style from "./MovieList.module.css";

const MovieList = ({ moviesList }) => {
  return (
    <ul className={clsx(style.list)}>
      {Array.isArray(moviesList) &&
        moviesList.map((item) => {
          return (
            <li className={clsx(style.item)} key={item.id}>
              <NavLink to={`/movies/${item.id}`}>{item.title}</NavLink>
            </li>
          );
        })}
    </ul>
  );
};
export default MovieList;
