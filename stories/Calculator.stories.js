import React from 'react';
import { storiesOf } from '@storybook/react';
import Calculator from '../src/containers/Calculator';
import Decorator, { errCalcId, mwCalcId, mwMCalcId, nestedPressureCalcId, nestedQuadraticCalcId, quadraticCalcId } from './Provider';

storiesOf('Calculator', module)
  .addDecorator(Decorator)
  .add('quadratic from state', () => (
    <Calculator id={quadraticCalcId} />
  ))
  .add('mudweight ft from state', () => (
    <Calculator id={mwCalcId} />
  ))
  .add('mudweight m from state', () => (
    <Calculator id={mwMCalcId} />
  ))
  .add('errors', () => (
    <Calculator id={errCalcId} />
  ))
  .add('quadratic from quadratic', () => (
    <Calculator id={nestedQuadraticCalcId} />
  ))
  .add('pressure from mudweight', () => (
    <Calculator id={nestedPressureCalcId} />
  ))
