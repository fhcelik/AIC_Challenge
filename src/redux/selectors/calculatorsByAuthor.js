import * as R from 'ramda';
import { createSelector } from 'reselect';

const calculatorsByAuthor = R.prop('calculatorsByAuthor');

export const calculatorsByAuthorId = createSelector(
  (state, { id }) => id,
  calculatorsByAuthor,
  R.propOr([])
);
