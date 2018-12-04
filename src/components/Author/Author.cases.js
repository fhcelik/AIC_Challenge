import React from 'react';
import Author from './';

export const initialState = {
  entities: {
    users: {
      'user-uuid': {
        fullName: 'John Smith',
        role: 'Petroleum engineer',
        company: 'Chevron',
      },
    },
  },
};

export default {
  base: () => <Author id="user-uuid" />,
};
