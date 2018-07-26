import { compose, withHandlers, withStateHandlers } from 'recompose';
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
  ),
  withHandlers({
    onChildClick: ({ handleClose, keepOpen }) => event =>
      keepOpen ? null : handleClose(event),
  })
);

export default enhance(DropdownMenuView);
