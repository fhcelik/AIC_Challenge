import { handleActions } from 'redux-actions';
import * as Actions from '../actions/collections';

export default handleActions(
  {
    [Actions.saveCollections]: (_, { payload }) => payload,
  },
  []
);
