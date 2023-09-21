import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMovieDetails } from "../utils/movieSlice";

const MovieInfo = () => {
  const { id } = useParams();
  const movieInfo = useSelector((store) => store.movies?.movieDetails);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  const getMovieDetails = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?&append_to_response=videos",
      API_OPTIONS
    );

    const json = await data.json();
    const MovieDetails = json;
    dispatch(addMovieDetails(MovieDetails));
  };
  useEffect(() => {
    user && getMovieDetails();
  }, []);

  const trailers = movieInfo?.videos?.results?.filter(
    (item) => item.type === "Trailer"
  );
  return (
    <>
      {user && (
        <div className="bg-black h-full">
          <div className="text-center  text-white justify-center align-middle h-full pt-[80px] px-[100px]">
            <div className=" text-white">
              <h2 className="text-3xl ">
                {movieInfo?.original_title}
                {movieInfo?.title !== movieInfo?.original_title
                  ? `(${movieInfo?.title})`
                  : ""}
              </h2>
              <p>
                (
                {movieInfo?.genres?.map((gen, index, array) => (
                  <span key={gen.name}>
                    {gen.name}
                    {(array?.length > 0) & (index < array?.length - 1)
                      ? " , "
                      : ""}
                  </span>
                ))}
                )
              </p>
              <p>Rating: {movieInfo?.vote_average.toFixed(0)} </p>

              <p>
                {movieInfo?.spoken_languages?.map((gen, index, array) => (
                  <span>
                    {gen.english_name}
                    {(array?.length > 0) & (index < array?.length - 1)
                      ? " , "
                      : ""}
                  </span>
                ))}
              </p>
              <span>Date: {movieInfo?.release_date}</span>
            </div>
            <div className="pt-6 flex">
              <div className=" w-[40%] m-[5%] mr-[10px]]">
                <img
                  src={`${IMG_CDN_URL}${movieInfo?.poster_path}`}
                  alt="movie-poster"
                  className=" w-[250px] h-[350px] mx-9"
                />
              </div>
              <div className="w-[50%] flex flex-col  align-middle  pt-12">
                <div>
                  <p className="text-justify">{movieInfo?.overview}</p>
                </div>
                <div className="flex justify-center h-full w-full m-[5%]">
                  {trailers && (
                    <div className="Trailer">
                      <iframe
                        className=" aspect-video h-full w-full "
                        src={
                          "https://www.youtube.com/embed/" +
                          trailers[0]?.key +
                          "?&autoplay=1&mute=1"
                        }
                        title="YouTube video player"
                        allowFullScreen
                        allow=" accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieInfo;
