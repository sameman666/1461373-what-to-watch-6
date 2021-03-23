import {serverError} from './server-error';
import {ActionType} from '../action';

describe(`Reducers work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(serverError(undefined, {}))
      .toEqual({isServerError: false});
  });

  it(`Reducer should return state with actual server error status`, () => {

    const serverErrorStatus = true;

    const action = {
      type: ActionType.SET_SERVER_ERROR,
      payload: serverErrorStatus
    };

    const state = {
      isServerError: false
    };

    expect(serverError(state, action))
      .toEqual({isServerError: true});
  });
});
