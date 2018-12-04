import { normalize } from 'normalizr';
import React from 'react';
import { collection } from '../../redux/schemas/collection';
import Collection from '../Collection';
import { jwt, user } from '../../tests/data';

const baseCollection = {
  id: 'cdec5f41-e5c2-4d02-898a-481904234749',
  name: 'My Calculators',
  author: user.id,
  calculators: [
    {
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
    {
      id: '8308d829-b7b3-4693-8a89-0f3ffb40d804',
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
  ],
  newCalculators: [],
};

const { entities, result } = normalize(baseCollection, collection);

export const initialState = {
  entities: {
    ...entities,
    users: {
      [user.id]: {
        fullName: 'John Smith',
        role: 'Petroleum engineer',
        company: 'Chevron',
      },
    },
  },
  auth: { jwt, user },
};

export default {
  base: () => <Collection id={result} />,
  beforeLoad: () => <Collection id="wrong-id" />,
};
