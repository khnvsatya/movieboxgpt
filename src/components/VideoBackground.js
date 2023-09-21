import React from "react";

import { useSelector } from "react-redux";

import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="w-[100%]">
      <iframe
        className="w-[100%] aspect-video "
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1&controls=0"
        }
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
        allow=" accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
