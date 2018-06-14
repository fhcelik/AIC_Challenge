import React from 'react';
import { Calculator as CalculatorSchema } from '../../redux/schemas/calculator';
import { Collection as CollectionSchema } from '../../redux/schemas/collection';
import Collection from './Collection.view';

const baseCollection = CollectionSchema({
  id: 'cdec5f41-e5c2-4d02-898a-481904234749',
  name: 'My Calculators',
  calculators: [
    '5838d829-b7b3-4693-8a89-0f3ffb40d804',
    '8308d829-b7b3-4693-8a89-0f3ffb40d804',
  ],
});
export const initialState = {
  calculators: {
    '5838d829-b7b3-4693-8a89-0f3ffb40d804': CalculatorSchema({
      id: '5838d829-b7b3-4693-8a89-0f3ffb40d804',
      result: {
        name: 'x',
        execFormula: '(-b + sqrt(b^2-4a*c))/(2a)',
      },
      tags: ['pure math'],
      args: {
        a: { value: 1, name: 'a' },
        b: { value: 8, name: 'b' },
        c: { value: -9, name: 'c' },
      },
      title: 'Quadratic Formula',
      description: 'Formula for finding roots of a quadratic polynomial',
    }),
    '8308d829-b7b3-4693-8a89-0f3ffb40d804': CalculatorSchema({
      id: '8308d829-b7b3-4693-8a89-0f3ffb40d804',
      result: {
        name: 'x',
        execFormula: '(-b + sqrt(b^2-4a*c))/(2a)',
      },
      tags: ['pure math'],
      args: {
        a: { value: 1, name: 'a' },
        b: { value: 8, name: 'b' },
        c: { value: -9, name: 'c' },
      },
      title: 'Quadratic Formula',
      description: 'Formula for finding roots of a quadratic polynomial',
    }),
  },
};

export default {
  base: () => <Collection collection={baseCollection} />,
};
