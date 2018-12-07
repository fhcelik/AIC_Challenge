import React from 'react';
import { user } from '../../tests/data';
import CalculatorsByAuthor from './';

export const initialState = {
  entities: {
    calculators: {
      '5838d829-b7b3-4693-8a89-0f3ffb40d804': {
        id: '5838d829-b7b3-4693-8a89-0f3ffb40d804',
        author: user.id,
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
      },
      '8308d829-b7b3-4693-8a89-0f3ffb40d804': {
        id: '8308d829-b7b3-4693-8a89-0f3ffb40d804',
        author: 'some-author-uuid',
        result: {
          name: 'x',
          execFormula: '(-b + sqrt(b^2-4a*c))/(2a)',
        },
        tags: ['pure math'],
        args: {
          a: { value: 3, name: 'a' },
          b: { value: 6, name: 'b' },
          c: { value: 10, name: 'c' },
        },
        title: 'Quadratic Formula',
        description: 'Formula for finding roots of a quadratic polynomial',
      },
    },
  },
  calculatorsByAuthor: {
    'some-author-uuid': ['8308d829-b7b3-4693-8a89-0f3ffb40d804'],
    [user.id]: ['5838d829-b7b3-4693-8a89-0f3ffb40d804'],
  },
  auth: { user },
};

export default {
  myCalculators: () => (
    <CalculatorsByAuthor id="7798bb40-2fd4-4afa-b2f4-19b245b1903b" />
  ),
  calculatorsByAuthor: () => <CalculatorsByAuthor id="some-author-uuid" />,
};
