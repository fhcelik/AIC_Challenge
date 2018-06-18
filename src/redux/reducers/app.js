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
    [Actions.saveSearchResults]: (app, { payload: searchResults }) => ({
      ...app,
      searchResults,
    }),
  },
  {
    menuCollectionList: [],
    searchResults: [],
  }
);
