import { handleActions } from 'redux-actions';
import uuid from 'uuid/v4';
import * as Actions from '../actions/formulas';

export default handleActions({
  [Actions.addFormula]: (formulas, { payload }) =>
    ({...formulas, [uuid()]: payload})
}, {});