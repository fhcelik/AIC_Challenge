import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { Calculator } from '../schemas/calculator';
import {
  allArgsHaveValuesSelector,
  calculatorSelector,
  nestedCalculatorSelector,
} from '../selectors/calculators';
import {
  addNewCalculatorToCollection,
  removeNewCalculatorFromCollection,
  saveCalculatorToCollection,
} from './collections';
import { displayNotification } from './notifications';
import { debounceConfigNames } from '../config';

export const addCalculator = createAction(
  '@@calcoola/calculator/add',
  ({ collectionId, ...rest }) => dispatch => {
    const newCalculator = Calculator(rest);
    dispatch(
      addNewCalculatorToCollection({
        collectionId,
        calculatorId: newCalculator.id,
      })
    );
    return newCalculator;
  }
);

export const cancelAddingNewCalculator = createAction(
  '@@calcoola/calculator/cancelAddingNewCalculator',
  ({ collectionId, calculatorId }) => dispatch => {
    dispatch(
      removeNewCalculatorFromCollection({
        collectionId,
        calculatorId,
      })
    );
    return { id: calculatorId };
  }
);

export const changeCalculatorTitle = createAction(
  '@@calcoola/calculator/change/title'
);

export const changeCalculatorDescription = createAction(
  '@@calcoola/calculator/change/description'
);

export const saveCalculator = createAction(
  '@@calcoola/calculator/save',
  ({ calculatorId, collectionId }) => (dispatch, getState, httpClient) => {
    const calculatorToSave = calculatorSelector(getState(), {
      id: calculatorId,
    });

    return httpClient
      .put(`/calculators/${calculatorId}`, calculatorToSave)
      .then(() => {
        dispatch(
          displayNotification('Your calculator has been saved successfully.')
        );
        dispatch(saveCalculatorToCollection({ collectionId, calculatorId }));
      });
  }
);

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

const convertToNumber = R.when(R.compose(R.not, R.isEmpty), Number);

export const changeCalculatorArgValue = createAction(
  '@@calcoola/calculator/argument-change/value',
  ({ id, argname, value }) => dispatch =>
    dispatch(
      changeCalculatorArg({
        id,
        args: { [argname]: { value: convertToNumber(value) } },
      })
    )
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

export const removeCalculator = createAction('@@calcoola/calculator/remove');

export const removeCalculatorArgProp = createAction(
  '@@calcoola/calculator/argument-prop-remove'
);

export const removeCalculatorArg = createAction(
  '@@calcoola/calculator/argument-remove'
);

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

export const incrementCalculatorUsage = createAction(
  '@@calcoola/calculator/incrementCalculatorUsage',
  id => (dispatch, getState, httpClient) =>
    allArgsHaveValuesSelector(getState(), { id }) &&
    httpClient.post(`/usages/${id}`),
  () => ({ debounce: debounceConfigNames.CALCULATOR_USAGE })
);
