import React from 'react';
import AuthorPopupInfo from './';

export const initialState = {
  entities: {
    users: {
      'user-uuid': {
        id: '7798bb40-2fd4-4afa-b2f4-19b245b1903b',
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
