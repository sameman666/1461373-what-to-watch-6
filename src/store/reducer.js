import {ActionType} from './action';
import {AuthorizationStatus, Filters} from '../const';

const initialState = {
  genre: Filters.DEFAULT,
  films: [],
  promoFilm: {},
  film: {},
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false,
  avatarUrl: null,
  isFilmLoaded: false,
  comments: [],
  isServerError: false
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.GENRE_CHANGES:
      return {
        ...state,
        genre: action.payload
      };
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
        isDataLoaded: true
      };
    case ActionType.LOAD_FILM_BY_ID:
      return {
        ...state,
        film: action.payload,
        isFilmLoaded: true,
      };
    case ActionType.LOAD_COMMENTS_BY_ID:
      return {
        ...state,
        comments: action.payload,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOAD_PROMO_FILM:
      return {
        ...state,
        promoFilm: action.payload,
      };
    case ActionType.SET_AVATAR:
      return {
        ...state,
        avatarUrl: action.payload,
      };
    case ActionType.SET_SERVER_ERROR:
      return {
        ...state,
        isServerError: action.payload,
      };
  }

  return state;
};

export {reducer};
