import { compose } from 'recompose';
import { connect } from 'react-redux';
import NavBar from './NavBar.view';
import { isAuthorizedSelector } from '../../redux/selectors/auth';

export default compose(
  connect(state => ({
    isAuthorized: isAuthorizedSelector(state),
  }))
)(NavBar);
