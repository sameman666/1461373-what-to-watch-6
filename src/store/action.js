export const ActionType = {
  GENRE_CHANGES: `genre/change`,
  LOAD_FILMS: `data/loadFilms`,
  LOAD_FILM_BY_ID: `data/loadFilmById`,
  LOAD_COMMENTS_BY_ID: `data/loadCommentsById`,
  REDIRECT_TO_ROUTE: `route/redirectToRoute`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  LOAD_PROMO_FILM: `data/loadPromoFilm`,
  SET_AVATAR: `user/avatar`
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.GENRE_CHANGES,
    payload: genre
  }),
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films
  }),
  loadFilmById: (film) => ({
    type: ActionType.LOAD_FILM_BY_ID,
    payload: film
  }),
  loadCommentsById: (comments) => ({
    type: ActionType.LOAD_COMMENTS_BY_ID,
    payload: comments
  }),
  loadPromoFilm: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: film
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url
  }),
  setAvatar: (url) => ({
    type: ActionType.SET_AVATAR,
    payload: url
  }),
};
