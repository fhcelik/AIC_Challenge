import abbreviate from 'number-abbreviate';
import { compose, branch, renderNothing, withProps } from 'recompose';
import { connect } from 'react-redux';
import { calculatorUsagesSelector } from '../../../../redux/selectors/calculators';
import Usages from './Usages.view';

const MIN_USAGE_COUNT = 100;

const enhance = compose(
  connect((state, props) => ({
    usagesCount: calculatorUsagesSelector(state, props),
  })),
  branch(({ usagesCount }) => usagesCount < MIN_USAGE_COUNT, renderNothing),
  withProps(({ usagesCount }) => ({
    tooltipTitle: `Has been used ${usagesCount} times`,
    label: usagesCount < 1000 ? String(usagesCount) : abbreviate(usagesCount),
  }))
);

export default enhance(Usages);
