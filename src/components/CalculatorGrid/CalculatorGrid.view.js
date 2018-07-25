import { Typography, withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import StackGrid from 'react-stack-grid';
import Calculator from '../Calculator';
import NewCalculatorButton from '../NewCalculatorButton';

const styles = {
  root: {
    margin: '20px 30px',
  },
  grid: {
    marginTop: '30px',
  },
};

const CalculatorGrid = ({
  calculatorIds,
  classes,
  setDomNode,
  showAddCalculatorButton = false,
  title,
}) => (
  <div className={classes.root}>
    <Typography variant="display4">{title}</Typography>
    <StackGrid
      className={classes.grid}
      gridRef={setDomNode}
      columnWidth={320}
      gutterWidth={25}
      gutterHeight={25}
    >
      {calculatorIds.map(id => <Calculator key={id} id={id} />)}
      {showAddCalculatorButton && <NewCalculatorButton />}
    </StackGrid>
  </div>
);

CalculatorGrid.propTypes = {
  calculatorIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  classes: PropTypes.object.isRequired,
  setDomNode: PropTypes.func.isRequired,
  showAddCalculatorButton: PropTypes.bool,
  title: PropTypes.string,
};

export default withStyles(styles)(CalculatorGrid);
