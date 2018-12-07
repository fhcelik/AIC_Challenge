import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { loggedInUserSelector } from '../../../redux/selectors/auth';
import { logout } from '../../../redux/actions/auth';
import UserProfileMenu from './UserProfileMenu.view';

const enhance = compose(
  connect(loggedInUserSelector, { logout }),
  withHandlers({
    onLogout: ({ logout }) => () => logout(),
  })
);

export default enhance(UserProfileMenu);
