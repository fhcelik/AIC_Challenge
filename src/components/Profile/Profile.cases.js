import React from 'react';
import Profile from '.';

export const initialState = {
  auth: {
    user: {
      id: '7798bb40-2fd4-4afa-b2f4-19b245b1903b',
      fullName: 'John Smith',
      email: 'johnsmith@gmail.com',
      role: 'Petroleum Engineer',
      company: 'Suncor',
    },
  },
};

export default {
  base: () => <Profile />,
};
