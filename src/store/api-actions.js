import {ActionCreator} from "./action";
import {AuthorizationStatus, AppRoute, APIRoute} from "../const";

export const fetchFilmList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(ActionCreator.loadFilms(data)))
);

export const fetchPromoFilm = () => (dispatch, _getState, api) => (
  api.get(APIRoute.PROMO_FILM)
    .then(({data}) => dispatch(ActionCreator.loadPromoFilm(data)))
);

export const fetchFilmById = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadFilmById(data)))
    .catch(() => dispatch(ActionCreator.redirectToRoute(AppRoute.NOT_FOUND)))
);

export const fetchCommentsById = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.COMMENTS}/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadCommentsById(data)))
    .catch(() => dispatch(ActionCreator.redirectToRoute(AppRoute.NOT_FOUND)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then((response) => dispatch(ActionCreator.setAvatar(response.data.avatar_url)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then((response) => dispatch(ActionCreator.setAvatar(response.data.avatar_url)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT)))
    .catch(() => {})
);

export const postReview = ({rating, comment}, id) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTS}/${id}`, {rating, comment})
    .then(({data}) => dispatch(ActionCreator.loadCommentsById(data)))
    .then(() => dispatch(ActionCreator.redirectToRoute(`${APIRoute.FILMS}/${id}`)))
    .catch()
);
