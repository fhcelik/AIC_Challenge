import { Grid, Typography } from 'material-ui';
import ErrorIcon from 'material-ui-icons/ErrorOutline';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';

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
    color: theme.palette.tag.highlight,
  },
});

const NoUnitsInfo = ({ classes }) => (
  <Grid className={classes.root}>
    <Grid container alignItems="center" className={classes.header}>
      <ErrorIcon className={classes.headerIcon} />
      <Typography className={classes.headerText}>
        Error Loading Calculator
      </Typography>
    </Grid>
    <Typography>
      The calculator could not be loaded because of an error fetching data.
      Please try again later. Sorry for the inconvenience.
    </Typography>
  </Grid>
);

NoUnitsInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoUnitsInfo);
