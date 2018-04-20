import React from 'react';
import { storiesOf } from '@storybook/react';
import FormulaResult from '../src/components/FormulaResult';

storiesOf('FormulaResult', module)
  .add('polynomial x=3', () => (
    <FormulaResult name="y_1" displayFormula="x^2+x" result="12"/>
  ))
