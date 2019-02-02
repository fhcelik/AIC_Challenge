import * as R from 'ramda';
import {
  branch,
  compose,
  renderComponent,
  withHandlers,
  withStateHandlers,
  withProps,
} from 'recompose';
import DropdownMenuView from './DropdownMenu.view';

const enhance = compose(
  branch(R.prop('disabled'), renderComponent(R.prop('target'))),
  withStateHandlers(
    { open: false },
    {
      handleToggle: ({ open }) => () => ({ open: !open }),
      handleClose: () => () => ({ open: false }),
    }
  ),
  withProps(
    ({ closeDropdown, isDropdownOpen, openControlled, toggleDropdown }) =>
      openControlled
        ? {
            open: isDropdownOpen,
            handleToggle: toggleDropdown,
            handleClose: closeDropdown,
          }
        : null
  ),
  withHandlers({
    onChildClick: ({ handleClose, keepOpen }) => event =>
      keepOpen ? null : handleClose(event),
  })
);

export default enhance(DropdownMenuView);
