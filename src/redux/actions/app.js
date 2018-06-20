import { createAction } from 'redux-actions';
import { fetchCollections } from './collections';
import { fetchUnitDefinitions } from './units';

export const bootstrap = createAction(
  '@@calcoola/app/bootstrap',
  () => dispatch => {
    Promise.all([
      dispatch(fetchCollections()),
      dispatch(fetchUnitDefinitions()),
    ]);
  }
);

export const saveMenuCollectionList = createAction(
  '@@calcoola/app/saveMenuCollectionList'
);
