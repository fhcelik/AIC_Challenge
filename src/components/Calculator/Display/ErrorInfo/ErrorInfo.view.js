import { Grid, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    border: `1.5px solid ${theme.palette.card.header}`,
    padding: 10,
  },
  header: {
    marginBottom: 5,
  },
  headerIcon: {
    color: theme.palette.notification.error.background,
    marginRight: 3,
  },
  headerText: {
    ...theme.typography.display1,
    textTransform: 'uppercase',
  },
  errorMessage: {
    color: theme.palette.tag.highlight,
  },
});

const ErrorInfo = ({ children, classes, error }) =>
  !error ? (
    children
  ) : (
    <Grid className={classes.root}>
      <Grid container alignItems="center" className={classes.header}>
        <ErrorIcon className={classes.headerIcon} />
        <Typography className={classes.headerText}>
          Error Loading Calculator
        </Typography>
      </Grid>
      <Typography className={classes.errorMessage}>
        Something went wrong with this calculator. Sorry for inconvenience.
      </Typography>
    </Grid>
  );

ErrorInfo.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool,
};

export default withStyles(styles)(ErrorInfo);
