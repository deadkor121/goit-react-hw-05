import { useListMovies } from "../../hooks/useListMovies";
import clsx from "clsx";

import MovieList from "../../components/MovieList/MovieList";

import style from "./HomePage.module.css";

const HomePage = () => {
  const { topMovies } = useListMovies();

  return (
    <div className={clsx(style.homeContainer)}>
      <h1>Trending today</h1>
      <MovieList moviesList={topMovies} />
    </div>
  );
};

export default HomePage;
