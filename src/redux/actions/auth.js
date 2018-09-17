import { createAction } from 'redux-actions';

export const login = createAction(
  '@@calcoola/auth/login',
  email => (dispatch, getState, httpClient) => {
    return httpClient.post('/user/login', { email });
  }
);
