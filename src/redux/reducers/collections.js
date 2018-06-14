import { handleActions } from 'redux-actions';
import * as R from 'ramda';
import * as Actions from '../actions/collections';

export default handleActions(
  {
    [Actions.saveCollections]: (collections, { payload }) =>
      R.merge(payload, collections),
  },
  []
);
