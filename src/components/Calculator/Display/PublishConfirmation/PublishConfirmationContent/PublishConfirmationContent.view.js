import CancelIcon from '@material-ui/icons/Cancel';
import { compose, getContext } from 'recompose';
import ConfirmIcon from '@material-ui/icons/CheckCircle';
import cx from 'classnames';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import PublishIcon from '@material-ui/icons/Publish';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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
    fontSize: 36,
    margin: '5px 7px',
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
      <ConfirmIcon className={classes.button} onClick={onCalculatorEditDone} />
      <CancelIcon className={classes.button} onClick={handleClose} />
    </Grid>
  </Grid>
);

PublishConfirmationContent.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
  onCalculatorEditDone: PropTypes.func,
};

export default enhance(PublishConfirmationContent);
