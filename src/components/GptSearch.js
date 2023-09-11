import React from "react";
import { BG_URL } from "../utils/constants";
import GptSearchBar from "./GptSearchBar";
import MovieSuggestions from "./MovieSuggestions";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-20">
        <img src={BG_URL} alt="page-background" />
      </div>
      <GptSearchBar />
      <MovieSuggestions />
    </div>
  );
};

export default GptSearch;
