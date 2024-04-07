import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { getSearchMovies } from "../../sevices/API";

import style from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessege from "../../components/ErrorMessege/ErrorMessege";

const MoviesPage = () => {
  const [showList, setShowList] = useState("");
  const [arrMovies, setArrMovies] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);

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
          <ul className={clsx(style.searchList)}>
            {Array.isArray(arrMovies) &&
              arrMovies.map((item) => {
                return (
                  <li className={clsx(style.searchItem)} key={item.id}>
                    <NavLink to={`${item.id}`}>{item.title}</NavLink>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

export default MoviesPage;
