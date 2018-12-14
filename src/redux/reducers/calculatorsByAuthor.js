import * as R from 'ramda';
import { combineActions, handleActions } from 'redux-actions';
import * as Actions from '../actions/calculatorsByAuthor';

const calculatorsLensCreator = id => R.lensPath([id, 'calculators']);
const newCalculatorsLensCreator = id => R.lensPath([id, 'newCalculators']);

export default handleActions(
  {
    [Actions.setCalculatorsByAuthor]: (
      calculatorsByAuthor,
      { payload: { authorId, calculators } }
    ) =>
      R.set(calculatorsLensCreator(authorId), calculators, calculatorsByAuthor),
    [Actions.addToMyNewCalculators]: (
      calculatorsByAuthor,
      { payload: { authorId, calculatorId } }
    ) =>
      R.over(
        newCalculatorsLensCreator(authorId),
        R.append(calculatorId),
        calculatorsByAuthor
      ),
    [Actions.saveMyCalculator]: (
      calculatorsByAuthor,
      { payload: { authorId, calculatorId } }
    ) =>
      R.over(
        calculatorsLensCreator(authorId),
        R.append(calculatorId),
        calculatorsByAuthor
      ),
    [combineActions(Actions.saveMyCalculator, Actions.removeMyNewCalculator)]: (
      calculatorsByAuthor,
      { payload: { authorId, calculatorId } }
    ) =>
      R.over(
        newCalculatorsLensCreator(authorId),
        R.filter(id => id !== calculatorId),
        calculatorsByAuthor
      ),
  },
  {}
);
