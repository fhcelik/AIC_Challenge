import { connect } from 'react-redux';
import { compose, pure } from 'recompose';
import { searchResultsSelector } from '../../redux/selectors/search';
import CalculatorGrid from '../CalculatorGrid';

export default compose(
  connect((state, props) => ({
    calculatorIds: searchResultsSelector(state, props),
  })),
  pure
)(CalculatorGrid);
