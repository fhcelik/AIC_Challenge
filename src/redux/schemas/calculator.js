import * as R from 'ramda';
import { schema } from 'normalizr';
import uuid from 'uuid/v4';

export function Calculator(props = {}) {
  return {
    id: uuid(),
    result: {},
    ...props,
    argvals: R.mapObjIndexed(
      (arg, name) => ({ ...arg, name }),
      R.prop('argvals', props)
    ),
  };
}

export const calculator = new schema.Entity('calculators');

calculator.define({
  argvals: new schema.Values({ refId: calculator }),
  result: { refId: calculator },
});
