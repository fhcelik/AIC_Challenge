import { compose, getContext } from 'recompose';
import PropTypes from 'prop-types';
import PublishIcon from '@material-ui/icons/Publish';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ConfirmationDialog from '../../../../ConfirmationDialog';
import updateLayoutOnChange from '../../../../hoc/updateLayoutOnChange';

const styles = {
  root: {
    width: 306,
  },
};

const enhance = compose(
  getContext({ onCalculatorEditDone: PropTypes.func }),
  updateLayoutOnChange,
  withStyles(styles)
);

const PublishConfirmationContent = ({
  classes,
  handleClose,
  onCalculatorEditDone,
}) => (
  <ConfirmationDialog
    className={classes.root}
    bodyText="You cannot make any changes to a calculator after it's published"
    handleClose={handleClose}
    handleConfirm={onCalculatorEditDone}
    headerText="Publish this calculator?"
    icon={PublishIcon}
  />
);

PublishConfirmationContent.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  onCalculatorEditDone: PropTypes.func,
};

export default enhance(PublishConfirmationContent);
