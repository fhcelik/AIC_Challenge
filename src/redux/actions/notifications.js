import { createAction } from 'redux-actions';
import uuid from 'uuid/v4';

export const displayNotification = createAction(
  '@@calcoola/notifications/display',
  payload => payload,
  message => ({ message, id: uuid() })
);

export const closeNotification = createAction(
  '@@calcoola/notifications/close',
  () => {}
);
