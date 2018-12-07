import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as Actions from '../../actions/collections';

const calculatorsByCollectionIdLensCreator = id =>
  R.lensPath([id, 'calculators']);
const newCalculatorsByCollectionIdLensCreator = id =>
  R.lensPath([id, 'newCalculators']);

export default handleActions(
  {
    [Actions.addNewCalculatorToCollection]: (
      collections,
      { payload: { collectionId, calculatorId } }
    ) =>
      R.over(
        newCalculatorsByCollectionIdLensCreator(collectionId),
        R.append(calculatorId)
      )(collections),

    [Actions.removeNewCalculatorFromCollection]: (
      collections,
      { payload: { collectionId, calculatorId } }
    ) =>
      R.over(
        newCalculatorsByCollectionIdLensCreator(collectionId),
        R.filter(id => id !== calculatorId)
      )(collections),

    [Actions.addCalculatorToCollection]: {
      next: (collections, { payload: { collectionId, calculatorId } }) =>
        R.over(
          calculatorsByCollectionIdLensCreator(collectionId),
          R.compose(R.uniq, R.append(calculatorId)),
          collections
        ),
      throw: R.identity,
    },

    [Actions.removeCalculatorFromCollection]: {
      next: (collections, { payload: { collectionId, calculatorId } }) =>
        R.over(
          calculatorsByCollectionIdLensCreator(collectionId),
          R.filter(R.complement(R.equals(calculatorId))),
          collections
        ),
      throw: R.identity,
    },

    [Actions.removeCollection]: {
      next: (collections, { payload: { collectionId } }) =>
        R.dissoc(collectionId, collections),
      throw: R.identity,
    },

    [Actions.resetNewCalculatorsToCollection]: (
      collections,
      { payload: { collectionId, newCalculators } }
    ) =>
      R.set(
        newCalculatorsByCollectionIdLensCreator(collectionId),
        newCalculators
      )(collections),
  },
  {}
);
