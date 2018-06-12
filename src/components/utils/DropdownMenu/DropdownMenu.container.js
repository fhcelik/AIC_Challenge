import compose from 'recompose/compose';
import { withStateHandlers } from 'recompose';
import DropdownMenuView from './DropdownMenu.view';

const enhance = compose(
  withStateHandlers(
    {
      open: false,
    },
    {
      handleToggle: ({ open }) => () => ({ open: !open }),
      handleClose: () => () => ({ open: false }),
    }
  )
);

export default enhance(DropdownMenuView);
