import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    ...theme.typography.display4,
  },
});

function ErrorCatch({ classes, message }) {
  return <Typography className={classes.root}>{message}</Typography>;
}

ErrorCatch.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
};

export default withStyles(styles)(ErrorCatch);
