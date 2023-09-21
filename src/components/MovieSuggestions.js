import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const MovieSuggestions = ({ loading }) => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames) {
    return (
      <div className="p-4 m-4 bg-black text-white bg-opacity-90">
        <p className="text-center">
          Ask CHATGPT and Get Movie Suggestions in Your Language: ☝
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <p className="text-center">Chat-Gpt Suggestions For You are:👇</p>
      {loading ? (
        <p className="text-center text-lg m-3">
          Movie Suggestions are Loading...
        </p>
      ) : (
        <div>
          {movieNames.join("").length > 150 ? (
            <div className="text-center px-12 py-6">
              {movieNames.join("\n")}
            </div>
          ) : (
            <div>
              <p className="text-center m-3 flex justify-center gap-8">
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
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSuggestions;
