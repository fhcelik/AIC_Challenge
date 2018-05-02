import { connect } from 'react-redux';
import { compose, pure, withHandlers } from 'recompose';
import Dashboard from '../components/Dashboard';
import { addCalculator } from '../redux/actions/calculators';
import { listCalculatorIdsSelector } from '../redux/selectors/calculators';

export default compose(
  connect(
    state => ({
      formulas: [],
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
)(Dashboard);
