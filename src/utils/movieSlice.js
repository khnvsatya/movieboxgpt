import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    topRatedMovies: null,
    upCommingMovies: null,
    movieDetails: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpCommingMovies: (state, action) => {
      state.upCommingMovies = action.payload;
    },
    addMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    resetAllMovieSets: (state) => {
      return {
        nowPlayingMovies: null,
        trailerVideo: null,
        popularMovies: null,
        topRatedMovies: null,
        upCommingMovies: null,
        movieDetails: null,
      };
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpCommingMovies,
  resetAllMovieSets,
  addMovieDetails,
} = movieSlice.actions;
export default movieSlice.reducer;
