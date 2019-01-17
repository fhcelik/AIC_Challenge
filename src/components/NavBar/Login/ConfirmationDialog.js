import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  dialogText: {
    ...theme.typography.display3,
  },
});

const ConfirmationDialog = ({
  classes,
  closeConfirmationDialog,
  isConfirmationDialogOpen,
}) => (
  <Dialog open={isConfirmationDialogOpen} onClose={closeConfirmationDialog}>
    <DialogContent>
      <DialogContentText className={classes.dialogText}>
        Access link has been sent to your email.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Grid container justify="center">
        <Button onClick={closeConfirmationDialog}>OK</Button>
      </Grid>
    </DialogActions>
  </Dialog>
);

ConfirmationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  closeConfirmationDialog: PropTypes.func.isRequired,
  isConfirmationDialogOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ConfirmationDialog);
