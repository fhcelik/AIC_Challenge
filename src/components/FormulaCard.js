import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, pure } from 'recompose';
import math from 'mathjs';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import FormulaResult from './FormulaResult';
import { changeFormulaArg } from '../Actions';

function exists(obj) {
  return "undefined" !== typeof(obj);
}

function buildArg(arg, onChange) {
  const argUnit = arg.unit ? ` (${arg.unit})` : '';
  const label = `${arg.name}${argUnit}:`;

  if (exists(arg.refId)) {
    return (
      <div className="formula-arg" key={arg.name}>
        <InputLabel>{label}</InputLabel>
        <EnhancedFormulaCard id={arg.refId} />
      </div>
    );
  } else {
    return (
      <div className="formula-arg" key={arg.name}>
        <TextField name={arg.name} label={label} type="number" defaultValue={arg.value} onChange={onChange}/>
      </div>
    );
  }
}

function buildResult(formula) {
  return (
    <FormulaResult key={formula.name} name={formula.name}
      displayFormula={formula.displayFormula}
      result={formula.result}
    />
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
  const args = props.args.map(arg => {
    return buildArg(arg, props.onChange)
  });
  return (
    <div className="formula-card" key={props.id}>
      <div className="formula-args">
        {args}
      </div>
      <div className="formula-results">
        {buildResult(props.result)}
      </div>
    </div>
  );
}

FormulaCard.propTypes = {
  id: PropTypes.number.isRequired,
  args: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number,
      unit: PropTypes.string,
      refId: PropTypes.number,
    }).isRequired,
  ).isRequired,
  result: PropTypes.shape({
      displayFormula: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      unit: PropTypes.string,
      result: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  updateScope: PropTypes.func.isRequired,
  hasError: PropTypes.bool
};

function evalFormula(state, formulaCardId) {
  const fc = state.formulaCards[formulaCardId];
  const formula = state.formulas[fc.formula];

  const scope = {};
  for(const arg of formula.args) {
    scope[arg.name] = 0;
    const cardArg = fc.argvals[arg.name];
    const unit = exists(cardArg.unit) ? cardArg.unit : arg.unit;
    const value = exists(cardArg.refId) ?
      evalFormula(state, cardArg.refId) :
      exists(cardArg.value) ? cardArg.value : arg.value;
    if (exists(unit)) {
      if (typeof(value) === typeof(math.unit(unit))) {
        scope[arg.name] = value.to(unit);
      } else {
        scope[arg.name] = math.unit(value, unit);
      }
    } else {
      scope[arg.name] = value;
    }
  }

  const builtFormula = math.parse(formula.result.execFormula);
  let convert = builtFormula;
  const resultUnit = formula.result.unit;
  if (resultUnit) {
    const unit = new math.expression.node.ConstantNode(resultUnit);
    convert = new math.expression.node.OperatorNode("to", "to", [builtFormula, unit]);
  }
  return convert.eval(scope);
}

const enhance = compose(
  lifecycle({
    componentDidCatch(error, info) {
      this.setState({ hasError: true });
      console.log(error.message); }
  }),
  connect(
    (state, { id }) => {
      const fc = state.formulaCards[id];
      const formula = state.formulas[fc.formula];
      const args = formula.args.map(arg => {
        const base = {value: 0};
        Object.assign(base, arg, fc.argvals[arg.name])
        return base;
      });
      const result = Object.assign(
        {displayFormula: math.parse(formula.result.execFormula).toTex(),
        result: math.format(evalFormula(state, id))},
        formula.result);
      return {args, result};
    },
    dispatch => bindActionCreators({
      updateScope: changeFormulaArg,
    }, dispatch)
  ),
  withHandlers({
    onChange: ({ id, updateScope }) => event => {
      const newScope = {};
      newScope[event.target.name] = { value: Number(event.target.value) };
      updateScope(id, newScope);
    }
  }),
  pure,
);

const EnhancedFormulaCard = enhance(FormulaCard);
export default EnhancedFormulaCard;