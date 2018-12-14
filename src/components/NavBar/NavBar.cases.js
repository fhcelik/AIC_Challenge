import React from 'react';
import NavBar from '../NavBar';
import { jwt, user } from '../../tests/data';

export const initialState = {
  app: { menuCollectionList: ['collection-uuid'] },
  auth: { jwt, user },
  entities: {
    collections: {
      'collection-uuid': {
        id: 'collection-uuid',
        author: user.id,
        name: 'test navbar',
        calculators: [],
      },
    },
  },
};

export default {
  base: () => <NavBar />,
};
