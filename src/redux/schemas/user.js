import * as R from 'ramda';
import { schema } from 'normalizr';

export const User = R.pick(['id', 'email', 'fullName', 'role', 'company']);

export const user = new schema.Entity('users', {}, { processStrategy: User });
