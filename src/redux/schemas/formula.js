import { schema } from 'normalizr';
import uuid from 'uuid/v4';

export function Formula(props = {}) {
  return { id: uuid(), args: {}, result: {}, tags: [], ...props };
}

export const formula = new schema.Entity('formulas');
