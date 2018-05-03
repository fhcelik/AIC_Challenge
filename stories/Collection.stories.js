import React from 'react';
import { storiesOf } from '@storybook/react';
import Collection from '../src/components/Collection';
import Decorator from './Provider';

storiesOf('Collection', module)
  .addDecorator(Decorator)
  .add('Collection', () => <Collection />);
