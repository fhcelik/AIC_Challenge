import * as R from 'ramda';
import { createSelector } from 'reselect';
import { loggedInUserSelector } from './auth';

const menuCollectionListSelector = R.path(['app', 'menuCollectionList']);

const collectionsSelector = R.path(['entities', 'collections']);

export const collectionByIdSelector = createSelector(
  (state, { id }) => id,
  collectionsSelector,
  R.prop
);

export const menuCollectionsSelector = createSelector(
  menuCollectionListSelector,
  collectionsSelector,
  R.props
);

export const calculatorsByCollectionIdSelector = createSelector(
  collectionByIdSelector,
  R.propOr([], 'calculators')
);

export const newCalculatorsByCollectionIdSelector = createSelector(
  collectionByIdSelector,
  R.propOr([], 'newCalculators')
);

export const calculatorIdsByCollectionId = createSelector(
  calculatorsByCollectionIdSelector,
  newCalculatorsByCollectionIdSelector,
  R.concat
);

export const collectionHasCalculatorSelector = createSelector(
  [collectionByIdSelector, (_, { calculatorId }) => calculatorId],
  (collection, calcId) =>
    R.propSatisfies(R.contains(calcId), 'calculators', collection)
);

export const isCollectionAuthoredByLoggedInUserSelector = createSelector(
  collectionByIdSelector,
  loggedInUserSelector,
  (collection, user) =>
    R.equals(R.prop('author', collection), R.prop('id', user))
);
