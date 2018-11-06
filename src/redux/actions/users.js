import { createAction } from 'redux-actions';
import { normalize } from 'normalizr';
import { saveEntities } from './entities';
import { user } from '../schemas/user';
import { displayNotification } from './notifications';

export const fetchUser = createAction(
  '@@calcoola/users/fetchUser',
  id => (dispatch, getState, httpClient) =>
    httpClient.get(`/users/${id}`).then(({ data }) => {
      const { entities } = normalize(data, user);
      dispatch(saveEntities(entities));
    })
);

export const saveProfile = createAction(
  '@@calcoola/users/saveProfile',
  user => (dispatch, _, httpClient) =>
    httpClient.put(`/users/${user.id}`, user).then(() => {
      dispatch(displayNotification('Profile Saved'));
    })
);
