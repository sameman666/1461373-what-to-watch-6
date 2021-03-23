import {commentsData} from './comments-data';
import {ActionType} from '../action';

describe(`Reducers work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(commentsData(undefined, {}))
      .toEqual({comments: [], isSendingComment: false});
  });

  it(`Reducer should return state with actual comments by ID`, () => {

    const comments = [`comment1`, `comment2`];

    const action = {
      type: ActionType.LOAD_COMMENTS_BY_ID,
      payload: comments
    };

    const state = {
      comments: [],
    };

    expect(commentsData(state, action))
      .toEqual({comments: [`comment1`, `comment2`]});
  });

  it(`Reducer should set sending comment status`, () => {

    const sendingCommentStatus = true;

    const action = {
      type: ActionType.SET_SENDING_COMMENT_STATUS,
      payload: sendingCommentStatus
    };

    const state = {
      isSendingComment: false,
    };

    expect(commentsData(state, action))
      .toEqual({isSendingComment: true});
  });
});
