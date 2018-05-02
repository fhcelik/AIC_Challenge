import React from 'react';
import { Provider } from 'react-redux';
import JssProvider from '../src/providers/jss';
import ThemeProvider from '../src/providers/theme';
import createStore from '../src/redux/store';
import { addCalculator } from '../src/redux/actions/calculators';
import { getUnitDefinitions } from '../src/redux/actions/units';

const store = createStore();

store.dispatch(getUnitDefinitions());

export const quadraticCalcId = store.dispatch(
  addCalculator({
    argvals: {
      a: { value: 1 },
      b: { value: 8 },
      c: { value: -9 },
    },
    result: {
      name: 'x',
      execFormula: '(-b + sqrt(b^2-4a*c))/(2a)',
    },
    title: 'Quadratic Formula',
    description: 'Formula for finding roots of a quadratic polynomial',
    tags: ['pure math'],
  })
).payload.id;

export const mwCalcId = store.dispatch(
  addCalculator({
    argvals: {
      pressure: { value: 5000, unit: 'psi' },
      TVD: { value: 8000, unit: 'ft' },
    },
    result: {
      execFormula: 'pressure / TVD',
      name: 'Equivalent mud weight',
      unit: 'ppg',
    },
    title: 'Mud weight',
    description:
      'Find mud weight based on pressure and total vertical distance (TVD)',
    tags: ['basic drilling'],
  })
).payload.id;

export const mwMCalcId = store.dispatch(
  addCalculator({
    argvals: {
      pressure: { value: 5000, unit: 'psi' },
      TVD: { value: 2500, unit: 'm', alias: 'Total vertical distance' },
    },
    result: { refId: mwCalcId },
  })
).payload.id;

export const errCalcId = store.dispatch(
  addCalculator({
    argvals: {
      x: { value: 1 },
      y: { value: 3 },
    },
    result: { execFormula: 'x^2 + y + z', name: 'error' },
    title: 'Error test',
    description: 'error',
    tags: [],
  })
).payload.id;

export const nestedQuadraticCalcId = store.dispatch(
  addCalculator({
    argvals: {
      a: { value: 1 },
      b: { refId: quadraticCalcId },
      c: { value: 4 },
    },
    result: { refId: quadraticCalcId },
  })
).payload.id;

export const nestedPressureCalcId = store.dispatch(
  addCalculator({
    argvals: {
      MW: { refId: mwCalcId, unit: 'ppg' },
      TVD: { value: 8000, unit: 'ft' },
    },
    result: { execFormula: 'MW * TVD', name: 'Pressure', unit: 'psi' },
    title: 'Derive Pressure',
    description:
      'Find pressure based on mud weight and total vertical distance (TVD)',
    tags: ['basic drilling'],
  })
).payload.id;

export default function Decorator(story) {
  return (
    <JssProvider>
      <ThemeProvider>
        <Provider store={store}>{story()}</Provider>
      </ThemeProvider>
    </JssProvider>
  );
}
