import { Grid, withStyles } from 'material-ui';
import React from 'react';

const styles = theme => ({
  root: {
    border: `2px ${theme.palette.text.faded} solid`,
    height: '1.5em',
    padding: '0 11px',
    borderRadius: '30px',
    fontFamily: 'oxygen mono',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginRight: 3,
  },
});

const Usages = ({ classes, label }) => (
  <Grid className={classes.root}>{label}</Grid>
);

export default withStyles(styles)(Usages);
