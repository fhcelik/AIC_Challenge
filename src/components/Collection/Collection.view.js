import { Typography } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import CalculatorGrid from '../CalculatorGrid';

export default function Collection({ collection }) {
  return (
    <React.Fragment>
      <Typography variant="display4">{collection.name}</Typography>
      <CalculatorGrid calculatorIds={collection.calculators} addButton={true} />
    </React.Fragment>
  );
}

Collection.propTypes = {
  collection: PropTypes.shape({
    name: PropTypes.string.isRequired,
    calculators: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};
