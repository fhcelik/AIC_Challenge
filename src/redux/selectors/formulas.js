import * as R from 'ramda';
import { createSelector } from "reselect";

export const formulasSelector = R.prop('formulas');

export const formulasByTitleSelector = createSelector(formulasSelector,
  R.compose(R.values, R.mapObjIndexed((formula, id) => ({id, title: formula.title})))
);