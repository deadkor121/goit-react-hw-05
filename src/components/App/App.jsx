import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import css from './App.module.css';
import Navigation from '../Navigation/Navigation';
import Loader from '../Loader/Loader';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));

const App = () => {
  return (
    <>
      <Navigation />
      <div className={css.container}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;

// 0015d55fbf52ddbb380bf794d1d9f16d

// токен
// eyJhbGciOiJIUzI1NiJ9
//   .eyJhdWQiOiIwMDE1ZDU1ZmJmNTJkZGJiMzgwYmY3OTRkMWQ5ZjE2ZCIsInN1YiI6IjY1ZjVkYmFhZDRkNTA5MDE2NGFiNGJhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ
//   .JLcjF8iHOjbCLIG4N99UwwNYG - BrarS14qIyT4eAAw8;
