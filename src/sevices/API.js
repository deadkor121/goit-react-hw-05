// Ключ API - 9cc377b2ec4408f2c566215c7f463d66
// Ключ доступа к API - eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2MzNzdiMmVjNDQwOGYyYzU2NjIxNWM3ZjQ2M2Q2NiIsInN1YiI6IjY2MGY4YzRhZDQ4Y2VlMDE5ZmJkODVkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFJhlmFYG2w0SoscCPSIM0TOJWVvZ_VrYf-QC-eylIc

import axios from "axios";

export async function getSearchMovies(search) {
  if (search.length === 0) return;

  const url = `https://api.themoviedb.org/3/search/movie?query=${search}`;
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2MzNzdiMmVjNDQwOGYyYzU2NjIxNWM3ZjQ2M2Q2NiIsInN1YiI6IjY2MGY4YzRhZDQ4Y2VlMDE5ZmJkODVkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFJhlmFYG2w0SoscCPSIM0TOJWVvZ_VrYf-QC-eylIc",
    },
  };

  const res = await axios.get(url, options);
  if (res.data.results.length === 0) {
    throw new Error("Error!");
  } else {
    return res.data.results;
  }
}

export async function getTrendMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day`;
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2MzNzdiMmVjNDQwOGYyYzU2NjIxNWM3ZjQ2M2Q2NiIsInN1YiI6IjY2MGY4YzRhZDQ4Y2VlMDE5ZmJkODVkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFJhlmFYG2w0SoscCPSIM0TOJWVvZ_VrYf-QC-eylIc",
    },
  };

  const res = await axios.get(url, options);
  if (res.data.results.length === 0) {
    throw new Error("Error!");
  } else {
    return res.data.results;
  }
}

export async function getDetailsMovies(moviesId) {
  const url = `https://api.themoviedb.org/3/movie/${moviesId}`;
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2MzNzdiMmVjNDQwOGYyYzU2NjIxNWM3ZjQ2M2Q2NiIsInN1YiI6IjY2MGY4YzRhZDQ4Y2VlMDE5ZmJkODVkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFJhlmFYG2w0SoscCPSIM0TOJWVvZ_VrYf-QC-eylIc",
    },
  };

  const res = await axios.get(url, options);
  if (res.data.length === 0) {
    throw new Error("Error!");
  } else {
    return res.data;
  }
}

export async function getMovieCast(moviesId) {
  const url = `https://api.themoviedb.org/3/movie/${moviesId}/credits`;
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2MzNzdiMmVjNDQwOGYyYzU2NjIxNWM3ZjQ2M2Q2NiIsInN1YiI6IjY2MGY4YzRhZDQ4Y2VlMDE5ZmJkODVkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFJhlmFYG2w0SoscCPSIM0TOJWVvZ_VrYf-QC-eylIc",
    },
  };

  const res = await axios.get(url, options);
  if (res.data.length === 0) {
    throw new Error("Error!");
  } else {
    return res.data;
  }
}

export async function getMovieReviews(moviesId) {
  const url = `https://api.themoviedb.org/3/movie/${moviesId}/reviews`;
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2MzNzdiMmVjNDQwOGYyYzU2NjIxNWM3ZjQ2M2Q2NiIsInN1YiI6IjY2MGY4YzRhZDQ4Y2VlMDE5ZmJkODVkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFJhlmFYG2w0SoscCPSIM0TOJWVvZ_VrYf-QC-eylIc",
    },
  };

  const res = await axios.get(url, options);
  if (res.data.length === 0) {
    throw new Error("Error!");
  } else {
    return res.data;
  }
}
