import {NameSpace} from '../root-reducer';

export const getComments = (state) => state[NameSpace.COMMENTS_DATA].comments;
export const getCommentSendingStatus = (state) => state[NameSpace.COMMENTS_DATA].isSendingComment;
