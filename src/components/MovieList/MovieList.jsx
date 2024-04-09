
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import React from "react";
import { NavLink } from "react-router-dom";

import clsx from "clsx";
import style from "./MovieList.module.css";

const MovieList = ({ moviesList }) => {
  const location = useLocation();

  return (
    <ul className={clsx(style.list)}>
      {Array.isArray(moviesList) &&
        moviesList.map((item) => {
          return (
            <li className={clsx(style.item)} key={item.id}>
              <Link
                to={`/movies/${item.id}`}
                state={`${location.pathname}${location.search}`}
              >
                {item.title}
              </Link>

              <NavLink to={`/movies/${item.id}`} state={{ location }}>
                {item.title}
              </NavLink>

            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
