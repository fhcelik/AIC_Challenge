import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import Collection from '../src/components/Collection';
import Decorator from './Provider';

storiesOf('Collection', module)
  .addDecorator(Decorator)
  .addDecorator(StoryRouter())
  .add('Collection', () => <Collection />);
