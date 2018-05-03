import React from 'react';
import { storiesOf } from '@storybook/react';
import CalculatorResult from '../src/components/Calculator/CalculatorResult';

storiesOf('CalculatorResult', module).add('polynomial x=3', () => (
  <CalculatorResult name="y_1" displayFormula="x^2+x" result="12" />
));
