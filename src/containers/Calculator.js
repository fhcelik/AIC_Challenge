import math from 'mathjs';
import { connect } from 'react-redux';
import { compose, lifecycle, pure, withHandlers } from 'recompose';
import { createSelector } from 'reselect';
import { addCalculatorArgReference, changeCalculatorArg, changeCalculatorResult, removeCalculatorArgReference } from '../redux/actions/calculators';
import Calculator from '../components/Calculator';

export const ENTER_VALUE = "Enter value";

function exists(obj) {
  return "undefined" !== typeof(obj);
}
function convertToUnit(value, unit) {
  if (exists(unit)) {
    if (typeof(value) === typeof(math.unit(unit))) {
      return value.to(unit);
    } else {
      return math.unit(value, unit);
    }
  } else {
    return value;
  }
}

function convertToNumber(value, unit) {
  if (exists(unit) && typeof(value) === typeof(math.unit(unit))) {
    return value.toNumber(unit);
  }
  return value;
}

function evalFormula(state, calc) {
  const formula = state.formulas[calc.formula];

  const scope = {};
  for(const arg of formula.args) {
    const calcArg = {...arg, ...calc.argvals[arg.name]};
    const value = exists(calcArg.refId) ?
      evalFormula(state, state.calculators[calcArg.refId]) :
      calcArg.value;
    scope[arg.name] = convertToUnit(value, calcArg.unit);
  }

  const builtFormula = math.parse(formula.result.execFormula);
  const resultUnit = calc.result ? calc.result.unit : formula.result.unit;
  return convertToNumber(builtFormula.eval(scope), resultUnit);
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
          ...formula.result, ...calc.result};
        const { title, description, tags } = {...formula, ...calc};
        return {args, result, title, description, tags};
      }
    ), {
      addCalculatorArgReference,
      changeCalculatorArg,
      changeCalculatorResult,
      removeCalculatorArgReference,
    }
  ),
  withHandlers({
    onArgValueChange: ({ id, changeCalculatorArg }) => event => {
      changeCalculatorArg({id,
        argvals: {[event.target.name]: {value: Number(event.target.value)}}
      });
    },
    onArgUnitChange: ({ id, changeCalculatorArg }) => event => {
      changeCalculatorArg({id,
        argvals: {[event.target.name]: {unit: event.target.value}}
      });
    },
    onResultUnitChange: ({ id, changeCalculatorResult }) => event => {
      changeCalculatorResult({id,
        result: {unit: event.target.value}
      });
    },
    setArgToFormula: ({ id, addCalculatorArgReference, removeCalculatorArgReference }) => argname =>
    event => {
      if (id.length === event.target.value.length) {
        addCalculatorArgReference({id, argname, formulaId: event.target.value});
      } else if (ENTER_VALUE === event.target.value) {
        removeCalculatorArgReference({id, argname});
      }
    },
  }),
  pure,
)(Calculator);
