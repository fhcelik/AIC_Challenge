import { handleActions } from 'redux-actions';
import * as Actions from '../actions/formulas';

export default handleActions({
  [Actions.addFormula]: (formulas, {payload}) =>
    ({...formulas, [payload.id]: payload})
}, {});