import CancelIcon from '@material-ui/icons/Cancel';
import CancelIconOutlined from '@material-ui/icons/CancelOutlined';
import ConfirmIcon from '@material-ui/icons/CheckCircle';
import ConfirmIconOutlined from '@material-ui/icons/CheckCircleOutlined';
import cx from 'classnames';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '../IconButton';

const styles = theme => ({
  root: {
    padding: 10,
  },
  textContent: {
    margin: '3px 0 0 10px',
  },
  text: {
    textTransform: 'uppercase',
    marginBottom: 7,
  },
  fadedText: {
    color: theme.palette.text.faded,
  },
  button: {
    margin: '5px 7px',
  },
  icon: {
    fontSize: '36px !important',
  },
});

const ConfirmationDialog = ({
  classes,
  className,
  bodyText,
  handleClose,
  handleConfirm,
  headerText,
  icon: Icon,
}) => (
  <Grid container className={cx(classes.root, className)} wrap="nowrap">
    <Icon />
    <Grid>
      <Grid className={classes.textContent}>
        <Typography className={classes.text}>{headerText}</Typography>
        {bodyText && (
          <Typography className={cx(classes.text, classes.fadedText)}>
            {bodyText}
          </Typography>
        )}
      </Grid>
      <Grid container justify="center" className={classes.buttons}>
        <IconButton
          className={classes.button}
          onClick={handleConfirm}
          iconOnHover={ConfirmIcon}
          tooltipTitle="Confirm"
        >
          <ConfirmIconOutlined className={classes.icon} />
        </IconButton>
        <IconButton
          className={classes.button}
          onClick={handleClose}
          iconOnHover={CancelIcon}
          tooltipTitle="Cancel"
        >
          <CancelIconOutlined className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
  </Grid>
);

ConfirmationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  bodyText: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func,
  headerText: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
};

export default withStyles(styles)(ConfirmationDialog);
