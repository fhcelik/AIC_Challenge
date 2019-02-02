import * as R from 'ramda';
import { createSelector } from 'reselect';

export const userByIdSelector = (state, { id }) => {
  const userObj = R.path(['entities', 'users', id], state);
  if (userObj) {
    return {
      ...userObj,
      fullName: userObj.fullName || `user ${id.split('-', 1)}`,
    };
  }
};

export const fullNameByUserIdSelector = createSelector(
  userByIdSelector,
  R.prop('fullName')
);
