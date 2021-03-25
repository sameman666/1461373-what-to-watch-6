import {ActionType} from '../action';

const initialState = {
  isServerError: false,
  isMailError: ``
};

const serverError = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SERVER_ERROR:
      return {
        ...state,
        isServerError: action.payload,
      };
    case ActionType.SET_MAIL_ERROR:
      return {
        ...state,
        isMailError: action.payload,
      };
  }

  return state;
};

export {serverError};
