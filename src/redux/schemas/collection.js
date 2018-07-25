import { schema } from 'normalizr';
import { calculatorList } from './calculator';
import uuid from 'uuid/v4';

export const MY_COLLECTION_ID = 'my-calculators';

export function Collection(props = {}) {
  return {
    id: uuid(),
    name: '',
    calculators: [],
    ...props,
  };
}

export const collection = new schema.Entity(
  'collections',
  {
    calculators: calculatorList,
  },
  { processStrategy: value => Collection(value) }
);

export const collectionList = new schema.Array(collection);
