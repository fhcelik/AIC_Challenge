import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import { jwtSelector } from '../selectors/auth';
import { Routes } from '../../components/App/Routing';

export const login = createAction(
  '@@calcoola/auth/login',
  email => (dispatch, getState, httpClient) => {
    return httpClient.post('/login', { email });
  }
);

const removeHashbangFromUrl = () => {
  window.history.replaceState(null, null, ' ');
  return true;
};

const getTokenFromHashbang = () => {
  const hashbang = window.location.hash;
  return hashbang ? hashbang.replace('#!', '') : null;
};

export const setJWT = createAction(
  '@@calcoola/auth/setJWT',
  token => (dispatch, getState, httpClient) => {
    const { Authorization, ...common } = httpClient.defaults.headers.common;

    httpClient.defaults.headers.common = token
      ? { ...common, Authorization: `Bearer ${token}` }
      : common;

    return token;
  }
);

export const authorize = createAction(
  '@@calcoola/auth/authorize',
  () => (dispatch, getState) => {
    const token = R.ifElse(
      R.identity,
      token => removeHashbangFromUrl() && token,
      () => process.env.REACT_APP_DEV_JWT || jwtSelector(getState())
    )(getTokenFromHashbang());

    if (token) dispatch(setJWT(token));
  }
);

export const logout = createAction('@@calcoola/auth/logout', () => dispatch => {
  dispatch(setJWT(null));
  dispatch(push(Routes.root));
});
