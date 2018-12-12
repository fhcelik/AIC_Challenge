import AddIcon from '@material-ui/icons/AddCircleOutline';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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

const NewCalculatorButton = ({ classes, onClick }) => (
  <Button className={classes.root} onClick={onClick}>
    <AddIcon className={classes.icon} />
  </Button>
);

NewCalculatorButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewCalculatorButton);
