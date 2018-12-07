import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as Actions from '../actions/calculatorsByAuthor';

export default handleActions(
  {
    [Actions.mergeCalculatorsByAuthor]: (calculatorsByAuthor, { payload }) =>
      R.mergeRight(calculatorsByAuthor, payload),
  },
  {}
);
