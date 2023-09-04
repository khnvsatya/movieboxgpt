import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies && (
      <div className="bg-black w-[100%]">
        <div className=" -mt-60 relative z-10">
          <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
          <MovieList
            title={"Upcomming Movies"}
            movies={movies.upCommingMovies}
          />
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList
            title={"Top-Rated Movies"}
            movies={movies.topRatedMovies}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
