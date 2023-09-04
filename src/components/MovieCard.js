import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ path }) => {
  return (
    path && (
      <div className="w-36 md:w-48 pr-4">
        <img alt="Movie Card" src={`${IMG_CDN_URL}${path}`} />
      </div>
    )
  );
};

export default MovieCard;
