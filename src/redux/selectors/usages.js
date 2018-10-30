import * as R from 'ramda';

export const usagesSelector = (state, { id }) =>
  R.pathOr(0, ['entities', 'usages', id], state);
