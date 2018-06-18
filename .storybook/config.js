import { configure, storiesOf } from '@storybook/react';
import path from 'path';
import * as R from 'ramda';
import StoryRouter from 'storybook-react-router';
import TestProvider, {
  IdentityDecorator,
  InitialState,
} from '../src/tests/TestProvider';

const reqStories = require.context('../stories', true, /.stories.js$/);
const reqCases = require.context('../src/components', true, /.cases.js$/);
const testDirectoryRegex = /\.\/(.*)\//;

function loadStories() {
  reqStories.keys().forEach(reqStories);

  reqCases.keys().forEach(filename => {
    const {
      default: Cases,
      initialState = {},
      Decorator = IdentityDecorator,
    } = reqCases(filename);
    const testDirectory = testDirectoryRegex.exec(filename)[1];
    const basename = path.basename(filename, '.cases.js');
    const testName =
      testDirectory.indexOf(basename) >= 0
        ? testDirectory
        : `${testDirectory}/${basename}`;
    const stories = storiesOf(testName, module)
      .addDecorator(StoryRouter())
      .addDecorator(Decorator)
      .addDecorator(TestProvider)
      .addDecorator(InitialState(initialState));
    R.forEachObjIndexed((story, name) => {
      stories.add(name, story);
    }, Cases);
  });
}

configure(loadStories, module);
