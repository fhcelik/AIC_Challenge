import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import DropdownMenu from '../../DropdownMenu';
import Form from './Form';

const styles = theme => ({
  button: {
    padding: '1.15em',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.link.hover,
    },
  },
  dialogText: {
    ...theme.typography.display3,
  },
});

const Login = ({ classes, closeDialog, isDialogOpen, openDialog }) => (
  <Fragment>
    <DropdownMenu
      offset="-130%"
      placement="bottom"
      keepOpen
      withPropsToChildren
      target={<Button className={classes.button}>Login</Button>}
    >
      <Form openDialog={openDialog} />
    </DropdownMenu>
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogContent>
        <DialogContentText className={classes.dialogText}>
          Access link has been sent to your email.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid container justify="center">
          <Button onClick={closeDialog}>OK</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  </Fragment>
);

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  openDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
