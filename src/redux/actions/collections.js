import { normalize } from 'normalizr';
import { createAction } from 'redux-actions';
import { collection, collectionList } from '../schemas/collection';
import { saveMenuCollectionList } from './app';
import { saveEntities } from './entities';

export const fetchCollections = createAction(
  '@@calcoola/collections/fetchCollections',
  () => (dispatch, _, httpClient) =>
    httpClient.get('/collections').then(({ data }) => {
      const { entities, result } = normalize(data, collectionList);
      dispatch(saveEntities(entities));
      dispatch(saveMenuCollectionList(result));
    })
);

export const fetchCollection = createAction(
  '@@calcoola/collections/fetchCollection',
  ({ id }) => (dispatch, _, httpClient) =>
    httpClient.get('/collections/' + id).then(({ data }) => {
      const { entities } = normalize(data, collection);
      dispatch(saveEntities(entities));
    })
);
