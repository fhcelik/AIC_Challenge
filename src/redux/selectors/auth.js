import * as R from 'ramda';

export const jwtSelector = R.pathOr(null, ['auth', 'jwt']);
