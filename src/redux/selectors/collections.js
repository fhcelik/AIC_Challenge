import * as R from 'ramda';
import { createSelector } from 'reselect';

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
