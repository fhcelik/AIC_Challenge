import * as R from 'ramda';

export const User = R.pick(['id', 'email', 'fullName', 'role', 'company']);
