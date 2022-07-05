//initializes list of movies//
export const SET_MOVIES = 'SET_MOVIES';
//filters movie list//
export const SET_FILTER = 'SET_FILTER';
//sets the user//
export const SET_USER = 'SET_USER';

export function setMovies(value) {
  console.log('SET_MOVIES action reached');
  return {
    type: SET_MOVIES,
    value
  };
}

export function setFilter(value) {
  console.log('SET_FILTER action reached');
  return {
    type: SET_FILTER,
    value
  };
}

export function setUser(value) {
  console.log('SET_USER action reached');
  return {
    type: SET_USER,
    value
  };
}