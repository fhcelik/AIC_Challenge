import math from 'mathjs';
import * as R from 'ramda';
import { createSelector } from 'reselect';

export const calculatorsSelector = R.prop('calculators');

export const calculatorSelector = (state, { id }) =>
  R.path(['calculators', id], state);

function recursiveFlatten(calculators, calculator) {
  const formulaSource = R.path(['result', 'refId'], calculator);
  if (!formulaSource) {
    return calculator;
  }
  const rootCalculator = recursiveFlatten(
    calculators,
    calculators[formulaSource]
  );
  return {
    ...rootCalculator,
    ...calculator,
    argvals: R.map(
      rootArg =>
        R.merge(
          R.dissoc('refId', rootArg),
          R.path(['argvals', rootArg.name], calculator)
        ),
      rootCalculator.argvals
    ),
    result: R.merge(rootCalculator.result, calculator.result)
  };
}

export const flatCalculatorSelector = createSelector(
  [calculatorsSelector, calculatorSelector],
  (calculators, calc) => {
    return recursiveFlatten(calculators, calc);
  }
);

export const calculatorDisplayFormulaSelector = createSelector(
  [flatCalculatorSelector],
  flatCalculator => math.parse(flatCalculator.result.execFormula).toTex()
);

export const nestedCalculatorSelector = createSelector(
  [calculatorsSelector, (_, { id }) => id],
  (calculators, id) => {
    function recursiveLookup(calculators, id, nestedCalculators) {
      const calc = calculators[id];
      if (!calc) {
        return nestedCalculators;
      }
      const ret = { ...nestedCalculators, [id]: calc };
      return R.reduce(
        (acc, elem) => recursiveLookup(calculators, elem.refId, acc),
        ret,
        R.filter(arg => arg.refId, R.values(calc.argvals))
      );
    }
    return recursiveLookup(calculators, id, {});
  }
);

export const nestedFlatCalculatorSelector = createSelector(
  [nestedCalculatorSelector, calculatorsSelector],
  (nestedSlice, calculators) =>
    R.map(calc => recursiveFlatten(calculators, calc), nestedSlice)
);

function exists(obj) {
  return 'undefined' !== typeof obj;
}

function unitEquals(u1, u2) {
  if (exists(u1) !== exists(u2)) return false;
  if (!exists(u1) && !exists(u2)) return true;
  return math.unit(u1).equalBase(math.unit(u2));
}

const formulasSelector = createSelector(calculatorsSelector, calculators =>
  R.filter(R.path(['result', 'execFormula']), calculators)
);

export const calculatorArgsSelector = createSelector(
  [formulasSelector, flatCalculatorSelector],
  (formulas, flatCalculator) =>
    R.values(
      R.map(
        arg => ({
          value: 0,
          ...arg,
          formulas: R.values(
            R.map(
              R.pick(['id', 'title']),
              R.filter(
                argFormula => unitEquals(arg.unit, argFormula.result.unit),
                formulas
              )
            )
          )
        }),
        flatCalculator.argvals
      )
    )
);

function convertToUnit(value, unit) {
  if (!exists(value)) return convertToUnit(0, unit);
  if (exists(unit)) {
    if (typeof value === typeof math.unit(unit)) {
      return value.to(unit);
    } else {
      return math.unit(value, unit);
    }
  } else {
    return value;
  }
}

function convertToNumber(value, unit) {
  if (exists(unit) && typeof value === typeof math.unit(unit)) {
    return value.toNumber(unit);
  }
  return value;
}

function evalCalculator(flatCalculators, calcId) {
  const calc = flatCalculators[calcId];
  let scope = {};
  try {
    scope = R.map(arg => {
      const value = exists(arg.refId)
        ? evalCalculator(flatCalculators, arg.refId)
        : arg.value;
      return convertToUnit(value, arg.unit);
    }, calc.argvals);
  } catch (error) {
    console.error(error);
    return NaN;
  }

  const builtFormula = math.parse(calc.result.execFormula);
  return convertToNumber(builtFormula.eval(scope), calc.result.unit);
}

export const calculatorResultValueSelector = createSelector(
  [nestedFlatCalculatorSelector, (_, { id }) => id],
  (flatCalculators, calcId) => {
    return math.format(evalCalculator(flatCalculators, calcId));
  }
);

export const calculatorResultSelector = createSelector(
  [
    flatCalculatorSelector,
    calculatorDisplayFormulaSelector,
    calculatorResultValueSelector
  ],
  (flatCalculator, displayFormula, result) => ({
    ...flatCalculator.result,
    displayFormula,
    result
  })
);

export const calculatorPropsSelector = createSelector(
  [calculatorArgsSelector, calculatorResultSelector, flatCalculatorSelector],
  (args, result, flatCalculator) => {
    const { title, description, tags } = flatCalculator;
    return { args, result, title, description, tags };
  }
);

export const listCalculatorIdsSelector = createSelector(
  calculatorsSelector,
  R.keys
);
