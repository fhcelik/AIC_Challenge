import { storiesOf } from '@storybook/react';
import React from 'react';
import SearchBar from '../src/components/SearchBar';
import SearchResults from '../src/components/SearchResults';
import TestProvider from '../src/tests/TestProvider';
import StoryRouter from 'storybook-react-router';

storiesOf('Search', module)
  .addDecorator(StoryRouter())
  .addDecorator(TestProvider)
  .add('Search test', () => (
    <div>
      <SearchBar />
      <SearchResults />
    </div>
  ));
