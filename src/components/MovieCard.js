import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({ path, movieId }) => {
  return (
    path && (
      <Link to={"info/" + movieId}>
        <div className="w-36 md:w-48 pr-4">
          <img alt="Movie Card" src={`${IMG_CDN_URL}${path}`} />
        </div>
      </Link>
    )
  );
};

export default MovieCard;
