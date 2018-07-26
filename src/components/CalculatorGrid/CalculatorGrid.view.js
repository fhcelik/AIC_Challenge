import { Typography, withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import StackGrid from 'react-stack-grid';
import Calculator from '../Calculator';
import NewCalculatorButton from '../NewCalculatorButton';

const styles = () => ({
  root: {
    margin: '20px 30px',
  },
  grid: {
    marginTop: '30px',
  },
});

const CalculatorGrid = ({
  classes,
  title,
  addButton = false,
  calculatorIds,
  setDomNode,
}) => {
  return (
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
        {addButton && <NewCalculatorButton />}
      </StackGrid>
    </div>
  );
};

CalculatorGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  addButton: PropTypes.bool,
  calculatorIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setDomNode: PropTypes.func.isRequired,
};

export default withStyles(styles)(CalculatorGrid);
