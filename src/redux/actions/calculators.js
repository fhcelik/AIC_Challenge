import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { Calculator } from '../schemas/calculator';

export const addCalculator = createAction("@@calcoola/calculator/add", Calculator);

export const changeCalculatorArg = createAction("@@calcoola/calculator/argument-change");

export const addCalculatorArgReference = createAction("@@calcoola/calculator/argument-reference-add",
  ({id, argname, formulaId}) =>
    (dispatch, getState) => {
    const newCalcId = dispatch(
      addCalculator({formula: formulaId})
    ).payload.id;
    const toRemove = R.path(['calculators', id, 'argvals', argname, 'refId'],
      getState());
    if (toRemove) {
      dispatch(removeCalculatorArgReference({id, argname}));
    }
    dispatch(changeCalculatorArg({
      id,
      argvals: {[argname]: {refId: newCalcId}}
    }));
  }
);

export const removeCalculatorArg = createAction("@@calcoola/calculator/argument-remove");

export const removeCalculator = createAction("@@calcoola/calculator/remove");

export const removeCalculatorArgReference = createAction("@@calcoola/calculator/argument-reference-remove",
  ({id, argname}) => (dispatch, getStore) => {
    function recursiveDelete(calculators, id, argname) {
      const toRemove = R.path([id, 'argvals', argname, 'refId'],
        calculators);
      if (toRemove) {
        for(const argname in calculators[toRemove].argvals) {
          if (calculators[toRemove].argvals[argname].refId) {
            recursiveDelete(calculators, toRemove, argname);
          }
        }
        dispatch(removeCalculator({id: toRemove}));
      }
    }
    recursiveDelete(getStore().calculators, id, argname);
    dispatch(removeCalculatorArg({id, argname, argprop: 'refId'}));
  }
);

export const changeCalculatorResult = createAction("@@calcoola/calculator/result-change");
