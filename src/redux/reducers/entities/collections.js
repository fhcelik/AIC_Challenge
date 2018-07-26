import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as Actions from '../../actions/collections';

const calculatorsLensCreator = collectionId =>
  R.lensPath([collectionId, 'calculators']);

export default handleActions(
  {
    [Actions.addCalculatorToCollection]: {
      next: (collections, { payload: { collectionId, calculatorId } }) =>
        R.over(
          calculatorsLensCreator(collectionId),
          R.compose(R.uniq, R.append(calculatorId)),
          collections
        ),
      throw: R.identity,
    },
    [Actions.removeCalculatorFromCollection]: {
      next: (collections, { payload: { collectionId, calculatorId } }) =>
        R.over(
          calculatorsLensCreator(collectionId),
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
  },
  {}
);
