import { ClickAwayListener, Collapse } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import DownIcon from 'material-ui-icons/ArrowDropDown';
import PropTypes from 'prop-types';
import React from 'react';
import { Manager, Popper, Target } from 'react-popper';

const styles = theme => ({
  root: {
    display: 'inline-block',
  },
  icon: {
    top: 'auto',
    right: '0',
    color: '#A53C25',
    bottom: '4px',
    position: 'absolute',
    fontSize: '28px',
    transform: 'rotate(-45deg)',
    pointerEvents: 'none',
  },
  target: {
    cursor: 'pointer',
    position: 'relative',
  },
  items: {
    background: theme.palette.navbar.background,
    borderColor: theme.palette.card.header,
    border: '1px solid',
  },
});

const DropdownMenu = ({
  children,
  classes,
  handleClose,
  handleToggle,
  hasIcon = true,
  offset = '0, 0',
  open,
  target,
}) => (
  <Manager>
    <ClickAwayListener onClickAway={handleClose}>
      <Target onClick={handleToggle} className={classes.target}>
        {target}
        {hasIcon && <DownIcon className={classes.icon} />}
      </Target>
      <Popper
        placement="bottom-start"
        eventsEnabled={open}
        modifiers={{ offset: { offset } }}
        onClick={handleClose}
      >
        <Collapse in={open}>
          <div className={classes.items}>{children}</div>
        </Collapse>
      </Popper>
    </ClickAwayListener>
  </Manager>
);

DropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  hasIcon: PropTypes.bool,
  offset: PropTypes.string,
  open: PropTypes.bool.isRequired,
  target: PropTypes.node.isRequired,
};

export default withStyles(styles)(DropdownMenu);
