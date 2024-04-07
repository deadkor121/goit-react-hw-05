import { useEffect, useState } from "react";
import { getTrendMovies } from "../sevices/API";

export const useListMovies = () => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    async function getTopMovies() {
      try {
        const data = await getTrendMovies();
        setTopMovies(data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    getTopMovies();
  }, []);

  return { topMovies };
};
