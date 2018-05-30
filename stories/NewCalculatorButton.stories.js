import React from 'react';
import { storiesOf } from '@storybook/react';
import Decorator from './Provider';
import NewCalculatorButton from '../src/components/NewCalculatorButton';

storiesOf('NewCalculatorButton', module)
  .addDecorator(Decorator)
  .add('render NewCalculatorButton', () => <NewCalculatorButton />);
