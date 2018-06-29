import PropTypes from 'prop-types';
import React from 'react';
import StackGrid from 'react-stack-grid';
import Calculator from './Calculator';
import NewCalculatorButton from './NewCalculatorButton';
import { compose, withStateHandlers, withHandlers } from 'recompose';

const CalculatorGrid = ({
  className,
  addButton = false,
  calculatorIds,
  setDomNode,
  updateLayout,
}) => {
  return (
    <StackGrid
      className={className}
      gridRef={setDomNode}
      columnWidth={320}
      gutterWidth={25}
      gutterHeight={25}
    >
      {calculatorIds.map(id => (
        <Calculator key={id} id={id} onResize={updateLayout} />
      ))}
      {addButton && <NewCalculatorButton />}
    </StackGrid>
  );
};

CalculatorGrid.propTypes = {
  addButton: PropTypes.bool,
  calculatorIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const enhance = compose(
  withStateHandlers(
    { domNode: undefined },
    { setDomNode: () => domNode => ({ domNode }) }
  ),
  withHandlers(() => ({
    updateLayout: ({ domNode }) => () => domNode.updateLayout(),
  }))
);
export default enhance(CalculatorGrid);
