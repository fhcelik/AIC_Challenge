import * as R from 'ramda';
import { createUnit } from '../../mathjs-secured';
import { createAction } from 'redux-actions';
import { Unit } from '../schemas/units';

export const addUnit = createAction('@@calcoola/units/add', Unit);

export const registerUnitDefinitions = createAction(
  '@@calcoola/units/registerDefinitions',
  ({ unitList, unitDefinitions }) => dispatch => {
    createUnit(unitDefinitions, { override: true });
    const recordUnit = unit => dispatch(addUnit({ unit }));
    R.forEach(recordUnit, unitList);
    R.forEach(recordUnit, R.keys(unitDefinitions));
  }
);

export const getUnitDefinitions = createAction(
  '@@calcoola/units/getDefinitions',
  () => (dispatch, _, httpClient) =>
    httpClient
      .get('/units')
      .then(({ data }) => dispatch(registerUnitDefinitions(data)))
);
