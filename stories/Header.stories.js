import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import Decorator from './Provider';
import Header from '../src/components/Header';

storiesOf('Header', module)
  .addDecorator(Decorator)
  .addDecorator(StoryRouter())
  .add('CollectionSelect', () => <Header />);
