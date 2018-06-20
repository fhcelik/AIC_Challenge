import * as R from 'ramda';
import { combineActions, handleActions } from 'redux-actions';
import * as Actions from '../../actions/calculators';
import { DEFAULT_ARG_VALUE } from '../../schemas/calculator';

const calculatorArgPathCreator = (id, argname) => [id, 'args', argname];
const calculatorTagLensCreator = id => R.lensPath([id, 'tags']);

export default handleActions(
  {
    [Actions.addCalculator]: (calculators, { payload }) => ({
      ...calculators,
      [payload.id]: payload,
    }),
    [Actions.saveCalculators]: (calculators, { payload }) =>
      R.merge(calculators, payload),
    [combineActions(
      Actions.changeCalculatorTitle,
      Actions.changeCalculatorDescription
    )]: (calculators, { payload: { id, ...rest } }) => ({
      ...calculators,
      [id]: R.merge(calculators[id], rest),
    }),
    [Actions.saveCalculator]: (calculators, { payload: { id } }) =>
      R.dissocPath([id, 'isNew'], calculators),
    [Actions.addCalculatorTag]: (calculators, { payload: { id, tag } }) =>
      R.over(
        calculatorTagLensCreator(id),
        R.compose(R.uniq, R.append(tag)),
        calculators
      ),
    [Actions.removeCalculatorTag]: (calculators, { payload: { id, tag } }) =>
      R.over(
        calculatorTagLensCreator(id),
        R.filter(t => t !== tag),
        calculators
      ),
    [Actions.addCalculatorArg]: (calculators, { payload: { id, argname } }) =>
      R.assocPath(
        calculatorArgPathCreator(id, argname),
        { name: argname, value: DEFAULT_ARG_VALUE },
        calculators
      ),
    [Actions.removeCalculator]: (calculators, { payload: { id } }) =>
      R.dissoc(id, calculators),
    [Actions.changeCalculatorArg]: (calculators, { payload }) => {
      const { id, args } = payload;
      return R.assocPath(
        [id, 'args'],
        R.mergeDeepRight(calculators[id].args, args),
        calculators
      );
    },
    [Actions.removeCalculatorArg]: (
      calculators,
      { payload: { id, argname } }
    ) => R.dissocPath(calculatorArgPathCreator(id, argname), calculators),
    [Actions.removeCalculatorArgProp]: (
      calculators,
      { payload: { id, argname, argprop } }
    ) =>
      R.over(
        R.lensPath(calculatorArgPathCreator(id, argname)),
        R.dissoc(argprop),
        calculators
      ),
    [Actions.changeCalculatorResult]: (
      calculators,
      { payload: { id, result } }
    ) =>
      R.assocPath(
        [id, 'result'],
        R.merge(calculators[id].result, result),
        calculators
      ),
  },
  {}
);
