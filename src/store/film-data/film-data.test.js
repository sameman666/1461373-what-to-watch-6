import {filmData} from './film-data';
import {ActionType} from '../action';
import {Filters, APIRoute} from '../../const';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {fetchFilmList} from '../api-actions';

const api = createAPI(() => {});

describe(`Reducers work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(filmData(undefined, {}))
      .toEqual({
        genre: Filters.DEFAULT,
        films: [],
        favoriteFilms: [],
        promoFilm: {},
        film: {},
        isDataLoaded: false,
        isFilmLoaded: false,
        isFavoriteFilmsLoaded: false
      });
  });

  it(`Reducer should return state with changed genre`, () => {

    const genre = `fantasy`;

    const action = {
      type: ActionType.GENRE_CHANGES,
      payload: genre
    };

    const state = {
      genre: Filters.DEFAULT,
    };

    expect(filmData(state, action))
      .toEqual({genre: `fantasy`});
  });

  it(`Reducer should return state with films and change Data Loaded Status`, () => {

    const films = [
      {
        name: `name`,
        genre: `genre`
      },
      {
        name: `name`,
        genre: `genre`
      }
    ];

    const action = {
      type: ActionType.LOAD_FILMS,
      payload: films
    };

    const state = {
      films: [],
      isDataLoaded: false,
    };

    expect(filmData(state, action))
      .toEqual(
          {
            films: [
              {
                name: `name`,
                genre: `genre`
              },
              {
                name: `name`,
                genre: `genre`
              }
            ],
            isDataLoaded: true
          }
      );
  });

  it(`Reducer should return state with favorite films and change favorite films loaded status`, () => {

    const favoriteFilms = [
      {
        name: `name`,
        genre: `genre`
      },
      {
        name: `name`,
        genre: `genre`
      }
    ];

    const action = {
      type: ActionType.LOAD_FAVORITE,
      payload: favoriteFilms
    };

    const state = {
      favoriteFilms: [],
      isFavoriteFilmsLoaded: false
    };

    expect(filmData(state, action))
    .toEqual(
        {
          favoriteFilms: [
            {
              name: `name`,
              genre: `genre`
            },
            {
              name: `name`,
              genre: `genre`
            }
          ],
          isFavoriteFilmsLoaded: true
        }
    );
  });

  it(`Reducer should return state with actual load favorite status`, () => {

    const loadFavoriteStatus = true;

    const action = {
      type: ActionType.SET_LOAD_FAVORITE_STATUS,
      payload: loadFavoriteStatus
    };

    const state = {
      isFavoriteFilmsLoaded: false,
    };

    expect(filmData(state, action))
      .toEqual({isFavoriteFilmsLoaded: true});
  });

  it(`Reducer should return state with loaded film by iD and change film loaded status`, () => {

    const film = {
      name: `name`,
      genre: `genre`
    };

    const action = {
      type: ActionType.LOAD_FILM_BY_ID,
      payload: film
    };

    const state = {
      film: {},
      isFilmLoaded: false,
    };

    expect(filmData(state, action))
      .toEqual({film: {
        name: `name`,
        genre: `genre`
      }, isFilmLoaded: true});
  });

  it(`Reducer should return state with loadeded promo film `, () => {

    const promoFilm = {
      name: `name`,
      genre: `genre`
    };

    const action = {
      type: ActionType.LOAD_PROMO_FILM,
      payload: promoFilm
    };

    const state = {
      promoFilm: {},
    };

    expect(filmData(state, action))
      .toEqual({promoFilm: {
        name: `name`,
        genre: `genre`
      }});
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = fetchFilmList();

    apiMock
      .onGet(APIRoute.FILMS)
      .reply(200, [{fake: true}]);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [{fake: true}],
        });
      });
  });
});
