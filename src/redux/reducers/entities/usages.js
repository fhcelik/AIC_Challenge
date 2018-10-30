import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as Actions from '../../actions/usages';

export default handleActions(
  { [Actions.saveUsages]: (usages, { payload }) => R.merge(usages, payload) },
  {}
);
