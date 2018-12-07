import { createAction } from 'redux-actions';
import { normalize } from 'normalizr';
import { calculatorList } from '../schemas/calculator';
import { saveEntities } from './entities';

export const mergeCalculatorsByAuthor = createAction(
  '@@calcoola/calculatorsByAuthor/mergeCalculatorsByAuthor'
);

export const fetchCalculatorsByAuthorId = createAction(
  '@@calcoola/calculator/fetchCalculatorsByAuthorId',
  authorId => (dispatch, getState, httpClient) =>
    httpClient.get(`/users/${authorId}/calculators`).then(({ data }) => {
      const { entities, result } = normalize(data, calculatorList);
      dispatch(saveEntities(entities));
      dispatch(mergeCalculatorsByAuthor({ [authorId]: result }));
    })
);
