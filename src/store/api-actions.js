import {loadFilms, loadPromoFilm, loadFilmById, redirectToRoute, loadCommentsById, setAvatar, requireAuthorization, setServerError, setSendingCommentStatus} from "./action";
import {AuthorizationStatus, AppRoute, APIRoute} from "../const";

export const fetchFilmList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(loadFilms(data)))
);

export const fetchPromoFilm = () => (dispatch, _getState, api) => (
  api.get(APIRoute.PROMO_FILM)
    .then(({data}) => dispatch(loadPromoFilm(data)))
);

export const fetchFilmById = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => dispatch(loadFilmById(data)))
    .catch(() => dispatch(redirectToRoute(AppRoute.NOT_FOUND)))
);

export const fetchCommentsById = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.COMMENTS}/${id}`)
    .then(({data}) => dispatch(loadCommentsById(data)))
    .catch(() => dispatch(redirectToRoute(AppRoute.NOT_FOUND)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then((response) => dispatch(setAvatar(response.data.avatar_url)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGOUT)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then((response) => dispatch(setAvatar(response.data.avatar_url)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
    .then(() => dispatch(setServerError(false)))
    .catch(() => dispatch(setServerError(true)))
);

export const postReview = ({rating, comment}, id) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTSa}/${id}`, {rating, comment})
    .then(({data}) => dispatch(loadCommentsById(data)))
    .then(() => dispatch(setSendingCommentStatus(false)))
    .then(() => dispatch(redirectToRoute(`${APIRoute.FILMS}/${id}`)))
    .then(() => dispatch(setServerError(false)))
    .catch(() => {
      dispatch(setServerError(true));
      dispatch(setSendingCommentStatus(false));
    })
);
