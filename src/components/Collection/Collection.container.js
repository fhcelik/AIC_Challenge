import { connect } from 'react-redux';
import { compose, pure, withHandlers, withProps } from 'recompose';
import Collection from './Collection.view';
import { withRouter } from 'react-router';
import { addCalculator } from '../../redux/actions/calculators';
import { listCalculatorIdsSelector } from '../../redux/selectors/calculators';

export default compose(
  withRouter,
  withProps(({ location }) => ({
    collectionUrl: location.search,
  })),
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
)(Collection);
