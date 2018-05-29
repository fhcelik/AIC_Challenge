import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getBaseUnit, UNITLESS } from '../schemas/units';

export const matchingUnitsSelector = (state, { defaultUnit }) =>
  state.units[getBaseUnit(defaultUnit)] || [defaultUnit];

export const allUnitsSelector = createSelector(
  state => state.units,
  units => R.reduce(R.concat, [UNITLESS], R.values(units))
);
