import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as Actions from '../actions/app';

export default handleActions(
  {
    [Actions.saveMenuCollectionList]: (
      app,
      { payload: menuCollectionList }
    ) => ({
      ...app,
      menuCollectionList,
    }),
    [Actions.prependMenuCollectionList]: (app, { payload }) =>
      R.over(R.lensProp('menuCollectionList'), R.prepend(payload))(app),
    [Actions.saveSearchResults]: (app, { payload: searchResults }) => ({
      ...app,
      searchResults,
    }),
    [Actions.saveSearchQuery]: (app, { payload: searchQuery }) => ({
      ...app,
      searchQuery,
    }),
    [Actions.openLoginDropdown]: app =>
      R.mergeRight(app, { isLoginDropdownOpen: true }),
    [Actions.toggleLoginDropdown]: app =>
      R.mergeRight(app, {
        isLoginDropdownOpen: !R.prop('isLoginDropdownOpen', app),
      }),
    [Actions.closeLoginDropdown]: app =>
      R.mergeRight(app, { isLoginDropdownOpen: false }),
  },
  {
    menuCollectionList: [],
    searchResults: [],
    searchQuery: '',
    isLoginDropdownOpen: false,
  }
);
