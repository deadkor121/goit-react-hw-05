import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect, lazy } from "react";
import clsx from "clsx";

import { getSearchMovies } from "../../sevices/API";

const ErrorMessege = lazy(() =>
  import("../../components/ErrorMessege/ErrorMessege")
);
const MovieList = lazy(() => import("../../components/MovieList/MovieList"));
import Loader from "../../components/Loader/Loader";

import style from "./MoviesPage.module.css";
// import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [showList, setShowList] = useState("");
  const [arrMovies, setArrMovies] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  //   const [searchParams, setSearchParams] = useSearchParams();

  //   console.log(searchParams.get("name"));

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { search } = form.elements;
    if (search.value.length === 0) {
      toast.error("The input field is empty! Please write a word to search.", {
        icon: "😰",
      });
    } else {
      setShowList(search.value);
    }
  };

  useEffect(() => {
    async function getListMovies() {
      if (showList.length === 0) return;
      try {
        setShowError(false);
        setShowLoader(true);
        const data = await getSearchMovies(showList);
        setArrMovies(data);
      } catch (error) {
        setShowError(true);
      } finally {
        setShowLoader(false);
      }
    }
    getListMovies();
  }, [showList]);

  return (
    <>
      <div className={clsx(style.searchBox)}>
        <form className={clsx(style.moviesForm)} onSubmit={handleSubmit}>
          <input
            className={clsx(style.moviesInput)}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search films and movies"
          />
          <button className={clsx(style.formButton)} type="submit">
            Search
          </button>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      {showLoader && <Loader />}
      {showError ? (
        <ErrorMessege />
      ) : (
        <div className={clsx(style.searchContainer)}>
          <MovieList moviesList={arrMovies} />
        </div>
      )}
    </>
  );
};

export default MoviesPage;
