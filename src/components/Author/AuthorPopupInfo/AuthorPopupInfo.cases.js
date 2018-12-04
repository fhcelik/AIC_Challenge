import React from 'react';
import AuthorPopupInfo from './';

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
  base: () => <AuthorPopupInfo id="user-uuid" />,
};
