import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import ThemeProvider from '../../providers/theme';
import NewCalculatorButton from './index';
import configureStore from 'redux-mock-store';
import { addCalculator } from '../../redux/actions/calculators';

describe('<NewCalculatorButton/>', () => {
  it('calls addCalculator action with correct payload', () => {
    const mockStore = configureStore()({});

    const wrapper = mount(
      <ThemeProvider>
        <NewCalculatorButton store={mockStore} />
      </ThemeProvider>
    );

    wrapper.find('button').simulate('click');
    const action = mockStore.getActions()[0];
    expect(action.type).to.equal(addCalculator().type);
    expect(action.payload).to.have.property('id');
  });
});
