import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpCommingMovies } from "../utils/movieSlice";

const useUpCommingMovies = () => {
  const dispatch = useDispatch();

  const UpCommingMovies = useSelector((store) => store.movies?.upCommingMovies);

  const getUpCommingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=te-IN&page=1&region=IN",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addUpCommingMovies(json.results));
  };

  useEffect(() => {
    !UpCommingMovies && getUpCommingMovies();
  }, []);
};

export default useUpCommingMovies;
