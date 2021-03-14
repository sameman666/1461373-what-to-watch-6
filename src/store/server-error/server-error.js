import {ActionType} from '../action';

const initialState = {
  isServerError: false
};

const serverError = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SERVER_ERROR:
      return {
        ...state,
        isServerError: action.payload,
      };
  }

  return state;
};

export {serverError};
