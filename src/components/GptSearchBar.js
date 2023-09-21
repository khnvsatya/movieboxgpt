import openai from "../utils/openai";
import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = ({ setLoading }) => {
  const langKey = useSelector((store) => store.config?.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovies = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-IN&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for a query :" +
      searchText.current.value +
      " in " +
      langKey +
      " language. only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar,Don,Golmal,Sholay,Koi Mil Gaya.";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      return null;
    }

    const gptMoviesList = gptResults.choices?.[0]?.message?.content.split(",");

    const tmdbPromiseArray = gptMoviesList.map((movie) => searchMovies(movie));

    const tmdbResults = await Promise.all(tmdbPromiseArray);

    dispatch(
      addGptMovieResult({
        movieNames: gptMoviesList,
        movieResults: tmdbResults,
      })
    );
    setLoading(false);
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => {
          e.preventDefault();
          if (searchText.current.value.length > 0) {
            setLoading(true);
            handleGptSearch();
          }
        }}
      >
        <input
          type="text"
          className="p-2 m-2 col-span-9 focus:outline-none"
          placeholder={lang[langKey].gptSearchPlaceholder}
          ref={searchText}
        />
        <button
          type="submit"
          className="col-span-3 m-2 py-2 bg-red-700 text-white"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
