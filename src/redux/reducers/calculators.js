import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as Actions from '../actions/calculators';

export default handleActions(
  {
    [Actions.addCalculator]: (calculators, { payload }) => ({
      ...calculators,
      [payload.id]: payload
    }),
    [Actions.removeCalculator]: (calculators, { payload: { id } }) =>
      R.dissoc(id, calculators),
    [Actions.changeCalculatorArg]: (calculators, { payload }) => {
      const { id, argvals } = payload;
      return R.assocPath(
        [id, 'argvals'],
        R.mergeDeepRight(calculators[id].argvals, argvals),
        calculators
      );
    },
    [Actions.removeCalculatorArg]: (
      calculators,
      { payload: { id, argname, argprop } }
    ) => R.dissocPath([id, 'argvals', argname, argprop], calculators),
    [Actions.changeCalculatorResult]: (
      calculators,
      { payload: { id, result } }
    ) =>
      R.assocPath(
        [id, 'result'],
        R.merge(calculators[id].result, result),
        calculators
      )
  },
  {}
);
