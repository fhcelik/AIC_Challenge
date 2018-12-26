import { connect } from 'react-redux';
import { branch, compose, pure, renderComponent } from 'recompose';
import { loggedInUserIdSelector } from '../../redux/selectors/auth';
import CalculatorsByAuthor from '../CalculatorsByAuthor';
import PopularCalculators from '../PopularCalculators';

export default compose(
  connect(state => ({
    id: loggedInUserIdSelector(state),
  })),
  branch(({ id }) => !id, renderComponent(PopularCalculators)),
  pure
)(CalculatorsByAuthor);
