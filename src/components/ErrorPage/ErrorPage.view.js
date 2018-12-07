import cx from 'classnames';
import { Grid, Typography, withStyles } from 'material-ui';
import React from 'react';

const styles = theme => ({
  root: {
    padding: '30px 50px',
  },
  errorCode: {
    marginRight: 25,
    ...theme.typography.display5,
    fontWeight: 500,
  },
  rightContent: {
    width: 400,
  },
  rightContentText: {
    textTransform: 'uppercase',
    ...theme.typography.display4,
    fontWeight: 500,
  },
  title: {
    marginTop: 33,
  },
  description: {
    marginTop: 10,
    color: theme.palette.text.faded,
    whiteSpace: 'pre-line',
  },
});

const ErrorPage = ({ classes, errorCode, title, description }) => (
  <Grid container className={classes.root}>
    <Typography className={classes.errorCode}>{errorCode}</Typography>
    <Grid className={classes.rightContent}>
      <Typography className={cx(classes.rightContentText, classes.title)}>
        {title}
      </Typography>
      <Typography className={cx(classes.rightContentText, classes.description)}>
        {description}
      </Typography>
    </Grid>
  </Grid>
);

export default withStyles(styles)(ErrorPage);
