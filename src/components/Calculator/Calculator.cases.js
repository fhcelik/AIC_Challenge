import { normalize } from 'normalizr';
import * as R from 'ramda';
import React from 'react';
import { calculatorList } from '../../redux/schemas/calculator';
import Calculator from '../Calculator';
import { jwt, user } from '../../tests/data';

const testCalculators = [
  {
    id: 'quadraticCalcId',
    author: user.id,
    args: {
      a: { value: 1 },
      b: { value: 8 },
      c: { value: -9 },
    },
    result: {
      execFormula: '(-b + sqrt(b^2-4a*c))/(2a)',
    },
    title: 'Quadratic Formula',
    description: 'Formula for finding roots of a quadratic polynomial',
    tags: ['pure math'],
  },

  {
    id: 'mwCalcId',
    author: user.id,
    args: {
      pressure: { value: 5000, unit: 'psi' },
      TVD: { value: 8000, unit: 'ft' },
    },
    result: {
      execFormula: 'pressure / TVD',
      unit: 'ppg',
    },
    title: 'Mud weight',
    description:
      'Find mud weight based on pressure and total vertical distance (TVD)',
    tags: ['basic drilling'],
  },

  {
    id: 'mwMCalcId',
    author: user.id,
    args: {
      pressure: { value: 5000, unit: 'psi' },
      TVD: { value: 2500, unit: 'm', alias: 'Total vertical distance' },
    },
    result: { refId: 'mwCalcId' },
  },

  {
    id: 'errCalcId',
    author: user.id,
    args: {
      x: { value: 1 },
      y: { value: 3 },
    },
    result: { execFormula: 'x^2 + y + z' },
    title: 'Error test',
    description: 'error',
    tags: [],
  },

  {
    id: 'nestedQuadraticCalcId',
    author: user.id,
    args: {
      a: { value: 1 },
      b: { refId: 'quadraticCalcId' },
      c: { value: 4 },
    },
    result: { refId: 'quadraticCalcId' },
  },

  {
    id: 'nestedPressureCalcId',
    author: user.id,
    args: {
      MW: { refId: 'mwCalcId', unit: 'ppg' },
      TVD: { value: 8000, unit: 'ft' },
    },
    result: { execFormula: 'MW * TVD', unit: 'psi' },
    title: 'Derive Pressure',
    description:
      'Find pressure based on mud weight and total vertical distance (TVD)',
    tags: ['basic drilling'],
  },
];

const { entities, result } = normalize(testCalculators, calculatorList);

export const initialState = {
  auth: { jwt },
  entities: {
    ...entities,
    usages: { quadraticCalcId: 2860, mwCalcId: 365, mwMCalcId: 2042394 },
    users: {
      [user.id]: {
        fullName: 'John Smith',
        role: 'Petroleum engineer',
        company: 'Chevron',
      },
    },
  },
};

export default R.zipObj(
  result,
  R.map(id => () => <Calculator id={id} />, result)
);
