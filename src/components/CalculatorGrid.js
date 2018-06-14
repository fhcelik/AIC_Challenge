import PropTypes from 'prop-types';
import React from 'react';
import StackGrid from 'react-stack-grid';
import Calculator from './Calculator';
import NewCalculatorButton from './NewCalculatorButton';

const CalculatorGrid = ({ addButton = false, calculatorIds }) => {
  let stackGrid;
  const onResize = () => stackGrid && stackGrid.updateLayout();
  return (
    <StackGrid
      gridRef={grid => {
        stackGrid = grid;
      }}
      columnWidth={320}
      gutter={15}
    >
      {calculatorIds.map(id => (
        <Calculator key={id} id={id} onResize={onResize} />
      ))}
      {addButton && <NewCalculatorButton />}
    </StackGrid>
  );
};

CalculatorGrid.propTypes = {
  addButton: PropTypes.bool.isRequired,
  calculatorIds: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default CalculatorGrid;
