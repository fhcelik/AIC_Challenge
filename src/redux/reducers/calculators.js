import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import uuid from 'uuid/v4';
import * as Actions from '../actions/calculators';


export default handleActions({
  [Actions.addCalculator]: (calculators, { payload }) =>
    ({...calculators, [uuid()]: payload}),
  [Actions.changeCalculatorArg]: (calculators, { payload }) => {
    const { id, argvals } = payload;
    return R.assocPath([id, 'argvals'],
      R.mergeDeepRight(calculators[id].argvals, argvals),
      calculators);
  },
  [Actions.addCalculatorFormulaArg]: (calculators, { payload }) => {
    const { id, argname, formulaId } = payload;
    const newCalcId = uuid();
    return {...calculators,
      [id]: R.assocPath(['argvals', argname, 'refId'],
        newCalcId, calculators[id]),
      [newCalcId]: {formula: formulaId, argvals: {}, isTop: false}
    };
  },
  [Actions.removeCalculatorFormulaArg]: (calculators, {payload}) => {
    function recursiveDelete(calculators, {id, argname}) {
      const toRemove = R.path([id, 'argvals', argname, 'refId'],
        calculators);
      if (toRemove) {
        let curState = calculators;
        for(const argname in calculators[toRemove].argvals) {
          if (calculators[toRemove].argvals[argname].refId) {
            curState = recursiveDelete(curState, {id: toRemove, argname});
          }
        }
        return R.dissoc(toRemove,
          R.dissocPath([id, "argvals", argname, "refId"],
          curState));
      } else {
        return calculators;
      }
    }
    return recursiveDelete(calculators, payload);
  },
  [Actions.changeCalculatorResult]: (calculators, { payload: {id, result} }) =>
    R.assocPath([id, 'result'],
      R.merge(calculators[id].result, result),
      calculators),
}, {});