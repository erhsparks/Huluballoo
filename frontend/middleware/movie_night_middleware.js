import {
  fetchMovieNights,
  fetchMovieNight,
  createMovieNight
} from '../util/movie_night_api_util';

import {
  FETCH_MOVIE_NIGHTS,
  FETCH_MOVIE_NIGHT,
  CREATE_MOVIE_NIGHT,
  receiveMovieNights,
  receiveMovieNight,
  addMovieNight
} from '../actions/movie_night_actions';

const MovieNightMiddleware = ({ dispatch }) => next => action => {
  const movieNightsFetchSuccess = movieNights => dispatch(receiveMovieNights(movieNights));
  const movieNightFetchSuccess = movieNight => dispatch(receiveMovieNight(movieNight));
  const movieNightCreateSuccess = movieNight => dispatch(addMovieNight(movieNight));

  switch(action.type) {
    case FETCH_MOVIE_NIGHTS:
      fetchMovieNights(movieNightsFetchSuccess);
      return next(action);
    case FETCH_MOVIE_NIGHT:
      fetchMovieNight(action.id, movieNightFetchSuccess);
      return next(action);
    case CREATE_MOVIE_NIGHT:
      createMovieNight(action.movieNight, movieNightCreateSuccess);
      return next(action);
    default:
      return next(action);
  }
};

export default MovieNightMiddleware;
