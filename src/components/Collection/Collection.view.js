import Button from 'material-ui/Button';
import { Typography } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import Calculator from '../Calculator';
import NewCalculatorButton from '../NewCalculatorButton';

export default function Collection(props) {
  const formulas = props.formulas.map(({ id, title }) => (
    <Button key={id} variant="raised" onClick={_ => props.onClick(id)}>
      {title}
    </Button>
  ));
  const calculators = props.calculators.map(id => (
    <Calculator key={id} id={id} />
  ));
  return (
    <div>
      <Typography variant="display4" style={{ float: 'right' }}>
        Collection: {props.id}
      </Typography>
      <NewCalculatorButton />
      {formulas}
      {calculators}
    </div>
  );
}

Collection.propTypes = {
  formulas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  calculators: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
