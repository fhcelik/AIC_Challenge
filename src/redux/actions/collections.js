import { normalize } from 'normalizr';
import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { collection, Collection, collectionList } from '../schemas/collection';
import { saveMenuCollectionList } from './app.js';
import { saveCalculators } from './calculators';
import { Calculator } from '../schemas/calculator';

export const saveCollections = createAction(
  '@@calcoola/collections/saveCollections'
);

export const fetchCollections = createAction(
  '@@calcoola/collections/fetchCollections',
  () => (dispatch, _, httpClient) =>
    httpClient.get('/collections').then(({ data }) => {
      const { entities, result } = normalize(data, collectionList);
      dispatch(saveCollections(R.map(Collection, entities.collections)));
      dispatch(saveMenuCollectionList(result));
      dispatch(saveCalculators(R.map(Calculator, entities.calculators)));
    })
);

export const fetchCollection = createAction(
  '@@calcoola/collections/fetchCollection',
  ({ id }) => (dispatch, _, httpClient) =>
    httpClient.get('/collections/' + id).then(({ data }) => {
      const { entities } = normalize(data, collection);
      dispatch(saveCollections(R.map(Collection, entities.collections)));
      if (entities.calculators) {
        dispatch(saveCalculators(R.map(Calculator, entities.calculators)));
      }
    })
);
