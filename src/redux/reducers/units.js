import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as Actions from '../actions/units';

const unitBaseLensCreator = base =>
  R.lens(R.pathOr([], ['unitList', base]), R.assocPath(['unitList', base]));

export default handleActions(
  {
    [Actions.addUnit]: (units, { payload: { base, unit } }) =>
      R.over(
        unitBaseLensCreator(base),
        R.compose(R.uniq, R.append(unit)),
        units
      ),
    [Actions.saveUnitDefinitions]: (units, { payload: unitDefinitions }) => ({
      ...units,
      unitDefinitions,
    }),
  },
  {
    unitList: {},
    unitDefinitions: {},
  }
);
