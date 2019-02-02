import React from 'react';
import { jwt, user } from '../../tests/data';
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
      '3cb10d04-f85c-4655-95da-5488a7fbf0c2': {
        id: '3cb10d04-f85c-4655-95da-5488a7fbf0c2',
        author: 'another-author-uuid',
        result: {
          name: 'x',
          execFormula: '(-b + sqrt(b^2-4a*c))/(2a)',
        },
        tags: ['pure math'],
        args: {
          a: { value: 2, name: 'a' },
          b: { value: 10, name: 'b' },
          c: { value: -3, name: 'c' },
        },
        title: 'Quadratic Formula',
        description: 'Formula for finding roots of a quadratic polynomial',
      },
    },
    users: {
      'some-author-uuid': {
        id: 'some-author-uuid',
        fullName: 'Some Author',
      },
      'another-author-uuid': {
        id: 'another-author-uuid',
      },
    },
  },
  calculatorsByAuthor: {
    'some-author-uuid': {
      calculators: ['8308d829-b7b3-4693-8a89-0f3ffb40d804'],
    },
    'another-author-uuid': {
      calculators: ['3cb10d04-f85c-4655-95da-5488a7fbf0c2'],
    },
    [user.id]: {
      calculators: ['5838d829-b7b3-4693-8a89-0f3ffb40d804'],
    },
  },
  auth: { jwt, user },
};

export default {
  myCalculators: () => (
    <CalculatorsByAuthor id="7798bb40-2fd4-4afa-b2f4-19b245b1903b" />
  ),
  withFullName: () => <CalculatorsByAuthor id="some-author-uuid" />,
  withoutFullName: () => <CalculatorsByAuthor id="another-author-uuid" />,
};
