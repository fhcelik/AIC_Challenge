import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexShrink: 0,
  },
  text: {
    color: theme.palette.text.faded,
    padding: '15px 0',
  },
});

const Copyright = ({ classes }) => (
  <footer className={classes.root}>
    <Grid container justify="center">
      <Typography className={classes.text}>
        &copy; {new Date().getFullYear()} DevTheory Inc.
      </Typography>
    </Grid>
  </footer>
);

export default withStyles(styles)(Copyright);
