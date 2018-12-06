import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import Calculator from '../';

const styles = {
  root: { width: 320 },
};

const SingleCalculator = ({ classes, id }) => (
  <div className={classes.root}>
    <Calculator id={id} />
  </div>
);
SingleCalculator.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(styles)(SingleCalculator);
