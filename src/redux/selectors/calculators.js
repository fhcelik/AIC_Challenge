import math, { parse } from '../../mathjs-secured';
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
    tags: R.uniq(R.concat(rootCalculator.tags, calculator.tags)),
    result: R.merge(rootCalculator.result, calculator.result),
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
  flatCalculator => parse(flatCalculator.result.execFormula).toTex()
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
          ...arg,
          formulas: R.values(
            R.map(
              R.pick(['id', 'title']),
              R.filter(
                argFormula => unitEquals(arg.unit, argFormula.result.unit),
                formulas
              )
            )
          ),
        }),
        flatCalculator.argvals
      )
    )
);

function convertToUnit(value, unit) {
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
    try {
      return value.toNumber(unit);
    } catch (error) {
      return NaN;
    }
  }
  return value;
}

function evalCalculator(flatCalculators, calcId) {
  const calc = flatCalculators[calcId];
  let scope = {};
  try {
    scope = R.map(
      arg =>
        exists(arg.refId)
          ? evalCalculator(flatCalculators, arg.refId)
          : convertToUnit(arg.value, arg.unit),
      calc.argvals
    );
    const builtFormula = parse(calc.result.execFormula);
    return builtFormula.eval(scope);
  } catch (error) {
    return NaN;
  }
}

const letters = 'abcdefghijklmnopqrstuvwxyz';
const wrap = letters.length;

function* newCalculatorArgnameGenerator() {
  let generation = 0;
  let prefix = '';
  while (true) {
    yield prefix + letters[generation % wrap];
    generation += 1;
    if (generation % wrap === 0) {
      prefix += letters[letters.length - 1];
    }
  }
}

export const newCalculatorArgNameSelector = createSelector(
  calculatorSelector,
  calc => {
    const namegen = newCalculatorArgnameGenerator();
    while (true) {
      const name = namegen.next().value;
      if (!calc.argvals[name]) {
        return name;
      }
    }
  }
);

export const calculatorResultFormulaSelector = createSelector(
  [flatCalculatorSelector],
  calc => {
    try {
      return parse(calc.result.execFormula).toTex();
    } catch (error) {
      return '';
    }
  }
);

export const calculatorResultUnitSelector = createSelector(
  [nestedFlatCalculatorSelector, calculatorSelector],
  (flatCalculators, calc) => {
    const result = evalCalculator(flatCalculators, calc.id);
    let finalResult;
    try {
      const prevUnit = calc.result.unit;
      if (prevUnit && typeof result === typeof math.unit(prevUnit)) {
        finalResult = convertToUnit(result, prevUnit);
      } else {
        finalResult = result;
      }
    } catch (error) {
      finalResult = result;
    }
    return finalResult.toJSON && finalResult.toJSON().unit;
  }
);

export const calculatorResultValueSelector = createSelector(
  [nestedFlatCalculatorSelector, (_, { id }) => id],
  (flatCalculators, calcId) => {
    return math.format(
      convertToNumber(
        evalCalculator(flatCalculators, calcId),
        R.path([calcId, 'result', 'unit'], flatCalculators)
      ),
      5
    );
  }
);

export const calculatorResultSelector = createSelector(
  [flatCalculatorSelector, calculatorResultValueSelector],
  (flatCalculator, result) => ({
    ...flatCalculator.result,
    result,
  })
);

export const calculatorTitleSelector = createSelector(
  flatCalculatorSelector,
  R.prop('title')
);

export const calculatorDescriptionSelector = createSelector(
  flatCalculatorSelector,
  R.prop('description')
);

export const calculatorTagsSelector = createSelector(
  flatCalculatorSelector,
  R.prop('tags')
);

export const listCalculatorIdsSelector = createSelector(
  calculatorsSelector,
  R.keys
);
