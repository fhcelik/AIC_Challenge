import path from 'path';
import * as R from 'ramda';
import requireContext from 'require-context';
import SnapshotTestCases from './SnapshotTestCases';
import TestProvider, { IdentityDecorator } from './TestProvider';

const req = requireContext('../../src/components', true, /.cases.js$/);
req.keys().forEach(filename => {
  const {
    default: Cases,
    initialState = {},
    Decorator = IdentityDecorator,
  } = req(filename);
  describe(path.basename(filename, '.cases.js'), () => {
    SnapshotTestCases(
      R.map(
        story => () => TestProvider(() => Decorator(story), { initialState }),
        Cases
      )
    );
  });
});
