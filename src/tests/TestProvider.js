import * as R from 'ramda';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router';
import JssProvider from '../providers/jss';
import ThemeProvider from '../providers/theme';
import configureStore from '../redux/store';
import { registerUnitDefinitions } from '../redux/actions/units';

export const InitialState = initialState => (story, context) => {
  context.initialState = R.merge({}, initialState, context.initialState || {});
  return story();
};

export const IdentityDecorator = story => story();

const unitList = ['m', 'ft', 'psi', 'atm', 'bar', 'kPa', 'km', 'N/L'];
const unitDefinitions = {
  ppg: '1 lbf / gal',
};

export default function TestProvider(story, context) {
  const { store } = configureStore(context.initialState, false);
  store.dispatch(registerUnitDefinitions({ unitList, unitDefinitions }));

  return (
    <Router>
      <JssProvider>
        <ThemeProvider>
          <Provider store={store}>{story()}</Provider>
        </ThemeProvider>
      </JssProvider>
    </Router>
  );
}
