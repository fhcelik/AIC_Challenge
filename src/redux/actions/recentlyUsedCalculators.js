import { createAction } from 'redux-actions';
import { normalize } from 'normalizr';
import { calculatorList } from '../schemas/calculator';
import { saveEntities } from './entities';

export const setRecentlyUsedCalculators = createAction(
  '@@calcoola/recentlyUsedCalculators/setRecentlyUsedCalculators'
);

export const addRecentlyUsedCalculator = createAction(
  '@@calcoola/recentlyUsedCalculators/addRecentlyUsedCalculator'
);

export const fetchRecentlyUsedCalculators = createAction(
  '@@calcoola/recentlyUsedCalculators/fetchRecentlyUsedCalculators',
  () => (dispatch, getState, httpClient) =>
    httpClient.get('/calculators/recently-used').then(({ data }) => {
      const { entities, result } = normalize(data, calculatorList);
      dispatch(saveEntities(entities));
      dispatch(setRecentlyUsedCalculators(result));
    })
);
