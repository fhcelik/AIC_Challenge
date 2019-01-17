import { compose, withHandlers, withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { isLoginDropdownOpenSelector } from '../../../redux/selectors/app';
import {
  closeLoginDropdown,
  toggleLoginDropdown,
} from '../../../redux/actions/app';
import Login from './Login.view';

export default compose(
  connect(
    state => ({ isLoginDropdownOpen: isLoginDropdownOpenSelector(state) }),
    {
      closeLoginDropdown,
      toggleLoginDropdown,
    }
  ),
  withHandlers({
    closeLoginDropdown: ({ closeLoginDropdown }) => () => closeLoginDropdown(),
    toggleLoginDropdown: ({ toggleLoginDropdown }) => () =>
      toggleLoginDropdown(),
  }),
  withStateHandlers(
    {
      isConfirmationDialogOpen: false,
    },
    {
      closeConfirmationDialog: () => () => ({
        isConfirmationDialogOpen: false,
      }),
      openConfirmationDialog: () => () => ({ isConfirmationDialogOpen: true }),
    }
  )
)(Login);
