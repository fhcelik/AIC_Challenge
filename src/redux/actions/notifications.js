import { createAction } from 'redux-actions';
import uuid from 'uuid/v4';

export const displayNotification = createAction(
  '@@swl-advisor-web/notifications/display',
  payload => payload,
  message => ({ message, id: uuid() })
);

export const closeNotification = createAction(
  '@@swl-advisor-web/notifications/close',
  () => {}
);
