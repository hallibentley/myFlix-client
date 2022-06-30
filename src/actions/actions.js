//initializes list of movies//
export const SET_MOVIES = 'SET_MOVIES';
//filters movie list//
export const SET_FILTER = 'SET_FILTER';
//sets the user//
export const SET_USER = 'SET_USER';

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

export function setUser(value) {
  return {
    type: SET_USER,
    value
  };
}