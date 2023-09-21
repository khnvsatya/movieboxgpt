import React, { useState } from "react";
import { BG_URL } from "../utils/constants";
import GptSearchBar from "./GptSearchBar";
import MovieSuggestions from "./MovieSuggestions";

const GptSearch = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="fixed -z-20">
        <img src={BG_URL} alt="page-background" />
      </div>
      <GptSearchBar loading={loading} setLoading={setLoading} />

      <MovieSuggestions loading={loading} setLoading={setLoading} />
    </div>
  );
};

export default GptSearch;
