import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { Calculator } from '../schemas/calculator';
import { nestedCalculatorSelector } from '../selectors/calculators';

export const addCalculator = createAction(
  '@@calcoola/calculator/add',
  Calculator
);

export const saveCalculators = createAction(
  '@@calcoola/calculator/saveCalculators'
);

export const changeCalculatorTitle = createAction(
  '@@calcoola/calculator/change/title'
);

export const changeCalculatorDescription = createAction(
  '@@calcoola/calculator/change/description'
);

//TODO: Implement logic to save to server
export const saveCalculator = createAction('@@calcoola/calculator/save');

export const addCalculatorTag = createAction('@@calcoola/calculator/tag-add');

export const removeCalculatorTag = createAction(
  '@@calcoola/calculator/tag-remove'
);

export const addCalculatorArg = createAction(
  '@@calcoola/calculator/argument-add'
);

export const changeCalculatorArg = createAction(
  '@@calcoola/calculator/argument-change'
);

export const changeCalculatorArgAlias = createAction(
  '@@calcoola/calculator/argument-change/alias',
  ({ id, argname, alias }) => dispatch =>
    dispatch(changeCalculatorArg({ id, args: { [argname]: { alias } } }))
);

export const changeCalculatorArgValue = createAction(
  '@@calcoola/calculator/argument-change/value',
  ({ id, argname, value }) => dispatch =>
    dispatch(changeCalculatorArg({ id, args: { [argname]: { value } } }))
);

export const changeCalculatorArgUnit = createAction(
  '@@calcoola/calculator/argument-change/unit',
  ({ id, argname, unit }) => dispatch =>
    dispatch(changeCalculatorArg({ id, args: { [argname]: { unit } } }))
);

export const addCalculatorArgReference = createAction(
  '@@calcoola/calculator/argument-reference-add',
  ({ id, argname, formulaId }) => (dispatch, getState) => {
    const newCalcId = dispatch(addCalculator({ result: { refId: formulaId } }))
      .payload.id;
    const toRemove = R.path(
      ['calculators', id, 'args', argname, 'refId'],
      getState()
    );
    if (toRemove) {
      dispatch(removeCalculatorArgReference({ id, argname }));
    }
    dispatch(
      changeCalculatorArg({
        id,
        args: { [argname]: { refId: newCalcId } },
      })
    );
  }
);

export const removeCalculatorArgProp = createAction(
  '@@calcoola/calculator/argument-prop-remove'
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
      ['calculators', id, 'args', argname, 'refId'],
      state
    );
    if (toRemove) {
      dispatch(removeCalculatorArgProp({ id, argname, argprop: 'refId' }));
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

export const changeCalculatorResultUnit = createAction(
  '@@calcoola/calculator/result-change/unit',
  ({ id, unit }) => dispatch =>
    dispatch(changeCalculatorResult({ id, result: { unit } }))
);

export const changeCalculatorResultFormula = createAction(
  '@@calcoola/calculator/result-change/formula',
  ({ id, execFormula }) => dispatch =>
    dispatch(changeCalculatorResult({ id, result: { execFormula } }))
);
