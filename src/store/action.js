export const ActionType = {
  GENRE_CHANGES: `genre/change`
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.GENRE_CHANGES,
    payload: genre
  }),
};
