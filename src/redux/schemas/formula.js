import { schema } from 'normalizr';

export function Formula(props = {}) {
  return ({ args: {}, result: {}, tags: [], ...props});
}

export const formula = new schema.Entity('formulas');
