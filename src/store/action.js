export const ActionType = {
  GENRE_CHANGES: `genre/change`,
  LOAD_FILMS: `data/loadFilms`,
  LOAD_FILM_BY_ID: `data/loadFilmById`,
  LOAD_COMMENTS_BY_ID: `data/loadCommentsById`,
  REDIRECT_TO_ROUTE: `route/redirectToRoute`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  LOAD_PROMO_FILM: `data/loadPromoFilm`,
  SET_AVATAR: `user/avatar`,
  SET_SERVER_ERROR: `server/error`,
  SET_SENDING_COMMENT_STATUS: `data/setSendingCommentStatus`
};

export const changeGenre = (genre) => ({
  type: ActionType.GENRE_CHANGES,
  payload: genre
});

export const loadFilms = (films) => ({
  type: ActionType.LOAD_FILMS,
  payload: films
});

export const loadFilmById = (film) => ({
  type: ActionType.LOAD_FILM_BY_ID,
  payload: film
});

export const loadCommentsById = (comments) => ({
  type: ActionType.LOAD_COMMENTS_BY_ID,
  payload: comments
});

export const loadPromoFilm = (film) => ({
  type: ActionType.LOAD_PROMO_FILM,
  payload: film
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url
});

export const setAvatar = (url) => ({
  type: ActionType.SET_AVATAR,
  payload: url
});

export const setServerError = (bool) => ({
  type: ActionType.SET_SERVER_ERROR,
  payload: bool
});

export const setSendingCommentStatus = (bool) => ({
  type: ActionType.SET_SENDING_COMMENT_STATUS,
  payload: bool
});
