import { expect } from 'chai';
import { createShallow } from 'material-ui/test-utils';
import React from 'react';
import ThemeProvider from '../../providers/theme';
import App from './index';
import Routing from './Routing';
import NavBar from '../NavBar';

describe('<App/>', () => {
  it('renders navigation and routing', () => {
    const shallow = createShallow({ untilSelector: 'App' });
    const wrapper = shallow(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    expect(wrapper.find(NavBar).length).to.equal(1);
    expect(wrapper.find(Routing).length).to.equal(1);
  });
});
