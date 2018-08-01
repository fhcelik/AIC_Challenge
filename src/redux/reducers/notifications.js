import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as Actions from '../actions/notifications';
const defaultState = [];
const appendNotificationIfNotSame = R.ifElse(
  (toAdd, notifications) =>
    R.prop('message', R.last(notifications)) === R.prop('message', toAdd),
  (toAdd, notifications) => notifications,
  R.append
);
export default handleActions(
  {
    [Actions.displayNotification]: {
      next: (notifications, { meta }) =>
        appendNotificationIfNotSame(meta, notifications),
      throw: (notifications, { payload, meta }) =>
        appendNotificationIfNotSame(
          { ...meta, message: payload.message, error: payload },
          notifications
        ),
    },
    [Actions.closeNotification]: R.tail,
  },
  defaultState
);
