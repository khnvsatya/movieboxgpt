import React from "react";
import { BG_URL } from "../utils/constants";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-20">
        <img src={BG_URL} alt="page-background" />
      </div>
      <GptSearchBar />
    </div>
  );
};

export default GptSearch;
