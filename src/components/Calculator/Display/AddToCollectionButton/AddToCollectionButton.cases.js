import { normalize } from 'normalizr';
import React from 'react';
import { collectionList } from '../../../../redux/schemas/collection';
import { jwt, user } from '../../../../tests/data';
import AddToCollectionButton from '../AddToCollectionButton';

const testData = [
  {
    id: 'f604cabd-49e0-4be5-85d7-5de58c2692ba',
    name: 'My Favourites',
    calculators: [{ id: 'calculator-1' }],
  },
  {
    id: 'a10d006b-c1a2-4fa3-8b3f-1bca7ad74bd3',
    name: 'Interesting Calculators',
  },
  {
    id: '62ae405e-8fc3-4a33-be11-a0e02326b289',
    name: 'Collection of Calculators with a really long name',
  },
];

const { entities, result } = normalize(testData, collectionList);

export const initialState = {
  entities,
  app: { menuCollectionList: result },
  auth: { jwt, user },
};

export const Decorator = story => (
  <div style={{ color: 'white' }}>{story()}</div>
);

export default {
  base: () => <AddToCollectionButton calculatorId="calculator-1" />,
};
