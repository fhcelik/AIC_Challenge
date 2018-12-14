import { createAction } from 'redux-actions';
import { normalize } from 'normalizr';
import { calculatorList } from '../schemas/calculator';
import { saveEntities } from './entities';
import { loggedInUserIdSelector } from '../selectors/auth';

export const setCalculatorsByAuthor = createAction(
  '@@calcoola/calculatorsByAuthor/setCalculatorsByAuthor'
);

const createActionWithLoggedInUserIdInPayload = type =>
  createAction(type, calculatorId => (dispatch, getState) => ({
    calculatorId,
    authorId: loggedInUserIdSelector(getState()),
  }));

export const addToMyNewCalculators = createActionWithLoggedInUserIdInPayload(
  '@@calcoola/calculatorsByAuthor/addToMyNewCalculators'
);

export const saveMyCalculator = createActionWithLoggedInUserIdInPayload(
  '@@calcoola/calculatorsByAuthor/saveMyCalculator'
);

export const removeMyNewCalculator = createActionWithLoggedInUserIdInPayload(
  '@@calcoola/calculatorsByAuthor/removeMyNewCalculator'
);

export const fetchCalculatorsByAuthorId = createAction(
  '@@calcoola/calculator/fetchCalculatorsByAuthorId',
  authorId => (dispatch, getState, httpClient) =>
    httpClient.get(`/users/${authorId}/calculators`).then(({ data }) => {
      const { entities, result } = normalize(data, calculatorList);
      dispatch(saveEntities(entities));
      dispatch(setCalculatorsByAuthor({ authorId, calculators: result }));
    })
);
