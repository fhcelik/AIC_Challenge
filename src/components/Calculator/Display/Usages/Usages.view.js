import { Grid } from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    border: `2px ${theme.palette.text.faded} solid`,
    height: '1.6em',
    padding: '1px 11px',
    borderRadius: '30px',
    fontFamily: 'oxygen mono',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 1,
    marginRight: 3,
  },
});

const Usages = ({ classes, label }) => (
  <Grid className={classes.root}>{label}</Grid>
);

export default withStyles(styles)(Usages);
