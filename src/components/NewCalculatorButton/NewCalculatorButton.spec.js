import { expect } from 'chai';
import { MemoryRouter } from 'react-router';
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
      <MemoryRouter>
        <ThemeProvider>
          <NewCalculatorButton store={mockStore} />
        </ThemeProvider>
      </MemoryRouter>
    );

    wrapper.find('button').simulate('click');
    const action = mockStore.getActions()[0];
    expect(action.type).to.equal(
      addCalculator({ collectionId: 'collection_id' }).type
    );
  });
});
