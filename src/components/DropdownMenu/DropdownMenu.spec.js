import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import DropdownMenu from './DropdownMenu.container';
import { Button } from '@material-ui/core';
import ThemeProvider from '../../providers/theme';

describe('<DropdownMenu/>', () => {
  let wrapper;
  beforeEach(() => {
    const target = <Button>target</Button>;
    const children = [
      <Button key="1" value="1">
        1
      </Button>,
      <Button key="2">2</Button>,
    ];
    wrapper = mount(
      <ThemeProvider>
        <DropdownMenu target={target} children={children} />
      </ThemeProvider>
    );
  });

  it('closes when target clicked after opening', () => {
    wrapper.find('Target>div').simulate('click');
    expect(wrapper.find('Collapse').prop('in')).to.equal(true);
    wrapper.find('Target>div').simulate('click');
    expect(wrapper.find('Collapse').prop('in')).to.equal(false);
  });

  it('closes when a child is clicked after opening', () => {
    wrapper.find('Target>div').simulate('click');
    expect(wrapper.find('Collapse').prop('in')).to.equal(true);
    wrapper.find('button [value="1"]').simulate('click');
    expect(wrapper.find('Collapse').prop('in')).to.equal(false);
  });
});
