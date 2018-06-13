import jssSerializer from 'jss-snapshot-serializer';
import * as R from 'ramda';
import renderer from 'react-test-renderer';

expect.addSnapshotSerializer(jssSerializer);

jest.mock('material-ui/Tooltip', () => 'Tooltip');
jest.mock('react-flipper', () => ({
  Flipper: 'Flipper',
  Front: 'Front',
  Back: 'Back',
}));
jest.mock('react-transition-group', () => 'Transition');

const snapshotCase = story => () => {
  const tree = renderer.create(story()).toJSON();
  expect(tree).toMatchSnapshot();
};

const SnapshotTestCases = R.forEachObjIndexed((story, name) => {
  test(name, snapshotCase(story));
});
export default SnapshotTestCases;
