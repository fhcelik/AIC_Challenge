import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const classes = theme => ({
  root: {
    backgroundColor: theme.palette.card.header,
    padding: '0.2em',
    color: theme.palette.text.primary,
  },
});

const Header = ({ classes, children }) => (
  <div className={classes.root}>
    <Grid container justify="flex-end">
      {children}
    </Grid>
  </div>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(Header);
