import { normalize } from 'normalizr';
import * as R from 'ramda';
import { createAction } from 'redux-actions';
import {
  allArgsHaveValuesSelector,
  calculatorSelector,
} from '../selectors/calculators';
import {
  addNewCalculatorToCollection,
  removeNewCalculatorFromCollection,
  saveCalculatorToCollection,
} from './collections';
import { addRecentlyUsedCalculator } from './recentlyUsedCalculators';
import { Calculator, calculator } from '../schemas/calculator';
import { debounceConfigNames } from '../config';
import { displayNotification } from './notifications';
import {
  addToMyNewCalculators,
  removeMyNewCalculator,
  saveMyCalculator,
} from './calculatorsByAuthor';
import { isAuthorizedSelector } from '../selectors/auth';
import { saveEntities } from './entities';

export const fetchCalculator = createAction(
  '@@calcoola/calculator/fetchCalculator',
  id => (dispatch, _, httpClient) =>
    httpClient.get(`/calculators/${id}`).then(({ data }) => {
      const { entities } = normalize(data, calculator);
      dispatch(saveEntities(entities));
    })
);

export const addCalculator = createAction(
  '@@calcoola/calculator/add',
  ({ collectionId, ...rest }) => dispatch => {
    const newCalculator = Calculator(rest);
    collectionId
      ? dispatch(
          addNewCalculatorToCollection({
            collectionId,
            calculatorId: newCalculator.id,
          })
        )
      : dispatch(addToMyNewCalculators(newCalculator.id));
    return newCalculator;
  }
);

export const cancelAddingNewCalculator = createAction(
  '@@calcoola/calculator/cancelAddingNewCalculator',
  ({ collectionId, calculatorId }) => dispatch => {
    collectionId
      ? dispatch(
          removeNewCalculatorFromCollection({
            collectionId,
            calculatorId,
          })
        )
      : dispatch(removeMyNewCalculator(calculatorId));
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
    const calculatorToSave = R.pipe(
      state => calculatorSelector(state, { id: calculatorId }),
      R.over(R.lensProp('args'), R.map(R.dissoc('value')))
    )(getState());

    return httpClient
      .put(`/calculators/${calculatorId}`, calculatorToSave)
      .then(({ data }) => {
        const { entities } = normalize(data, calculator);
        dispatch(saveEntities(entities));

        dispatch(
          displayNotification('Your calculator has been saved successfully.')
        );
        collectionId
          ? dispatch(saveCalculatorToCollection({ collectionId, calculatorId }))
          : dispatch(saveMyCalculator(calculatorId));
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

export const removeCalculator = createAction('@@calcoola/calculator/remove');

export const removeCalculatorArgProp = createAction(
  '@@calcoola/calculator/argument-prop-remove'
);

export const removeCalculatorArg = createAction(
  '@@calcoola/calculator/argument-remove'
);

export const removeCalculatorArgUnit = createAction(
  '@@calcoola/calculator/removeCalculatorArgUnit'
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

export const setCalculatorUsages = createAction(
  '@@calcoola/calculator/setCalculatorUsages'
);

export const incrementCalculatorUsage = createAction(
  '@@calcoola/calculator/incrementCalculatorUsage',
  id => (dispatch, getState, httpClient) =>
    allArgsHaveValuesSelector(getState(), { id }) &&
    httpClient.post(`/usages/${id}`).then(() => {
      dispatch(setCalculatorUsages(id));
      isAuthorizedSelector(getState()) &&
        dispatch(addRecentlyUsedCalculator(id));
    }),
  () => ({ debounce: debounceConfigNames.CALCULATOR_USAGE })
);
