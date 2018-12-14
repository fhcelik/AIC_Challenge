import * as R from 'ramda';
import { createSelector } from 'reselect';

const calculatorsByAuthorSelector = R.prop('calculatorsByAuthor');

const allCalculatorsByAuthorIdSelector = createSelector(
  (state, { id }) => id,
  calculatorsByAuthorSelector,
  R.propOr({})
);

const calculatorsByAuthorIdSelector = createSelector(
  allCalculatorsByAuthorIdSelector,
  R.propOr([], 'calculators')
);

export const myNewCalculatorsSelector = createSelector(
  allCalculatorsByAuthorIdSelector,
  R.propOr([], 'newCalculators')
);

export const newAndSavedCalculatorsByAuthorIdSelector = createSelector(
  (state, { isMyCalculators }) => isMyCalculators,
  calculatorsByAuthorIdSelector,
  myNewCalculatorsSelector,
  (isMyCalculators, calculatorIds, newCalculatorIds) =>
    !isMyCalculators ? calculatorIds : R.concat(calculatorIds, newCalculatorIds)
);
