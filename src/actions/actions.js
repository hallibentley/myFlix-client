//initializes list of movies//
export const SET_MOVIES = 'SET_MOVIES';
//filters movie list//
export const SET_FILTER = 'SET_FILTER';

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}
