import { createAction } from 'redux-actions';
import { fetchCollections } from './collections';
import { loadUnitDefinitions } from './units';
import { isAuthorizedSelector } from '../selectors/auth';

export const bootstrap = createAction(
  '@@calcoola/app/bootstrap',
  () => (dispatch, getState) => {
    dispatch(loadUnitDefinitions());

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

export const openLoginDropdown = createAction(
  '@@calcoola/app/openLoginDropdown'
);

export const toggleLoginDropdown = createAction(
  '@@calcoola/app/toggleLoginDropdown'
);

export const closeLoginDropdown = createAction(
  '@@calcoola/app/closeLoginDropdown'
);
