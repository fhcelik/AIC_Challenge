import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ThemeProvider from '../../providers/theme';

import UnitSelect from './UnitSelect.view';

describe('<UnitSelect/>', () => {
  it('calls change handler when value selected', () => {
    const value = '3';
    const onChange = sinon.spy();
    const wrapper = mount(
      <ThemeProvider>
        <UnitSelect name="test" units={['1', '2', value]} onChange={onChange} />
      </ThemeProvider>
    );

    wrapper.find('[role="button"]').simulate('click');
    wrapper.find(`li [data-value="${value}"]`).simulate('click');
    expect(onChange.lastCall.lastArg.key).to.equal(value);
  });
});
