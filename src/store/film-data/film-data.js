import {ActionType} from '../action';
import {Filters} from '../../const';

const initialState = {
  genre: Filters.DEFAULT,
  films: [],
  favoriteFilms: [],
  promoFilm: {},
  film: {},
  isDataLoaded: false,
  isFilmLoaded: false,
  isFavoriteFilmsLoaded: false
};

const filmData = (state = initialState, action) => {
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
    case ActionType.LOAD_FAVORITE:
      return {
        ...state,
        favoriteFilms: action.payload,
        isFavoriteFilmsLoaded: true
      };
    case ActionType.SET_LOAD_FAVORITE_STATUS:
      return {
        ...state,
        isFavoriteFilmsLoaded: action.payload
      };
    case ActionType.LOAD_FILM_BY_ID:
      return {
        ...state,
        film: action.payload,
        isFilmLoaded: true,
      };
    case ActionType.LOAD_PROMO_FILM:
      return {
        ...state,
        promoFilm: action.payload,
      };
  }

  return state;
};

export {filmData};
