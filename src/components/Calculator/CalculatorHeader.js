import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import FavoriteIcon from 'material-ui-icons/FavoriteBorder';
import InfoIcon from 'material-ui-icons/InfoOutline';

const classes = theme => ({
  root: {
    backgroundColor: theme.colors.cardHeader,
    padding: '0.2em',
    color: theme.colors.text,
  },
});

const CalculatorHeader = ({ classes }) => (
  <div className={classes.root}>
    <Grid container justify="flex-end">
      <FavoriteIcon />
      <InfoIcon />
    </Grid>
  </div>
);

CalculatorHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(CalculatorHeader);
