import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { createUnit } from '../../mathjs-secured';
import { Unit } from '../schemas/units';
import { unitDefinitionsSelector } from '../selectors/units';

export const addUnit = createAction('@@calcoola/units/add', Unit);

export const saveUnitDefinitions = createAction(
  '@@calcoola/units/saveUnitDefinitions'
);

const loadUnitDefinitions = state => {
  createUnit(unitDefinitionsSelector(state), { override: true });
};

export const registerUnitDefinitions = createAction(
  '@@calcoola/units/registerDefinitions',
  ({ unitList, unitDefinitions }) => (dispatch, getState) => {
    dispatch(saveUnitDefinitions(unitDefinitions));
    loadUnitDefinitions(getState());
    const recordUnit = unit => dispatch(addUnit({ unit }));
    R.forEach(recordUnit, unitList);
    R.forEach(recordUnit, R.keys(unitDefinitions));
  }
);

export const fetchUnitDefinitions = createAction(
  '@@calcoola/units/fetchUnitDefinitions',
  () => (dispatch, getState, httpClient) =>
    httpClient
      .get('/units')
      .then(({ data }) => dispatch(registerUnitDefinitions(data)))
      .catch(err => {
        loadUnitDefinitions(getState());
        throw err;
      })
);
