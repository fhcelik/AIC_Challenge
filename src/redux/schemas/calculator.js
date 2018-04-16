import { schema } from 'normalizr';
import { formula } from './formula';

export function Calculator(props={}) {
  return ({argvals: {}, ...props});
}

export const calculator = new schema.Entity('calculators', {formula});

calculator.define({ argvals: {refId: calculator} });
