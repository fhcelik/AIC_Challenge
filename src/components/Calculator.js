import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import CalculatorArgument from './CalculatorArgument';
import FormulaResult from './FormulaResult';

function buildResult(formula) {
  return (
    <FormulaResult key={formula.name} name={formula.name}
      displayFormula={formula.displayFormula}
      result={formula.result}
    />
  );
}

export default function Calculator(props) {
  if (props.hasError) {
    return (
      <div className="formula-card" key={props.id}>
        Invalid formula
      </div>
    );
  }
  const tags = props.tags.map(tag => (
    <Chip key={tag} label={tag} />
  ))
  const args = props.args.map(arg => (
    <CalculatorArgument key={arg.name}
      arg={arg}
      onArgChange={props.onArgChange}
      setArgToFormula={props.setArgToFormula}
    />
  ));
  return (
    <div className="calculator-card" key={props.id}>
      <div className="calculator-header">
        <Tooltip id={`${props.id}-tooltip`} title={props.description}>
          <Typography>{props.title}</Typography>
        </Tooltip>
        {tags}
      </div>
      <div className="calculator-args">
        {args}
      </div>
      <div className="calculator-results">
        {buildResult(props.result)}
      </div>
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
      formulas: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired})
      ).isRequired,
    }).isRequired,
  ).isRequired,
  result: PropTypes.shape({
      displayFormula: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      unit: PropTypes.string,
      result: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onArgChange: PropTypes.func.isRequired,
  setArgToFormula: PropTypes.func.isRequired,
  hasError: PropTypes.bool
};
