import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose, pure, withProps } from 'recompose';
import { calculatorsByAuthorId } from '../../redux/selectors/calculatorsByAuthor';
import { fetchCalculatorsByAuthorId } from '../../redux/actions/calculatorsByAuthor';
import { getCalculatorsByUserLink } from '../App/Routing/Routing';
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
      () => ({ title: 'my calculators' }),
      ({ id }) => ({ title: `calculators by ${id}` })
    )
  ),
  withProps(({ id, title }) => ({
    onShareHoverText: `Share ${title}`,
    urlToShare: getCalculatorsByUserLink(id),
  })),
  handleFetchEntityEnhancer({
    entityName: 'calculatorIds',
    entitySelector: calculatorsByAuthorId,
    fetchEntityAction: fetchCalculatorsByAuthorId,
  }),
  pure
)(CalculatorGrid);
