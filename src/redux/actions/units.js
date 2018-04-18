import * as R from 'ramda';
import math from 'mathjs';
import { createAction } from 'redux-actions';
import { Unit } from '../schemas/units';

export const addUnit = createAction('@@calcoola/units/add', Unit);

export const getUnitDefinitions = () => (dispatch, _, httpClient) =>
  httpClient.get('/units')
    .then(({data}) => {
      const { unitList, unitDefinitions } = data;
      math.createUnit(unitDefinitions, { override: true });
      const recordUnit = unit => dispatch(addUnit({unit}));
      R.forEach(recordUnit, unitList);
      R.forEachObjIndexed((_, unit) => recordUnit(unit), unitDefinitions);
    }
  )
;