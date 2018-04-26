import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import CalculatorArgument from './CalculatorArgument';
import FormulaResult from './FormulaResult';

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    border: '2px black solid'
  },

  args: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const Calculator = ({
  classes,
  description,
  title,
  id,
  tags,
  args,
  onArgValueChange,
  onArgUnitChange,
  setArgToFormula,
  result,
  onResultUnitChange
}) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <Tooltip id={`${id}-tooltip`} title={description}>
        <Typography>{title}</Typography>
      </Tooltip>
      {tags.map(tag => <Chip key={tag} label={tag} />)}
    </div>
    <div className={classes.args}>
      {args.map(arg => (
        <CalculatorArgument
          key={arg.name}
          arg={arg}
          onArgValueChange={onArgValueChange}
          onArgUnitChange={onArgUnitChange}
          setArgToFormula={setArgToFormula}
        />
      ))}
    </div>
    <FormulaResult {...result} onResultUnitChange={onResultUnitChange} />
  </div>
);

Calculator.propTypes = {
  id: PropTypes.string.isRequired,
  args: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number,
      unit: PropTypes.string,
      refId: PropTypes.string,
      formulas: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  ).isRequired,
  onArgValueChange: PropTypes.func.isRequired,
  onArgUnitChange: PropTypes.func.isRequired,
  result: PropTypes.shape({
    displayFormula: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    unit: PropTypes.string,
    result: PropTypes.string
  }).isRequired,
  onResultUnitChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setArgToFormula: PropTypes.func.isRequired
};

export default withStyles(styles)(Calculator);
