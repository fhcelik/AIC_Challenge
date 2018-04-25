import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import CalculatorArgument from './CalculatorArgument';
import FormulaResult from './FormulaResult';

export default function Calculator(props) {
  const tags = props.tags.map(tag => <Chip key={tag} label={tag} />);
  const args = props.args.map(arg => (
    <CalculatorArgument
      key={arg.name}
      arg={arg}
      onArgValueChange={props.onArgValueChange}
      onArgUnitChange={props.onArgUnitChange}
      setArgToFormula={props.setArgToFormula}
    />
  ));
  return (
    <div className="calculator-card">
      <div className="calculator-header">
        <Tooltip id={`${props.id}-tooltip`} title={props.description}>
          <Typography>{props.title}</Typography>
        </Tooltip>
        {tags}
      </div>
      <div className="calculator-args">{args}</div>
      <FormulaResult
        {...props.result}
        onResultUnitChange={props.onResultUnitChange}
      />
    </div>
  );
}

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
