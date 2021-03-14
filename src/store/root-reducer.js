import {combineReducers} from 'redux';
import {filmData} from './film-data/film-data';
import {commentsData} from './comments-data/comments-data';
import {userData} from './user-data/user-data';
import {serverError} from './server-error/server-error';

export const NameSpace = {
  FILM_DATA: `FILM_DATA`,
  COMMENTS_DATA: `COMMENTS_DATA`,
  USER_DATA: `USER_DATA`,
  SERVER_ERROR: `SERVER_ERROR`
};

export default combineReducers({
  [NameSpace.COMMENTS_DATA]: commentsData,
  [NameSpace.FILM_DATA]: filmData,
  [NameSpace.USER_DATA]: userData,
  [NameSpace.SERVER_ERROR]: serverError,
});
