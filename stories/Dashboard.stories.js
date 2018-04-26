import React from 'react';
import { storiesOf } from '@storybook/react';
import Dashboard from '../src/containers/Dashboard';
import Decorator from './Provider';

storiesOf('Dashboard', module)
  .addDecorator(Decorator)
  .add('Dashboard', () => <Dashboard />);
