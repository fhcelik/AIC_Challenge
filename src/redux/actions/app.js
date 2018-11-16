import { createAction } from 'redux-actions';
import { fetchCollections } from './collections';
import { fetchUnitDefinitions } from './units';
import { isAuthorizedSelector } from '../selectors/auth';

export const bootstrap = createAction(
  '@@calcoola/app/bootstrap',
  () => (dispatch, getState) => {
    dispatch(fetchUnitDefinitions());

    if (isAuthorizedSelector(getState())) {
      dispatch(fetchCollections());
    }
  }
);

export const saveMenuCollectionList = createAction(
  '@@calcoola/app/saveMenuCollectionList'
);

export const prependMenuCollectionList = createAction(
  '@@calcoola/app/prependMenuCollectionList'
);

export const saveSearchQuery = createAction('@@calcoola/app/saveSearchQuery');

export const saveSearchResults = createAction(
  '@@calcoola/app/saveSearchResults'
);
