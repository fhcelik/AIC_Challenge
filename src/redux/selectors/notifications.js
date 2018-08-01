import * as R from 'ramda';
export const firstNotificationSelector = R.path([
  'notifications',
  0,
  'message',
]);
export const firstNotificationIdSelector = R.path(['notifications', 0, 'id']);
export const firstNotificationIsErrorSelector = R.compose(
  R.not,
  R.equals(undefined),
  R.path(['notifications', 0, 'error'])
);
