import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import FormulaResult from './FormulaResult';

function buildArg(arg, onChange) {
  return (
    <div className="formula-arg" key={arg.name}>
      <label>
        {arg.name}:
        <input name={arg.name} type="number" defaultValue={arg.value} onChange={onChange}/>
      </label>
    </div>
  );
}

function buildResult(formula, scope) {
  return (
    <FormulaResult key={formula.name} name={formula.name}
      execFormula={formula.execFormula}
      scope={scope}/>
  );
}

function FormulaCard(props) {
  if (props.hasError) {
    return (
      <div className="formula-card" key={props.id}>
        Invalid formula
      </div>
    );
  }
  const args = props.args.map(arg => buildArg(arg, props.onChange));
  const results = props.execFormulae.map(formula => buildResult(formula, props.scope));
  return (
    <div className="formula-card" key={props.id}>
      <div className="formula-args">
        {args}
      </div>
      <div className="formula-results">
        {results}
      </div>
    </div>
  );
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
  onChange: PropTypes.func.isRequired,
  scope: PropTypes.objectOf(
    PropTypes.number.isRequired,
  ).isRequired,
  updateScope: PropTypes.func.isRequired,
  hasError: PropTypes.bool
};

const enhance = compose(
  withState('scope', 'updateScope', props => {
    const scope = {};
    for (const arg of props.args) {
      scope[arg.name] = arg.value;
    }
    return scope;
  }),
  withHandlers({
    onChange: ({ updateScope }) => event => {
      const name = event.target.name;
      const value = Number(event.target.value);
      updateScope(scope => {
        const newScope = Object.assign({}, scope);
        newScope[name] = value;
        return newScope;
      })
    }
  }),
  lifecycle({
    componentDidCatch(error, info) {
      this.setState({ hasError: true });
      console.log(error.message);
    }
  })
);

export default enhance(FormulaCard);