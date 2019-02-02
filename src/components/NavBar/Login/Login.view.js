import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ConfirmationDialog from './ConfirmationDialog';
import DropdownMenu from '../../DropdownMenu';
import Form from './Form';

const styles = theme => ({
  button: {
    padding: '1em',
    paddingRight: '1.5em',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.link.hover,
    },
  },
  dialogText: {
    ...theme.typography.display3,
  },
});

const Login = ({
  classes,
  closeConfirmationDialog,
  closeLoginDropdown,
  isConfirmationDialogOpen,
  isLoginDropdownOpen,
  openConfirmationDialog,
  toggleLoginDropdown,
}) => (
  <Fragment>
    <DropdownMenu
      offset="-130%"
      placement="bottom"
      keepOpen
      openControlled
      isDropdownOpen={isLoginDropdownOpen}
      closeDropdown={closeLoginDropdown}
      toggleDropdown={toggleLoginDropdown}
      withPropsToChildren
      target={<Button className={classes.button}>Login</Button>}
    >
      <Form openConfirmationDialog={openConfirmationDialog} />
    </DropdownMenu>
    <ConfirmationDialog
      closeConfirmationDialog={closeConfirmationDialog}
      isConfirmationDialogOpen={isConfirmationDialogOpen}
    />
  </Fragment>
);

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  closeConfirmationDialog: PropTypes.func.isRequired,
  closeLoginDropdown: PropTypes.func.isRequired,
  isConfirmationDialogOpen: PropTypes.bool.isRequired,
  isLoginDropdownOpen: PropTypes.bool.isRequired,
  openConfirmationDialog: PropTypes.func.isRequired,
  toggleLoginDropdown: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
