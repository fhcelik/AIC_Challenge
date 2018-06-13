import * as R from 'ramda';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Routing, { Routes } from '../Routing';

export default R.map(
  route => () => (
    <MemoryRouter initialEntries={[route]}>
      <Routing />
    </MemoryRouter>
  ),
  Routes
);
