import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import NavBar from './NavBar.view';
import { isAuthorizedSelector } from '../../redux/selectors/auth';

export default compose(
  withRouter,
  connect(state => ({
    isAuthorized: isAuthorizedSelector(state),
  }))
)(NavBar);
