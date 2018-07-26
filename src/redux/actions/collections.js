import { normalize } from 'normalizr';
import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { collection, Collection, collectionList } from '../schemas/collection';
import { prependMenuCollectionList, saveMenuCollectionList } from './app';
import { saveEntities } from './entities';
import { displayNotification } from './notifications';

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

export const addCalculatorToCollection = createAction(
  '@@calcoola/collections/addCalculator',
  ({ collectionId, calculatorId }) => (dispatch, getState, httpClient) =>
    httpClient
      .put(`/collections/${collectionId}/calculators/${calculatorId}`)
      .then(() => ({ collectionId, calculatorId }))
);

export const removeCalculatorFromCollection = createAction(
  '@@calcoola/collections/removeCalculator',
  ({ collectionId, calculatorId }) => (dispatch, getState, httpClient) =>
    httpClient
      .delete(`/collections/${collectionId}/calculators/${calculatorId}`)
      .then(() => ({ collectionId, calculatorId }))
);

export const createCollectionFromCalculator = createAction(
  '@@calcoola/collections/createCollection',
  ({ calculatorId, ...collectionProps }) => (
    dispatch,
    getState,
    httpClient
  ) => {
    const newCollection = Collection(collectionProps);

    return httpClient
      .put(
        `/collections/${newCollection.id}`,
        R.pick(['id', 'name'], newCollection)
      )
      .then(() => {
        const { entities, result } = normalize(newCollection, collection);
        dispatch(saveEntities(entities));
        dispatch(prependMenuCollectionList(result));
        return dispatch(
          addCalculatorToCollection({
            calculatorId,
            collectionId: newCollection.id,
          })
        ).catch(() =>
          dispatch(
            displayNotification(
              'Failed adding calculator to new collection, please try again'
            )
          )
        );
      });
  }
);

export const removeCollection = createAction(
  '@@calcoola/collections/remove',
  ({ collectionId }) => (dispatch, getState, httpClient) =>
    httpClient
      .delete(`/collections/${collectionId}`)
      .then(() => ({ collectionId }))
);
