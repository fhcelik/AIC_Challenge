import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as Actions from '../actions/auth';

export default handleActions(
  {
    [Actions.setJWT]: (auth, { payload: jwt }) => R.assoc('jwt', jwt, auth),
  },
  {}
);
