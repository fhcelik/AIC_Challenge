import abbreviate from 'number-abbreviate';
import { connect } from 'react-redux';
import { compose, branch, renderNothing, withProps } from 'recompose';
import { usagesSelector } from '../../../../redux/selectors/usages';
import Usages from './Usages.view';

const MIN_USAGE_COUNT = 100;

const enhance = compose(
  connect((state, props) => ({
    usagesCount: usagesSelector(state, props),
  })),
  branch(({ usagesCount }) => usagesCount < MIN_USAGE_COUNT, renderNothing),
  withProps(({ usagesCount }) => ({
    label: usagesCount < 1000 ? usagesCount : abbreviate(usagesCount),
  }))
);

export default enhance(Usages);
