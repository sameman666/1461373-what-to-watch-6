import {NameSpace} from '../root-reducer';

export const getAuthorizationStatus = (state) => state[NameSpace.USER_DATA].authorizationStatus;
export const getAvatar = (state) => state[NameSpace.USER_DATA].avatarUrl;
