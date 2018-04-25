import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { Calculator } from '../schemas/calculator';
import { nestedCalculatorSelector } from '../selectors/calculators';

export const addCalculator = createAction(
  '@@calcoola/calculator/add',
  Calculator
);

export const changeCalculatorArg = createAction(
  '@@calcoola/calculator/argument-change'
);

export const addCalculatorArgReference = createAction(
  '@@calcoola/calculator/argument-reference-add',
  ({ id, argname, formulaId }) => (dispatch, getState) => {
    const newCalcId = dispatch(addCalculator({ formula: formulaId })).payload
      .id;
    const toRemove = R.path(
      ['calculators', id, 'argvals', argname, 'refId'],
      getState()
    );
    if (toRemove) {
      dispatch(removeCalculatorArgReference({ id, argname }));
    }
    dispatch(
      changeCalculatorArg({
        id,
        argvals: { [argname]: { refId: newCalcId } }
      })
    );
  }
);

export const removeCalculatorArg = createAction(
  '@@calcoola/calculator/argument-remove'
);

export const removeCalculator = createAction('@@calcoola/calculator/remove');

export const removeCalculatorArgReference = createAction(
  '@@calcoola/calculator/argument-reference-remove',
  ({ id, argname }) => (dispatch, getState) => {
    const state = getState();
    const toRemove = R.path(
      ['calculators', id, 'argvals', argname, 'refId'],
      state
    );
    if (toRemove) {
      dispatch(removeCalculatorArg({ id, argname, argprop: 'refId' }));
      R.forEach(
        id => dispatch(removeCalculator({ id })),
        R.keys(nestedCalculatorSelector(state, { id: toRemove }))
      );
    }
  }
);

export const changeCalculatorResult = createAction(
  '@@calcoola/calculator/result-change'
);
