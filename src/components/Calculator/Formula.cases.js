import React from 'react';
import Formula from './Formula';

export const Decorator = story => (
  <div style={{ color: 'white' }}>{story()}</div>
);

export default {
  'basic TeX': () => <Formula formula="\sum_{n=0}^{\infty}{\frac{1}{2^n}}=2" />,
  error: () => <Formula formula="\sum}{" />,
  'with other text': () => (
    <div>
      When <Formula formula="a \ne 0," /> there are two solutions to{' '}
      <Formula formula="ax^2+bx+c=0" /> and they are{' '}
      <Formula formula="x = {-b \pm \sqrt{b^2-4ac} \over 2a}." />
    </div>
  ),
};
