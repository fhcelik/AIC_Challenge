import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getBaseUnit, UNITLESS } from '../schemas/units';

const unitsSelector = R.prop('units');

export const matchingUnitsSelector = createSelector(
  [unitsSelector, (_, { defaultUnit }) => defaultUnit],
  (units, defaultUnit) =>
    R.prop(getBaseUnit(defaultUnit), units) || [defaultUnit]
);

export const allUnitsSelector = createSelector(unitsSelector, units =>
  R.reduce(R.concat, [UNITLESS], R.values(units))
);
