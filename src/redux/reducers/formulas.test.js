import reducer from './formulas';
import expect from 'expect';
import * as R from 'ramda';
import getMockFormula from '../../mocks/formula';
import uuid from 'uuid/v4';

describe('formula reducer', () => {
  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle @@calcoola/formula/add', () => {
    const addAction1 = {
      type: '@@calcoola/formula/add',
      payload: { id: uuid() }
    };
    const addAction2 = {
      type: '@@calcoola/formula/add',
      payload: { id: uuid() }
    };
    let newState = reducer({}, addAction1);
    expect(R.values(newState)[0]).toEqual(addAction1.payload);
    newState = reducer(newState, addAction2);
    expect(R.values(newState).length).toEqual(2);
  });
});
