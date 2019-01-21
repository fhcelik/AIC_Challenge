import DeleteIcon from '@material-ui/icons/Delete';
import DeleteIconOutlined from '@material-ui/icons/DeleteOutline';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ConfirmationDialog from '../ConfirmationDialog';
import DropdownMenu from '../DropdownMenu';
import IconButton from '../IconButton';

const styles = {
  dialog: {
    width: 260,
  },
};

const DeleteButton = ({ classes, deleteTooltipTitle, handleDelete }) => (
  <DropdownMenu
    offset="10px, 5px"
    placement="bottom-end"
    hasIcon={false}
    keepOpen
    withPropsToChildren
    target={
      <IconButton iconOnHover={DeleteIcon} tooltipTitle={deleteTooltipTitle}>
        <DeleteIconOutlined />
      </IconButton>
    }
  >
    <ConfirmationDialog
      className={classes.dialog}
      handleConfirm={handleDelete}
      headerText="Delete this collection?"
      icon={DeleteIcon}
    />
  </DropdownMenu>
);

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteTooltipTitle: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(DeleteButton);
