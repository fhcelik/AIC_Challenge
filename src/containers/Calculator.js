import math from 'mathjs';
import { connect } from 'react-redux';
import { compose, lifecycle, pure, withHandlers } from 'recompose';
import { createSelector } from 'reselect';
import { addCalculatorFormulaArg, changeCalculatorArg, removeCalculatorFormulaArg } from '../redux/actions/calculators';
import Calculator from '../components/Calculator';

export const ENTER_VALUE = "Enter value";

function exists(obj) {
  return "undefined" !== typeof(obj);
}

function evalFormula(state, calc) {
  const formula = state.formulas[calc.formula];

  const scope = {};
  for(const arg of formula.args) {
    scope[arg.name] = 0;
    const calcArg = {...arg, ...calc.argvals[arg.name]};
    const value = exists(calcArg.refId) ?
      evalFormula(state, state.calculators[calcArg.refId]) :
      calcArg.value;
    if (exists(calcArg.unit)) {
      if (typeof(value) === typeof(math.unit(calcArg.unit))) {
        scope[arg.name] = value.to(calcArg.unit);
      } else {
        scope[arg.name] = math.unit(value, calcArg.unit);
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

function unitEquals(u1, u2) {
  if (exists(u1) !== exists(u2)) return false;
  if (!exists(u1) && !exists(u2)) return true;
  return math.unit(u1).equalBase(math.unit(u2));
}

export default compose(
  lifecycle({
    componentDidCatch(error, info) {
      this.setState({ hasError: true });
      console.log(error.message); }
  }),
  connect(
    createSelector([
        state => state.formulas,
        state => state.calculators,
        (state, { id }) => state.calculators[id],
      ],
      (formulas, calculators, calc) => {
        const formula = formulas[calc.formula];
        const args = formula.args.map(arg => {
          const base = {...arg, ...calc.argvals[arg.name], formulas: []};
          for (const formulaId in formulas) {
            const argFormula = formulas[formulaId];
            if (unitEquals(arg.unit, argFormula.result.unit)) {
              base.formulas.push({id: formulaId, title: argFormula.title});
            }
          }
          return base;
        });
        const result = {
          displayFormula: math.parse(formula.result.execFormula).toTex(),
          result: math.format(evalFormula({formulas, calculators}, calc)),
          ...formula.result};
        const { title, description, tags } = {...formula, ...calc};
        return {args, result, title, description, tags};
      }
    ), {
      addCalculatorFormulaArg,
      changeCalculatorArg,
      removeCalculatorFormulaArg,
    }
  ),
  withHandlers({
    onArgChange: ({ id, changeCalculatorArg }) => event => {
      changeCalculatorArg({id,
        argvals: {[event.target.name]: {value: Number(event.target.value)}}
      });
    },
    setArgToFormula: ({ id, addCalculatorFormulaArg, removeCalculatorFormulaArg }) => argname =>
    event => {
      if (id.length === event.target.value.length) {
        addCalculatorFormulaArg({id, argname, formulaId: event.target.value});
      } else if (ENTER_VALUE === event.target.value) {
        removeCalculatorFormulaArg({id, argname});
      }
    },
  }),
  pure,
)(Calculator);
