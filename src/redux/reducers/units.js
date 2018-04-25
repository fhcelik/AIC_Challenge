import { handleActions } from 'redux-actions';
import * as Actions from '../actions/units';

export default handleActions(
  {
    [Actions.addUnit]: (units, { payload: { base, unit } }) => ({
      ...units,
      [base]: (units[base] ? units[base] : []).concat(unit)
    })
  },
  {}
);
