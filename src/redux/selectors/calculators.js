import * as R from 'ramda';
import { createSelector } from 'reselect';
import math, { parse } from '../../mathjs-secured';
import { newCalculatorsByCollectionIdSelector } from './collections';

export const calculatorsSelector = R.path(['entities', 'calculators']);

export const calculatorSelector = (state, { id }) =>
  R.prop(id, calculatorsSelector(state));

const getCombinedPropsFromItemsList = (
  prop,
  combineFunc = R.identity,
  ...items
) => R.pipe(R.pluck(prop), R.flatten, R.filter(R.identity), combineFunc)(items);

const recursiveFlatten = (calculators, calculator) => {
  const formulaSource = R.path(['result', 'refId'], calculator);
  if (!formulaSource) return calculator;

  const rootCalculator = recursiveFlatten(
    calculators,
    calculators[formulaSource]
  );

  return {
    ...rootCalculator,
    ...calculator,
    args: R.map(
      rootArg =>
        R.merge(
          R.dissoc('refId', rootArg),
          R.path(['args', rootArg.name], calculator)
        ),
      R.propOr([], 'args', rootCalculator)
    ),
    tags: getCombinedPropsFromItemsList(
      'tags',
      R.uniq,
      rootCalculator,
      calculator
    ),
    result: getCombinedPropsFromItemsList(
      'result',
      R.reduce(R.merge, null),
      rootCalculator,
      calculator
    ),
  };
};

export const flatCalculatorSelector = createSelector(
  [calculatorsSelector, calculatorSelector],
  recursiveFlatten
);

export const calculatorDisplayFormulaSelector = createSelector(
  [flatCalculatorSelector],
  flatCalculator =>
    parse(R.pathOr('', ['result', 'execFormula'], flatCalculator)).toTex()
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
        R.filter(arg => arg.refId, R.values(calc.args))
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

export const calculatorArgsSelector = createSelector(
  [flatCalculatorSelector],
  R.compose(R.values, R.propOr({}, 'args'))
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
  try {
    if (exists(unit) && typeof value === typeof math.unit(unit)) {
      return value.toNumber(unit);
    }
    return math.complex(value);
  } catch (error) {
    return NaN;
  }
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
      calc.args
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
      if (!R.pathOr(null, ['args', name], calc)) return name;
    }
  }
);

const mapArgToAlias = argMap => node => {
  if (node.isSymbolNode && argMap[node.name]) {
    return new math.expression.node.SymbolNode(argMap[node.name]);
  }
  return node;
};

const symbolToTeX = node => {
  if (node.isSymbolNode) {
    return ' ' + JSON.stringify(node.name).replace(/\W/g, '');
  }
};

export const calculatorResultFormulaSelector = createSelector(
  [flatCalculatorSelector, calculatorArgsSelector],
  (calc, args) => {
    try {
      const argMap = R.zipObj(R.pluck('name', args), R.pluck('alias', args));
      const tree = parse(calc.result.execFormula).transform(
        mapArgToAlias(argMap)
      );
      return tree.toTex({ handler: symbolToTeX });
    } catch (error) {
      return '';
    }
  }
);

export const calculatorResultUnitSelector = createSelector(
  [nestedFlatCalculatorSelector, calculatorSelector],
  (flatCalculators, calc) => {
    const result = evalCalculator(flatCalculators, R.propOr(null, 'id', calc));
    let finalResult;
    try {
      const prevUnit = R.pathOr(null, ['result', 'unit'], calc);
      if (prevUnit && typeof result === typeof math.unit(prevUnit)) {
        finalResult = convertToUnit(result, prevUnit);
      } else {
        finalResult = result;
      }
    } catch (error) {
      finalResult = result;
    }
    return R.prop('toJSON', finalResult) && finalResult.toJSON().unit;
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
      10
    );
  }
);

export const allArgsHaveValuesSelector = createSelector(
  calculatorArgsSelector,
  R.pipe(R.values, R.pluck('value'), R.all(v => typeof v === 'number'))
);

export const calculatorResultSelector = createSelector(
  flatCalculatorSelector,
  calculatorResultValueSelector,
  allArgsHaveValuesSelector,
  (flatCalculator, result, allArgsHaveValues) => ({
    ...flatCalculator.result,
    result: allArgsHaveValues ? result : '',
  })
);

const createCalculatorPropertySelector = (prop, defaultValue = '') =>
  createSelector(flatCalculatorSelector, R.propOr(defaultValue, prop));

export const calculatorTitleSelector = createCalculatorPropertySelector(
  'title'
);

export const calculatorDescriptionSelector = createCalculatorPropertySelector(
  'description'
);

export const calculatorTagsSelector = createCalculatorPropertySelector(
  'tags',
  []
);

export const calculatorAuthorSelector = createCalculatorPropertySelector(
  'author'
);

export const calculatorIsNewSelector = createSelector(
  (state, { collectionId, id: calculatorId }) => ({
    newCalculators: newCalculatorsByCollectionIdSelector(state, {
      id: collectionId,
    }),
    calculatorId,
  }),
  ({ newCalculators, calculatorId }) => R.contains(calculatorId, newCalculators)
);

export const listCalculatorIdsSelector = createSelector(
  calculatorsSelector,
  R.keys
);
