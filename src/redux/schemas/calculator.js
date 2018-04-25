import { schema } from 'normalizr';
import uuid from 'uuid/v4';
import { formula } from './formula';

export function Calculator(props = {}) {
  return { id: uuid(), argvals: {}, ...props };
}

export const calculator = new schema.Entity('calculators', { formula });

calculator.define({ argvals: { refId: calculator } });
