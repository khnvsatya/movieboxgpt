import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const MovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames)
    return (
      <div className="p-4 m-4 bg-black text-white bg-opacity-90">
        <p className="text-center">
          Ask CHATGPT and Get Movie Suggestions in Your Language: ☝
        </p>
      </div>
    );
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <p className="text-center">Gpt Suggestions For You are:👇</p>
      <p className="text-center m-3">
        {movieNames.map((movieName, index) => (
          <span key={movieName} className=" text-xl">
            <span className=" text-amber-400">{index + 1}.</span>
            {` ${movieName} `}
          </span>
        ))}
      </p>

      {movieNames?.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults[index]}
        />
      ))}
    </div>
  );
};

export default MovieSuggestions;
