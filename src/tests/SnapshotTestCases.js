import jssSerializer from 'jss-snapshot-serializer';
import * as R from 'ramda';
import renderer from 'react-test-renderer';
import { createAction } from 'redux-actions';

expect.addSnapshotSerializer(jssSerializer);
const mockActionCreator = createAction('@@calcoola/stub');

jest.mock('material-ui/Tooltip', () => 'Tooltip');
jest.mock('react-transition-group', () => 'Transition');
jest.mock('react-stack-grid', () => 'StackGrid');
jest.mock('../redux/actions/collections', () => ({
  fetchCollection: mockActionCreator,
}));

const snapshotCase = story => () => {
  const tree = renderer.create(story()).toJSON();
  expect(tree).toMatchSnapshot();
};

const SnapshotTestCases = R.forEachObjIndexed((story, name) => {
  test(name, snapshotCase(story));
});
export default SnapshotTestCases;
