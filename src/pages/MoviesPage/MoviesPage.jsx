import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect, lazy } from "react";
import clsx from "clsx";
import { fetchSearchMovies } from '../../filmsApi';
const ErrorMessagе = lazy(() => import("../../components/ErrorMessage/ErrorMessage"));
const MovieList = lazy(() => import("../../components/MovieList/MovieList"));
import Loader from "../../components/Loader/Loader";
import style from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [arrMovies, setArrMovies] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  
  const fetchData = async (query) => {
    if (query !== '') {
      try {
        setIsLoading(true);
        setError(false);
        const dataResp = await fetchSearchMovies(query);
        if (dataResp.length === 0) {
          setError('No movies found per your request');
        }
        setMovies(dataResp);
      } catch (error) {
        setError('Oops, http issue!');
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    const searchQuery = searchParams.get('query') || '';
    fetchData(searchQuery);
  }, [searchParams]);

  const handleSearch = async (newQuery) => {
    if (newQuery.trim() === '') {
      setError('The query is empty, please input a search request');
      return;
    }

    setMovies([]); // Clear previous search results
    setSearchParams({ query: newQuery });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const { search } = form.elements;
    if (search.value.length === 0) {
      toast.error("The input field is empty! Please write a word to search.", { icon: "😰" });
    } else {
      handleSearch(search.value);
    }
  };

  return (
    <>
      <div className={style.searchBox}>
        <form className={style.moviesForm} onSubmit={handleSubmit}>
          <input
            className={style.moviesInput}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search films and movies"
          />
          <button className={style.formButton} type="submit">
            Search
          </button>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      {showLoader && <Loader />}
      {showError ? (
        <ErrorMessagе />
      ) : (
        <div className={style.searchContainer}>
          <MovieList moviesList={arrMovies} />
        </div>
      )}
      <>
        {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
        {isLoading && <Loader />}
      </>
    </>
  );
};

export default MoviesPage; 
