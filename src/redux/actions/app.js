import { createAction } from 'redux-actions';
import { fetchCollections } from './collections.js';
import { getUnitDefinitions } from './units.js';

export const bootstrap = createAction(
  '@@calcoola/app/bootstrap',
  () => dispatch => {
    dispatch(fetchCollections());
    dispatch(getUnitDefinitions());
  }
);
