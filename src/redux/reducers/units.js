import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as Actions from '../actions/units';

export default handleActions(
  {
    [Actions.addUnit]: (units, { payload: { base, unit } }) => ({
      ...units,
      [base]: R.uniq(R.append(unit, R.propOr([], base, units))),
    }),
  },
  {}
);
