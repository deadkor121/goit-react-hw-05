import { useState, useEffect } from 'react';
import { fetchSearchMovies } from '../../filmsApi';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../../components/SearchForm/SearchForm';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();
  const [lastSearchQuery, setLastSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData(query) {
      if (query !== '') {
        try {
          setIsLoading(true);
          setError(false);
          const dataResp = await fetchSearchMovies(query);
          if (dataResp.length === 0) {
            setError('No movies found per your request');
          }
          setMovies(dataResp);
          setLastSearchQuery(query);
        } catch (error) {
          setError('Oops, http issue!');
        } finally {
          setIsLoading(false);
        }
      }
    }

    const searchQuery = params.get('query') || '';

    setLastSearchQuery(prevSearchQuery => {
      if (searchQuery !== prevSearchQuery) {
        fetchData(searchQuery);
      }
      return searchQuery;
    });
  }, [params]);

  const handleSearch = async newQuery => {
    if (newQuery.trim() === '') {
      setError('The query is empty, please input search request');
      return;
    }

    setMovies([]);
    setParams({ query: newQuery });
  };

  return (
    <div className={css.searchPage}>
      <SearchForm
        lastSearchQuery={lastSearchQuery}
        handleSearch={handleSearch}
      />
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          <ul className={css.movieList}>
            {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
            {isLoading && <Loader />}
          </ul>
        </>
      )}
    </div>
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
