import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
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
