import jwt from 'jsonwebtoken';
import { handleActions } from 'redux-actions';
import * as Actions from '../actions/auth';
import { User } from '../schemas/user';

export default handleActions(
  {
    [Actions.setJWT]: (auth, { payload: token }) => ({
      jwt: token,
      user: token ? User(jwt.decode(token)) : null,
    }),
  },
  {
    jwt: null,
    user: null,
  }
);
