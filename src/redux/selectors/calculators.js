import * as R from 'ramda';
import { createSelector } from 'reselect';
import math, { parse } from '../../mathjs-secured';
import { myNewCalculatorsSelector } from './calculatorsByAuthor';
import { newCalculatorsByCollectionIdSelector } from './collections';

export const calculatorsSelector = R.path(['entities', 'calculators']);

export const calculatorSelector = createSelector(
  (state, { id }) => id,
  calculatorsSelector,
  R.prop
);

export const calculatorDisplayFormulaSelector = createSelector(
  calculatorSelector,
  calculator =>
    parse(R.pathOr('', ['result', 'execFormula'], calculator)).toTex()
);

export const calculatorArgsSelector = createSelector(
  calculatorSelector,
  R.compose(R.values, R.propOr({}, 'args'))
);

const convertToUnit = (value, unit) => {
  if (R.isNil(unit)) return value;

  if (typeof value === typeof math.unit(unit)) {
    return value.to(unit);
  }

  return math.unit(value, unit);
};

const convertToNumber = (value, unit) => {
  try {
    if (!R.isNil(unit) && typeof value === typeof math.unit(unit)) {
      return value.toNumber(unit);
    }
    return math.complex(value);
  } catch (error) {
    return NaN;
  }
};

const evalCalculator = calculator => {
  try {
    const scope = R.map(
      arg => convertToUnit(arg.value, arg.unit),
      calculator.args
    );
    return parse(calculator.result.execFormula).eval(scope);
  } catch (error) {
    return NaN;
  }
};

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
  calculator => {
    const namegen = newCalculatorArgnameGenerator();
    while (true) {
      const name = namegen.next().value;
      if (!R.pathOr(null, ['args', name], calculator)) return name;
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
  calculatorSelector,
  calculatorArgsSelector,
  (calculator, args) => {
    try {
      const argMap = R.zipObj(R.pluck('name', args), R.pluck('alias', args));
      return parse(calculator.result.execFormula)
        .transform(mapArgToAlias(argMap))
        .toTex({ handler: symbolToTeX });
    } catch (error) {
      return '';
    }
  }
);

export const calculatorResultValueSelector = createSelector(
  calculatorSelector,
  calculator =>
    math.format(
      convertToNumber(
        evalCalculator(calculator),
        R.path(['result', 'unit'], calculator)
      ),
      10
    )
);

export const calculatorResultUnitSelector = createSelector(
  calculatorSelector,
  calculator => {
    let result = evalCalculator(calculator);

    const prevUnit = R.pathOr(null, ['result', 'unit'], calculator);
    if (prevUnit && typeof result === typeof math.unit(prevUnit)) {
      result = convertToUnit(result, prevUnit);
    }

    return R.prop('toJSON', result) && result.toJSON().unit;
  }
);

export const allArgsHaveValuesSelector = createSelector(
  calculatorArgsSelector,
  R.pipe(R.values, R.pluck('value'), R.all(v => typeof v === 'number'))
);

export const calculatorResultSelector = createSelector(
  calculatorSelector,
  calculatorResultValueSelector,
  allArgsHaveValuesSelector,
  (calculator, result, allArgsHaveValues) => ({
    ...R.prop('result', calculator),
    result: allArgsHaveValues ? result : '',
  })
);

const createCalculatorPropertySelector = (prop, defaultValue = '') =>
  createSelector(calculatorSelector, R.propOr(defaultValue, prop));

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

export const calculatorUsagesSelector = createCalculatorPropertySelector(
  'usages',
  0
);

export const calculatorIsNewSelector = createSelector(
  (state, { id }) => id,
  (state, { collectionId: id }) =>
    newCalculatorsByCollectionIdSelector(state, { id }),
  (state, { loggedInUserId: id }) => myNewCalculatorsSelector(state, { id }),
  (id, collectionNewCalculators, myNewCalculators) =>
    R.pipe(R.ap([R.contains(id)]), R.any(R.equals(true)))([
      collectionNewCalculators,
      myNewCalculators,
    ])
);

export const listCalculatorIdsSelector = createSelector(
  calculatorsSelector,
  R.keys
);
