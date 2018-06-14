import * as R from 'ramda';
import { schema } from 'normalizr';
import uuid from 'uuid/v4';

export const DEFAULT_ARG_VALUE = 1;

export function Calculator(props = {}) {
  return {
    id: uuid(),
    result: {},
    tags: [],
    ...props,
    args: R.mapObjIndexed(
      (arg, name) => ({ value: DEFAULT_ARG_VALUE, ...arg, name }),
      R.prop('args', props)
    ),
  };
}

export const calculator = new schema.Entity('calculators');
export const calculatorList = new schema.Array(calculator);

calculator.define({
  args: new schema.Values({ refId: calculator }),
  result: { refId: calculator },
});
