import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, pure } from 'recompose';
import math from 'mathjs';
import TextField from 'material-ui/TextField';
import FormulaResult from './FormulaResult';
import { changeFormulaArg } from '../Actions';

function buildArg(arg, onChange) {
  const argUnit = arg.unit ? ` (${arg.unit})` : '';
  return (
    <div className="formula-arg" key={arg.name}>
      <TextField name={arg.name} label={`${arg.name}${argUnit}:`} type="number" defaultValue={arg.value} onChange={onChange}/>
    </div>
  );
}

function buildResult(formula, scope) {
  return (
    <FormulaResult key={formula.name} name={formula.name}
      execFormula={formula.execFormula}
      scope={scope}
      unit={formula.unit}
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
  const scope = {};
  const args = props.args.map(arg => {
    scope[arg.name] = arg.unit ? math.unit(arg.value, arg.unit) : arg.value;
    return buildArg(arg, props.onChange)
  });
  return (
    <div className="formula-card" key={props.id}>
      <div className="formula-args">
        {args}
      </div>
      <div className="formula-results">
        {buildResult(props.result, scope)}
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
    }).isRequired,
  ).isRequired,
  result: PropTypes.shape({
      execFormula: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      unit: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  updateScope: PropTypes.func.isRequired,
  hasError: PropTypes.bool
};

const enhance = compose(
  lifecycle({
    componentDidCatch(error, info) {
      this.setState({ hasError: true });
      console.log(error.message);
    }
  }),
  connect(
    (state, { id }) => {
      const fc = state.formulaCards[id];
      const args = state.formulas[fc.formula].args.map(arg =>
        Object.assign({}, arg, {
          value: fc.argvals[arg.name].value ? fc.argvals[arg.name].value : 0,
          unit: fc.argvals[arg.name].unit,
        })
      );

      return ({
        args,
        result: state.formulas[fc.formula].result,
      });
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

export default enhance(FormulaCard);