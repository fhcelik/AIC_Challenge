import * as R from 'ramda';

export const userByIdSelector = (state, { id }) =>
  R.path(['entities', 'users', id], state);
