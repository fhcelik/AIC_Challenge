import { connect } from 'react-redux';
import { branch, compose, pure, renderNothing } from 'recompose';
import { loggedInUserIdSelector } from '../../redux/selectors/auth';
import CalculatorsByAuthor from '../CalculatorsByAuthor';

export default compose(
  connect(state => ({
    id: loggedInUserIdSelector(state),
  })),
  branch(({ id }) => !id, renderNothing),
  pure
)(CalculatorsByAuthor);
