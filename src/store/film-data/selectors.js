import {NameSpace} from '../root-reducer';
import {createSelector} from "reselect";
import {Filters} from '../../const';

export const getGenre = (state) => state[NameSpace.FILM_DATA].genre;
export const getFilms = (state) => state[NameSpace.FILM_DATA].films;
export const getPromoFilm = (state) => state[NameSpace.FILM_DATA].promoFilm;
export const getFilm = (state) => state[NameSpace.FILM_DATA].film;
export const getDataLoadedStatus = (state) => state[NameSpace.FILM_DATA].isDataLoaded;
export const getFilmLoadedStatus = (state) => state[NameSpace.FILM_DATA].isFilmLoaded;

export const getFilterMoviesByGenre = createSelector(
    [getGenre, getFilms],
    (genre, films) => {
      if (genre === Filters.DEFAULT) {
        return films;
      }
      return films.filter((film)=>film.genre === genre);
    }
);
