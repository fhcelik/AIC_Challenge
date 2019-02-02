import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose, pure, withProps } from 'recompose';
import { newAndSavedCalculatorsByAuthorIdSelector } from '../../redux/selectors/calculatorsByAuthor';
import { fetchCalculatorsByAuthorId } from '../../redux/actions/calculatorsByAuthor';
import { getCalculatorsByUserLink } from '../App/Routing/Routing';
import handleFetchEntityEnhancer from '../hoc/handleFetchEntity';
import { loggedInUserIdSelector } from '../../redux/selectors/auth';
import { fullNameByUserIdSelector } from '../../redux/selectors/users';
import CalculatorGrid from '../CalculatorGrid';

export default compose(
  connect((state, props) => ({
    loggedInUserId: loggedInUserIdSelector(state),
    fullName: fullNameByUserIdSelector(state, props),
  })),
  withProps(({ id, loggedInUserId }) => ({
    isMyCalculators: loggedInUserId === id,
  })),
  withProps(
    R.ifElse(
      R.prop('isMyCalculators'),
      () => ({
        title: 'my calculators',
        showAddCalculatorButton: true,
      }),
      ({ fullName }) => ({
        title: `calculators by ${fullName}`,
      })
    )
  ),
  withProps(({ id, title }) => ({
    onShareHoverText: `Share ${title}`,
    urlToShare: getCalculatorsByUserLink(id),
  })),

  handleFetchEntityEnhancer({
    entityName: 'calculatorIds',
    entitySelector: newAndSavedCalculatorsByAuthorIdSelector,
    fetchEntityAction: fetchCalculatorsByAuthorId,
  }),
  pure
)(CalculatorGrid);
