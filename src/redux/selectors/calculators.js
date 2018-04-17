import math from 'mathjs';
import * as R from 'ramda';
import { createSelector } from "reselect";
import { formulasSelector } from "./formulas";

export const calculatorsSelector = R.prop('calculators');

export const calculatorSelector = (state, {id}) => R.path(['calculators', id], state);

export const calculatorFormulaSelector = createSelector(
  [calculatorSelector, formulasSelector],
  (calculator, formulas) => formulas[calculator.formula]
);

export const calculatorDisplayFormulaSelector = createSelector(
  [calculatorFormulaSelector],
  formula => math.parse(formula.result.execFormula).toTex()
);

export const nestedCalculatorSelector = createSelector(
  [calculatorsSelector,
    (_, {id}) => id,
  ], (calculators, id) => {
    function recursiveLookup(calculators, id, nestedCalculators) {
      const calc = calculators[id];
      if (!calc) { return nestedCalculators; }
      const ret = {...nestedCalculators, [id]: calc};
      return R.reduce((acc, elem) =>
        recursiveLookup(calculators, elem.refId, acc),
        ret, R.filter(arg => arg.refId, R.values(calc.argvals))
      );
    }
    return recursiveLookup(calculators, id, {});
  }
);

export const nestedCalculatorFormulaSelector = createSelector(
  [nestedCalculatorSelector,
    formulasSelector,
  ], (calculators, formulas) => ({calculators,
    formulas: R.reduce((acc, elem) =>
      R.assoc(elem.formula, formulas[elem.formula], acc), {},
      R.values(calculators)
    ),
  })
);

function exists(obj) {
  return "undefined" !== typeof(obj);
}

function unitEquals(u1, u2) {
  if (exists(u1) !== exists(u2)) return false;
  if (!exists(u1) && !exists(u2)) return true;
  return math.unit(u1).equalBase(math.unit(u2));
}

export const calculatorArgsSelector = createSelector(
  [formulasSelector,
    calculatorSelector,
    calculatorFormulaSelector,
  ], (formulas, calc, formula) =>
  formula.args.map(arg => (
    {...arg,
      ...calc.argvals[arg.name],
      formulas: R.values(R.map(R.pick(['id', 'title']),
        R.filter(argFormula =>
          unitEquals(arg.unit, argFormula.result.unit), formulas
        )
      ))
    }
  ))
);

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
  try {
    R.forEach(arg => {
      const calcArg = {...arg, ...calc.argvals[arg.name]};
      const value = exists(calcArg.refId) ?
        evalFormula(state, state.calculators[calcArg.refId]) :
        calcArg.value;
      scope[arg.name] = convertToUnit(value, calcArg.unit);
    }, formula.args);
  } catch (_) { return NaN; }

  const builtFormula = math.parse(formula.result.execFormula);
  const resultUnit = calc.result ? calc.result.unit : formula.result.unit;
  return convertToNumber(builtFormula.eval(scope), resultUnit);
}

export const calculatorResultValueSelector = createSelector(
  [nestedCalculatorFormulaSelector,
    calculatorSelector,
  ], (stateSlice, calc) => {
  return math.format(evalFormula(stateSlice, calc));
});

export const calculatorResultSelector = createSelector([
    calculatorFormulaSelector,
    calculatorDisplayFormulaSelector,
    calculatorResultValueSelector
  ], (formula, displayFormula, result) =>
  ({...formula.result, displayFormula, result})
);

export const calculatorPropsSelector = createSelector([
  calculatorArgsSelector,
  calculatorResultSelector,
  calculatorSelector,
  calculatorFormulaSelector,
], (args, result, calc, formula) => {
  const { title, description, tags } = {...formula, ...calc};
  return {args, result, title, description, tags};
});

export const listCalculatorIdsSelector = createSelector(
  calculatorsSelector,
  R.keys
);
