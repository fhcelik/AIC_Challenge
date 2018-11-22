import * as R from 'ramda';
import { createSelector } from 'reselect';

export const jwtSelector = R.pathOr(null, ['auth', 'jwt']);

export const isAuthorizedSelector = createSelector(jwtSelector, Boolean);

export const userSelector = R.pathOr(null, ['auth', 'user']);
