import {ActionType} from './action';
import {temporaryFilms} from '../mocks/films';

const initialState = {
  genre: `All genres`,
  films: temporaryFilms
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GENRE_CHANGES:
      return {
        ...state,
        genre: action.payload
      };
  }

  return state;
};

export {reducer};
