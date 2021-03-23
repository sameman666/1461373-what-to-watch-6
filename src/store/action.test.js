import {Filters} from '../const';
import {ActionType, changeGenre, loadFavorite, loadFilms, setLoadFavoriteStatus, loadFilmById, loadCommentsById, loadPromoFilm, requireAuthorization, redirectToRoute, setAvatar, setServerError, setSendingCommentStatus} from './action';


describe(`Action creators work correctly`, () => {

  it(`Action creator for change genre returns correct action`, () => {
    const expectedAction = {
      type: ActionType.GENRE_CHANGES,
      payload: Filters.DEFAULT,
    };

    expect(changeGenre(Filters.DEFAULT)).toEqual(expectedAction);
  });

  it(`Action creator for load films returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FILMS,
      payload: [],
    };

    const films = [];

    expect(loadFilms(films)).toEqual(expectedAction);
  });

  it(`Action creator for load favorite returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITE,
      payload: [],
    };

    const favorites = [];

    expect(loadFavorite(favorites)).toEqual(expectedAction);
  });

  it(`Action creator for set load favorite status returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_LOAD_FAVORITE_STATUS,
      payload: true,
    };

    const loadFavoriteStatus = true;

    expect(setLoadFavoriteStatus(loadFavoriteStatus)).toEqual(expectedAction);
  });

  it(`Action creator for load film by ID returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FILM_BY_ID,
      payload: {},
    };

    const film = {};

    expect(loadFilmById(film)).toEqual(expectedAction);
  });

  it(`Action creator for load comments by ID returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_COMMENTS_BY_ID,
      payload: []
    };

    const comments = [];

    expect(loadCommentsById(comments)).toEqual(expectedAction);
  });

  it(`Action creator for load promo film returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_PROMO_FILM,
      payload: {}
    };

    const promoFilm = {};

    expect(loadPromoFilm(promoFilm)).toEqual(expectedAction);
  });

  it(`Action creator for require authorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true
    };

    const authorizationStatus = true;

    expect(requireAuthorization(authorizationStatus)).toEqual(expectedAction);
  });

  it(`Action creator for redirect to route returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `https://test.com`
    };

    const url = `https://test.com`;

    expect(redirectToRoute(url)).toEqual(expectedAction);
  });

  it(`Action creator for set user avatar returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_AVATAR,
      payload: `https://test.com`
    };

    const url = `https://test.com`;

    expect(setAvatar(url)).toEqual(expectedAction);
  });

  it(`Action creator for set server error status returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_SERVER_ERROR,
      payload: false
    };

    const isServerError = false;

    expect(setServerError(isServerError)).toEqual(expectedAction);
  });

  it(`Action creator for set sending comment status returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_SENDING_COMMENT_STATUS,
      payload: false
    };

    const sendingCommentStatus = false;

    expect(setSendingCommentStatus(sendingCommentStatus)).toEqual(expectedAction);
  });
});
