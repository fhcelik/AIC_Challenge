import { connect } from 'react-redux';
import { compose, pure, withHandlers } from 'recompose';
import Collection from './Collection.view';
import { withRouter } from 'react-router';
import { addCalculator } from '../../redux/actions/calculators';
import { listCalculatorIdsSelector } from '../../redux/selectors/calculators';

export default compose(
  withRouter,
  connect(
    state => ({
      calculators: listCalculatorIdsSelector(state),
    }),
    {
      addCalculator,
    }
  ),
  withHandlers({
    onClick: ({ addCalculator }) => id => addCalculator({ formula: id }),
  }),
  pure
)(Collection);
