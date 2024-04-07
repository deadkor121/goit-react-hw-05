import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import clsx from "clsx";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

import { getDetailsMovies } from "../../sevices/API";
import style from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [itemCardMovie, setItemCardMovie] = useState([]);
  const { moviesId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function getItemMovies() {
      try {
        const data = await getDetailsMovies(moviesId);
        setItemCardMovie(data);
      } catch (error) {
        console.log("error: ", error);
      } finally {
        console.log();
      }
    }

    getItemMovies();
  }, [moviesId]);

  return (
    <div className={clsx(style.details)}>
      <Link className={clsx(style.detailsButton)} to={backLinkRef.current}>
        ⬅ Go Back
      </Link>
      <div className={clsx(style.detailsBox)}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${itemCardMovie.backdrop_path}`}
          alt=""
        />
        <div>
          <h2>{itemCardMovie.original_title}</h2>
          <p>
            User Score:{" "}
            {itemCardMovie.length !== 0 &&
              itemCardMovie.vote_average.toFixed(2)}
            %
          </p>
          <h3>Overview</h3>
          <p>{itemCardMovie.overview}</p>
          <p>Genres</p>
          <ul className={clsx(style.genresList)}>
            {Array.isArray(itemCardMovie.genres) &&
              itemCardMovie.genres.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })}
          </ul>
        </div>
      </div>
      <div className={clsx(style.boxAdditional)}>
        <h3>Additional information:</h3>
        <ul className={clsx(style.additionalList)}>
          <li className={clsx(style.additionalItem)}>
            <Link to="cast">Cast</Link>
          </li>
          <li className={clsx(style.additionalItem)}>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
