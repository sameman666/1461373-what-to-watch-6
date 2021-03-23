import {userData} from './user-data';
import {ActionType} from '../action';
import {AuthorizationStatus} from '../../const';
import {createAPI} from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import {checkAuth, login} from '../api-actions';
import {APIRoute, AppRoute} from '../../const';

const api = createAPI(() => {});

describe(`Reducers work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(userData(undefined, {}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        avatarUrl: null,
      });
  });

  it(`Reducer should return state with authorized status`, () => {

    const authorizationStatus = AuthorizationStatus.AUTH;

    const action = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: authorizationStatus
    };

    const state = {
      authorizationStatus: AuthorizationStatus.NO_AUTH
    };

    expect(userData(state, action))
      .toEqual({authorizationStatus: `AUTH`});
  });

  it(`Reducer should return state with setted avatar`, () => {

    const avatarUrl = `https://test.com`;

    const action = {
      type: ActionType.SET_AVATAR,
      payload: avatarUrl
    };

    const state = {
      avatarUrl: null
    };

    expect(userData(state, action))
      .toEqual({avatarUrl: `https://test.com`});
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /login with GET`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return checkAuthLoader(dispatch, () => {}, api)
      .then((response) => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AVATAR,
          payload: response,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it(`Should make a correct API call to /login with POST`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `test@test.ru`, password: `123456`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return loginLoader(dispatch, () => {}, api)
      .then((response) => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AVATAR,
          payload: response,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.ROOT,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.SET_SERVER_ERROR,
          payload: false,
        });
      });
  });
});
