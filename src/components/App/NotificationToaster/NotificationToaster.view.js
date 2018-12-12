import cx from 'classnames';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  message: {
    ...theme.typography.display1,
    background: theme.palette.notification.background,
    borderRadius: 0,
    opacity: '0.8',
  },
  error: {
    background: theme.palette.notification.error.background,
  },
});

const NotificationToaster = ({
  classes,
  message,
  messageId,
  isError,
  closeMessage,
}) => (
  <Snackbar
    key={messageId}
    open={!!message}
    message={message}
    action={
      <IconButton onClick={closeMessage}>
        <CloseIcon />
      </IconButton>
    }
    onClose={closeMessage}
    SnackbarContentProps={{
      className: cx(classes.message, { [classes.error]: isError }),
    }}
  />
);

NotificationToaster.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  messageId: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  closeMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(NotificationToaster);
