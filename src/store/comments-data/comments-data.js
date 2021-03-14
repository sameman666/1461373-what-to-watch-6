import {ActionType} from '../action';

const initialState = {
  comments: [],
  isSendingComment: false
};

const commentsData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_COMMENTS_BY_ID:
      return {
        ...state,
        comments: action.payload,
      };
    case ActionType.SET_SENDING_COMMENT_STATUS:
      return {
        ...state,
        isSendingComment: action.payload,
      };
  }

  return state;
};

export {commentsData};
