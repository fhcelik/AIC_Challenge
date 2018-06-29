import { Typography } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import CalculatorGrid from '../CalculatorGrid';
import { withStyles } from 'material-ui';

const styles = () => ({
  root: {
    margin: '20px 30px',
  },
  grid: {
    marginTop: '30px',
  },
});

const Collection = ({ classes, collection }) => (
  <div className={classes.root}>
    <Typography variant="display4">{collection.name}</Typography>
    <CalculatorGrid
      className={classes.grid}
      calculatorIds={collection.calculators}
      addButton={true}
    />
  </div>
);

Collection.propTypes = {
  collection: PropTypes.shape({
    name: PropTypes.string.isRequired,
    calculators: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default withStyles(styles)(Collection);
