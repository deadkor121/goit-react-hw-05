import { NavLink } from "react-router-dom";
import { useListMovies } from "../../hooks/useListMovies";
import clsx from "clsx";

import style from "./HomePage.module.css";

const HomePage = () => {
  const { topMovies } = useListMovies();

  return (
    <div className={clsx(style.homeContainer)}>
      <h1>Trending today</h1>
      <ul className={clsx(style.homeList)}>
        {Array.isArray(topMovies) &&
          topMovies.map((item) => {
            return (
              <li className={clsx(style.homeItem)} key={item.id}>
                <NavLink to={`/movies/${item.id}`}>{item.title}</NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default HomePage;
