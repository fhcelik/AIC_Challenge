import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { normalize } from 'normalizr';
import { Collection, collection, collectionList } from '../schemas/collection';
import { displayNotification } from './notifications';
import { newCalculatorsByCollectionIdSelector } from '../selectors/collections';
import {
  prependMenuCollectionList,
  removeMenuCollectionItem,
  saveMenuCollectionList,
} from './app';
import { saveEntities } from './entities';

export const fetchCollections = createAction(
  '@@calcoola/collections/fetchCollections',
  () => (dispatch, _, httpClient) =>
    httpClient
      .get('/collections')
      .then(({ data }) => {
        const { entities, result } = normalize(data, collectionList);
        dispatch(saveEntities(entities));
        dispatch(saveMenuCollectionList(result));
      })
      .catch(() =>
        dispatch(displayNotification(new Error('Failed to load collections')))
      )
);

export const fetchCollection = createAction(
  '@@calcoola/collections/fetchCollection',
  id => (dispatch, getState, httpClient) =>
    httpClient.get(`/collections/${id}`).then(({ data }) => {
      const { entities } = normalize(data, collection);

      const newCalculatorsPrev = newCalculatorsByCollectionIdSelector(
        getState(),
        { id }
      );
      const newCalculators = R.pipe(
        R.path(['collections', id, 'calculators']),
        R.without(R.__, newCalculatorsPrev)
      )(entities);

      dispatch(saveEntities(entities));
      dispatch(
        resetNewCalculatorsToCollection({ collectionId: id, newCalculators })
      );
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
      .then(({ data }) => {
        const { entities, result } = normalize(data, collection);
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

export const deleteCollection = createAction(
  '@@calcoola/collections/deleteCollection',
  collectionId => (dispatch, getState, httpClient) =>
    httpClient.delete(`/collections/${collectionId}`).then(() => {
      dispatch(removeMenuCollectionItem(collectionId));
      return collectionId;
    })
);

export const addNewCalculatorToCollection = createAction(
  '@@calcoola/collections/addNewCalculatorToCollection'
);

export const removeNewCalculatorFromCollection = createAction(
  '@@calcoola/collections/removeNewCalculatorFromCollection'
);

export const resetNewCalculatorsToCollection = createAction(
  '@@calcoola/collections/resetNewCalculatorsToCollection'
);

export const saveCalculatorToCollection = createAction(
  '@@calcoola/calculator/saveCalculatorToCollection',
  ({ calculatorId, collectionId }) => dispatch =>
    dispatch(addCalculatorToCollection({ collectionId, calculatorId }))
      .catch(() =>
        dispatch(
          displayNotification(
            'Failed saving new calculator to collection, you can find your calculator in the My Calculators collection'
          )
        )
      )
      .finally(() =>
        dispatch(
          removeNewCalculatorFromCollection({ collectionId, calculatorId })
        )
      )
);
