import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="pl-12">
      <h1 className="text-xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-hide">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              path={movie.poster_path}
              movieId={movie.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
