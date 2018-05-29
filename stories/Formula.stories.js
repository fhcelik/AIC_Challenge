import React from 'react';
import { storiesOf } from '@storybook/react';
import Formula from '../src/components/Calculator/Formula';

storiesOf('Formula', module)
  .add('basic TeX', () => (
    <Formula formula="\sum_{n=0}^{\infty}{\frac{1}{2^n}}=2" />
  ))
  .add('error', () => <Formula formula="\sum}{" />)
  .add('with other text', () => (
    <p>
      When <Formula formula="a \ne 0," /> there are two solutions to{' '}
      <Formula formula="ax^2+bx+c=0" /> and they are{' '}
      <Formula formula="x = {-b \pm \sqrt{b^2-4ac} \over 2a}." />
    </p>
  ));
