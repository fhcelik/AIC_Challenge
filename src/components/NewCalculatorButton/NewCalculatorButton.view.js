import AddIcon from '@material-ui/icons/AddCircleOutline';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import RequireLogin from '../RequireLogin';
import WithTooltip from '../WithTooltip';

const styles = theme => ({
  root: {
    width: '23em',
    height: '12em',
    backgroundColor: theme.palette.card.background,
    margin: '0',
    border: `1.5px dashed ${theme.palette.card.header}`,
  },
  icon: {
    color: theme.palette.text.primary,
    fontSize: '84px',
  },
});

const AddButton = ({ classes, onClick, tooltipTitle }) => (
  <WithTooltip title={tooltipTitle}>
    <Button className={classes.root} onClick={onClick}>
      <AddIcon className={classes.icon} />
    </Button>
  </WithTooltip>
);

AddButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  tooltipTitle: PropTypes.string,
};

const NewCalculatorButton = ({ classes, ...props }) => (
  <RequireLogin {...props} tooltipTitle="Create a new calculator">
    <AddButton classes={classes} />
  </RequireLogin>
);

export default withStyles(styles)(NewCalculatorButton);
