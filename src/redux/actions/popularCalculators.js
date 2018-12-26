import { createAction } from 'redux-actions';
import { normalize } from 'normalizr';
import { calculatorList } from '../schemas/calculator';
import { saveEntities } from './entities';

export const setPopularCalculators = createAction(
  '@@calcoola/popularCalculators/setPopularCalculators'
);

export const fetchPopularCalculators = createAction(
  '@@calcoola/popularCalculators/fetchPopularCalculators',
  () => (dispatch, getState, httpClient) =>
    httpClient.get('/calculators/popular').then(({ data }) => {
      const { entities, result } = normalize(data, calculatorList);
      dispatch(saveEntities(entities));
      dispatch(setPopularCalculators(result));
    })
);
