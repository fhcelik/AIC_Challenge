import { createAction } from 'redux-actions';

export const saveCollections = createAction(
  '@@calcoola/collections/saveCollections'
);

export const fetchCollections = createAction(
  '@@calcoola/collections/fetchCollections',
  () => (dispatch, _, httpClient) =>
    httpClient
      .get('/collections')
      .then(({ data }) => dispatch(saveCollections(data)))
);
