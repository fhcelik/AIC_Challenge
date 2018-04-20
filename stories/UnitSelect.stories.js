import React from 'react';
import { storiesOf } from '@storybook/react';
import UnitSelect from '../src/components/UnitSelect';
import Decorator from './Provider';

storiesOf('UnitSelect', module)
  .addDecorator(Decorator)
  .add('Length', () => (
    <UnitSelect name="Length" defaultUnit="m" onChange={(event) => console.log(event.target.value)} />
  ))
  .add('Pressure', () => (
    <UnitSelect name="Pressure" defaultUnit="psi" onChange={(event) => console.log(event.target.value)} />
  ))
  .add('Density', () => (
    <UnitSelect name="Density" defaultUnit="ppg" onChange={(event) => console.log(event.target.value)} />
  ))
