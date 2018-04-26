import * as R from 'ramda';
import { createUnit } from '../../mathjs-secured';
import { createAction } from 'redux-actions';
import { Unit } from '../schemas/units';

export const addUnit = createAction('@@calcoola/units/add', Unit);

export const getUnitDefinitions = () => (dispatch, _, httpClient) =>
  httpClient.get('/units').then(({ data }) => {
    const { unitList, unitDefinitions } = data;
    createUnit(unitDefinitions, { override: true });
    const recordUnit = unit => dispatch(addUnit({ unit }));
    R.forEach(recordUnit, unitList);
    R.forEach(recordUnit, R.keys(unitDefinitions));
  });
