import {NameSpace} from '../root-reducer';

export const getServerErrorStatus = (state) => state[NameSpace.SERVER_ERROR].isServerError;
export const getMailErrorStatus = (state) => state[NameSpace.SERVER_ERROR].isMailError;
