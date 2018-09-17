import { ClickAwayListener, Collapse } from 'material-ui';
import DownIcon from 'material-ui-icons/ArrowDropDown';
import { withStyles } from 'material-ui/styles';
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
    overflowY: 'auto',
    maxHeight: '75vh',
  },
  popover: {
    zIndex: 2,
  },
});

const DropdownMenu = ({
  children,
  classes,
  handleClose,
  handleToggle,
  hasIcon = true,
  offset = '0, 0',
  onChildClick,
  onResize,
  open,
  placement = 'bottom-start',
  target,
  withPropsToChildren,
}) => (
  <ClickAwayListener onClickAway={handleClose}>
    <Manager>
      <Target onClick={handleToggle} className={classes.target}>
        {target}
        {hasIcon && <DownIcon className={classes.icon} />}
      </Target>
      <Popper
        className={classes.popover}
        placement={placement}
        eventsEnabled={open}
        modifiers={{
          offset: { offset },
          flip: { enabled: false },
        }}
        onClick={onChildClick}
      >
        <Collapse in={open} onEntered={onResize} onExited={onResize}>
          <div className={classes.items}>
            {withPropsToChildren
              ? React.Children.map(children, child =>
                  React.cloneElement(child, { open, handleClose })
                )
              : children}
          </div>
        </Collapse>
      </Popper>
    </Manager>
  </ClickAwayListener>
);

DropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  hasIcon: PropTypes.bool,
  offset: PropTypes.string,
  onChildClick: PropTypes.func.isRequired,
  onResize: PropTypes.func,
  open: PropTypes.bool.isRequired,
  placement: PropTypes.string,
  target: PropTypes.node.isRequired,
  withPropsToChildren: PropTypes.bool,
};

export default withStyles(styles)(DropdownMenu);
