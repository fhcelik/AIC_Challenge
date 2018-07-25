import calculatorReducer from './calculators';
import { expect } from 'chai';
import * as Actions from '../../actions/calculators';

describe('Calculator Reducers', () => {
  const existing_calculator_id = 'existing_calculator_id';

  const initialState = {
    [existing_calculator_id]: {
      title: 'some title',
      description: 'some description',
    },
  };

  it('should return the initial state', () => {
    expect(calculatorReducer(undefined, {})).to.be.empty;
  });

  it('should handle addCalculator', () => {
    const mockCalc1 = {
      collectionId: 'collection_id_1',
      id: 'calculator_id_1',
    };
    const mockCalc2 = {
      collectionId: 'collection_id_1',
      id: 'calculator_id_2',
    };

    let state = calculatorReducer(
      {},
      { type: Actions.addCalculator(mockCalc1).type, payload: mockCalc1 }
    );
    expect(state[mockCalc1.id].id).to.equal(mockCalc1.id);

    state = calculatorReducer(state, {
      type: Actions.addCalculator(mockCalc2).type,
      payload: mockCalc2,
    });
    expect(state[mockCalc1.id].id).to.equal(mockCalc1.id);
    expect(state[mockCalc2.id].id).to.equal(mockCalc2.id);
  });

  it('should handle changeCalculatorTitle', () => {
    const newCalc = { title: 'new title', id: existing_calculator_id };

    const state = calculatorReducer(
      initialState,
      Actions.changeCalculatorTitle(newCalc)
    );
    expect(state[existing_calculator_id].title).to.equal(newCalc.title);
    expect(state[existing_calculator_id].description).to.equal(
      initialState[existing_calculator_id].description
    );
  });

  it('should handle changeCalculatorDescription', () => {
    const newCalc = {
      description: 'new description',
      id: existing_calculator_id,
    };

    const state = calculatorReducer(
      initialState,
      Actions.changeCalculatorDescription(newCalc)
    );
    expect(state[existing_calculator_id].description).to.equal(
      newCalc.description
    );
    expect(state[existing_calculator_id].title).to.equal(
      initialState[existing_calculator_id].title
    );
  });
});
