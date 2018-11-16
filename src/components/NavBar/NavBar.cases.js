import React from 'react';
import NavBar from '../NavBar';
import { jwt, user } from '../../tests/data';

export const initialState = { auth: { jwt, user } };

export default {
  base: () => <NavBar />,
};
