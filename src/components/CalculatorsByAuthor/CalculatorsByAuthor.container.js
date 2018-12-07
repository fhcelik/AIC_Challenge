import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose, pure, withProps } from 'recompose';
import { calculatorsByAuthorId } from '../../redux/selectors/calculatorsByAuthor';
import { fetchCalculatorsByAuthorId } from '../../redux/actions/calculatorsByAuthor';
import handleFetchEntityEnhancer from '../hoc/handleFetchEntity';
import { loggedInUserIdSelector } from '../../redux/selectors/auth';
import CalculatorGrid from '../CalculatorGrid';

export default compose(
  connect(state => ({
    loggedInUserId: loggedInUserIdSelector(state),
  })),
  withProps(
    R.ifElse(
      ({ id, loggedInUserId }) => loggedInUserId === id,
      () => ({ title: 'MY CALCULATORS' }),
      ({ id }) => ({ title: `CALCULATORS BY ${id}` })
    )
  ),
  handleFetchEntityEnhancer({
    entityName: 'calculatorIds',
    entitySelector: calculatorsByAuthorId,
    fetchEntityAction: fetchCalculatorsByAuthorId,
  }),
  pure
)(CalculatorGrid);
