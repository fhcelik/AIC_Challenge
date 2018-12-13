import cx from 'classnames';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  errorCode: {
    marginRight: 25,
    ...theme.typography.display5,
    fontWeight: 500,
    lineHeight: 1,
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
    marginTop: 7,
  },
  description: {
    marginTop: 10,
    color: theme.palette.text.faded,
    whiteSpace: 'pre-line',
  },
});

const ErrorPage = ({ classes, errorCode, title, description }) => (
  <Grid container>
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
