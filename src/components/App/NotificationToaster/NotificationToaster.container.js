import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { closeNotification } from '../../../redux/actions/notifications';
import {
  firstNotificationIdSelector,
  firstNotificationIsErrorSelector,
  firstNotificationSelector,
} from '../../../redux/selectors/notifications';
import NotificationToaster from './NotificationToaster.view';

export default compose(
  connect(
    state => ({
      message: firstNotificationSelector(state),
      messageId: firstNotificationIdSelector(state),
      isError: firstNotificationIsErrorSelector(state),
    }),
    {
      closeNotification,
    }
  ),
  withHandlers({
    closeMessage: ({ closeNotification }) => () => closeNotification(),
  })
)(NotificationToaster);
