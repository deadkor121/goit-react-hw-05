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
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { fetchSearchMovies } from '../../filmsApi';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../../components/SearchForm/SearchForm';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [arrMovies, setArrMovies] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

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

// import { useState, useEffect } from 'react';
// import { Field, Form, Formik } from 'formik';
// import { fetchSearchMovies } from '../../filmsApi';
// import Loader from '../../components/Loader/Loader';
// import MovieList from '../../components/MovieList/MovieList';
// import { useSearchParams } from 'react-router-dom';

// const MoviesPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [params, setParams] = useSearchParams();

//   const filmQuery = params.get('query') ?? '';

//   useEffect(() => {
//     if (searchQuery === '') {
//       return;
//     }

//     async function getMoviesbySearchQuery() {
//       try {
//         setIsLoading(true);
//         setError(false);
//         const dataResp = await fetchSearchMovies(searchQuery);
//         if (dataResp.length === 0) {
//           setError('No movies found per your request');
//         }
//         setMovies(dataResp);
//       } catch (error) {
//         setError('Oops, http issue!');
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     getMoviesbySearchQuery();
//   }, [searchQuery]);

//   useEffect(() => {
//     async function getMovies() {
//       if (filmQuery !== '') {
//         try {
//           setIsLoading(true);
//           setError(false);
//           const dataResp = await fetchSearchMovies(filmQuery);
//           setMovies(dataResp);
//         } catch (error) {
//           setError('Oops, http issue!');
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     }

//     getMovies();
//   }, [filmQuery]);

//   const handleSearch = newQuery => {
//     if (newQuery.trim() === '') {
//       setError('The query is empty, please input search request');
//       return;
//     }
//     setMovies([]);
//     setSearchQuery(newQuery);
//     setParams(params => ({
//       ...params,
//       // we use the name to tell Formik which key of `values` to update
//       query: newQuery,
//     }));
//     setSearchQuery('');
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={{ query: searchQuery }}
//         onSubmit={(values, actions) => {
//           handleSearch(values.query);
//           actions.resetForm();
//         }}
//       >
//         <Form>
//           <Field name="query" placeholder="Search movies" />
//           <button type="submit">Search</button>
//         </Form>
//       </Formik>

//       {error ? (
//         <div>{error}</div>
//       ) : (
//         <>
//           {!isLoading && !error && movies.length > 0 && (
//             <MovieList movies={movies} />
//           )}
//           {isLoading && <Loader />}
//         </>
//       )}
//     </div>
//   );
// };

// export default MoviesPage;
