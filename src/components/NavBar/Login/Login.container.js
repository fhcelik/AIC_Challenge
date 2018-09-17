import { compose, withStateHandlers } from 'recompose';
import Login from './Login.view';

export default compose(
  withStateHandlers(
    {
      isDialogOpen: false,
    },
    {
      closeDialog: () => () => ({ isDialogOpen: false }),
      openDialog: () => () => ({ isDialogOpen: true }),
    }
  )
)(Login);
