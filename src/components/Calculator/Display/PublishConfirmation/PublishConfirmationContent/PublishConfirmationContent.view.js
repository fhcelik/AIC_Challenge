import CancelIcon from '@material-ui/icons/Cancel';
import CancelIconOutlined from '@material-ui/icons/CancelOutlined';
import { compose, getContext } from 'recompose';
import ConfirmIcon from '@material-ui/icons/CheckCircle';
import ConfirmIconOutlined from '@material-ui/icons/CheckCircleOutlined';
import cx from 'classnames';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import PublishIcon from '@material-ui/icons/Publish';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '../../../../IconButton';

const styles = theme => ({
  root: {
    padding: 10,
    width: 306,
  },
  textContent: {
    margin: '3px 0 0 10px',
    width: 250,
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

const enhance = compose(
  getContext({ onCalculatorEditDone: PropTypes.func }),
  withStyles(styles)
);

const PublishConfirmationContent = ({
  classes,
  handleClose,
  onCalculatorEditDone,
}) => (
  <Grid container className={classes.root}>
    <PublishIcon />
    <Grid className={classes.textContent}>
      <Typography className={classes.text}>Publish this calculator?</Typography>
      <Typography className={cx(classes.text, classes.fadedText)}>
        You cannot make any changes to a calculator after it's published
      </Typography>
    </Grid>
    <Grid container justify="center" className={classes.buttons}>
      <IconButton
        className={classes.button}
        onClick={onCalculatorEditDone}
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
);

PublishConfirmationContent.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
  onCalculatorEditDone: PropTypes.func,
};

export default enhance(PublishConfirmationContent);
