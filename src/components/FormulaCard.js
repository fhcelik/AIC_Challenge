import React from 'react';
import PropTypes from 'prop-types';
import Formula from './Formula';
import math from 'mathjs';

class FormulaCard extends React.PureComponent {
  constructor(props) {
    super(props);
    const scope = {};
    for (const arg of props.args) {
      scope[arg.name] = arg.value;
    }
    this.state = scope;
    this.handleChange = this.handleChange.bind(this);
  }

handleChange(event) {
  const newScope = {};
  newScope[event.target.name] = event.target.value;
  this.setState(newScope);
}

buildArg(arg) {
  return (
    <div className="formula-arg" key={arg.name}>
      <label>
        {arg.name}:
        <input name={arg.name} type="number" defaultValue={arg.value} onChange={this.handleChange}/>
      </label>
    </div>);
}

buildResult(formula) {
  let fun = math.compile(formula.execFormula);
  const scope = this.state;

  return (
    <div className="formula-result" key={formula.name}>
      {formula.name}:
      {fun.eval(scope).toString()}
    </div>
  );
}

render() {
  const { props } = this;
  const args = props.args.map(arg => this.buildArg(arg));
  const results = props.execFormulae.map(formula => this.buildResult(formula));
  return (
    <div className="formula-card" key={props.id}>
      <div className="formula-args">
        {args}
      </div>
      <Formula formula={props.displayFormula}/>
      <div className="formula-results">
        {results}
      </div>
    </div>
  );
}
}

FormulaCard.propTypes = {
  id: PropTypes.number.isRequired,
  args: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  execFormulae: PropTypes.arrayOf(
    PropTypes.shape({
      execFormula: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  displayFormula: PropTypes.string.isRequired,
};

export default FormulaCard;