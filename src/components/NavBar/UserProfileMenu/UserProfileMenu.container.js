import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { userSelector } from '../../../redux/selectors/auth';
import { logout } from '../../../redux/actions/auth';
import UserProfileMenu from './UserProfileMenu.view';

const enhance = compose(
  connect(userSelector, { logout }),
  withHandlers({
    onLogout: ({ logout }) => () => logout(),
  })
);

export default enhance(UserProfileMenu);
