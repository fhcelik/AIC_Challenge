import jssSerializer from 'jss-snapshot-serializer';
import * as R from 'ramda';
import renderer from 'react-test-renderer';

expect.addSnapshotSerializer(jssSerializer);

const snapshotCase = story => () => {
  const tree = renderer.create(story()).toJSON();
  expect(tree).toMatchSnapshot();
};

const SnapshotTestCases = R.forEachObjIndexed((story, name) => {
  test(name, snapshotCase(story));
});
export default SnapshotTestCases;
