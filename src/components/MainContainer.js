import React from "react";
import VideoTitile from "./VideoTitile";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpCommingMovies from "../hooks/useUpCommingMovies";

const MainContainer = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpCommingMovies();

  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const mainMovie = useSelector((store) => store.movies?.popularMovies);

  if (!movies || !mainMovie) return;

  // const mainMovie = movies[0];

  const { id, original_title, overview } = mainMovie[0];

  return (
    <div className="">
      <VideoTitile title={original_title} description={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
