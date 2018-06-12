import { Grid, Typography } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import Calculator from '../Calculator';
import NewCalculatorButton from '../NewCalculatorButton';

export default function Collection(props) {
  const calculators = props.calculators.map(id => (
    <Calculator key={id} id={id} />
  ));
  return (
    <Grid container>
      <Typography variant="display4" style={{ float: 'right' }}>
        Collection: {props.id}
      </Typography>
      {calculators}
      <NewCalculatorButton />
    </Grid>
  );
}

Collection.propTypes = {
  calculators: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
