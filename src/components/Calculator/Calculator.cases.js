import React from 'react';
import Calculator from '../Calculator';
import { Calculator as CalculatorSchema } from '../../redux/schemas/calculator';

export const initialState = {
  calculators: {
    quadraticCalcId: CalculatorSchema({
      id: 'quadraticCalcId',
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
    }),

    mwCalcId: CalculatorSchema({
      id: 'mwCalcId',
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
    }),

    mwMCalcId: CalculatorSchema({
      id: 'mwMCalcId',
      args: {
        pressure: { value: 5000, unit: 'psi' },
        TVD: { value: 2500, unit: 'm', alias: 'Total vertical distance' },
      },
      result: { refId: 'mwCalcId' },
    }),

    errCalcId: CalculatorSchema({
      id: 'errCalcId',
      args: {
        x: { value: 1 },
        y: { value: 3 },
      },
      result: { execFormula: 'x^2 + y + z' },
      title: 'Error test',
      description: 'error',
      tags: [],
    }),

    nestedQuadraticCalcId: CalculatorSchema({
      id: 'nestedQuadraticCalcId',
      args: {
        a: { value: 1 },
        b: { refId: 'quadraticCalcId' },
        c: { value: 4 },
      },
      result: { refId: 'quadraticCalcId' },
    }),

    nestedPressureCalcId: CalculatorSchema({
      id: 'nestedPressureCalcId',
      args: {
        MW: { refId: 'mwCalcId', unit: 'ppg' },
        TVD: { value: 8000, unit: 'ft' },
      },
      result: { execFormula: 'MW * TVD', unit: 'psi' },
      title: 'Derive Pressure',
      description:
        'Find pressure based on mud weight and total vertical distance (TVD)',
      tags: ['basic drilling'],
    }),
  },
};

export default {
  'quadratic from state': () => <Calculator id="quadraticCalcId" />,
  'mudweight ft from state': () => <Calculator id="mwCalcId" />,
  'mudweight m from state': () => <Calculator id="mwMCalcId" />,
  errors: () => <Calculator id="errCalcId" />,
  'quadratic from quadratic': () => <Calculator id="nestedQuadraticCalcId" />,
  'pressure from mudweight': () => <Calculator id="nestedPressureCalcId" />,
};
