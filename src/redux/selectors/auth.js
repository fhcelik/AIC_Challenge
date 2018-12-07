import * as R from 'ramda';
import { createSelector } from 'reselect';

export const jwtSelector = R.pathOr(null, ['auth', 'jwt']);

export const isAuthorizedSelector = createSelector(jwtSelector, Boolean);

export const loggedInUserSelector = R.pathOr(null, ['auth', 'user']);

export const loggedInUserIdSelector = createSelector(
  loggedInUserSelector,
  R.prop('id')
);
