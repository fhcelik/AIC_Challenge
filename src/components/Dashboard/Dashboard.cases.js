import React from 'react';
import Dashboard from './';
import { jwt, user } from '../../tests/data';

const calculators = {
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
    usages: 343,
    title: 'Quadratic Formula',
    description: 'Formula for finding roots of a quadratic polynomial',
  },
  '8308d829-b7b3-4693-8a89-0f3ffb40d804': {
    id: '8308d829-b7b3-4693-8a89-0f3ffb40d804',
    author: user.id,
    result: {
      name: 'x',
      execFormula: '(-b + sqrt(b^2-4a*c))/(2a)',
    },
    usages: 121,
    tags: ['pure math'],
    args: {
      a: { value: 1, name: 'a' },
      b: { value: 8, name: 'b' },
      c: { value: -9, name: 'c' },
    },
    title: 'Quadratic Formula',
    description: 'Formula for finding roots of a quadratic polynomial',
  },
};

export const initialState = {
  entities: {
    calculators,
    users: {
      [user.id]: {
        fullName: 'John Smith',
        role: 'Petroleum engineer',
        company: 'Chevron',
      },
    },
  },
  recentlyUsedCalculators: [
    '8308d829-b7b3-4693-8a89-0f3ffb40d804',
    '5838d829-b7b3-4693-8a89-0f3ffb40d804',
  ],
  popularCalculators: ['5838d829-b7b3-4693-8a89-0f3ffb40d804'],
  calculatorsByAuthor: {
    [user.id]: {
      calculators: [
        '8308d829-b7b3-4693-8a89-0f3ffb40d804',
        '5838d829-b7b3-4693-8a89-0f3ffb40d804',
      ],
    },
  },
  auth: { jwt, user },
};

export default {
  base: () => <Dashboard />,
};
