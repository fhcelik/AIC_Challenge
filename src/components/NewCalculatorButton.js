import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/AddCircleOutline';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    width: '23em',
    height: '12em',
    backgroundColor: theme.colors.cardBackground,
    margin: '.5em 0',
    border: `1.5px dashed ${theme.colors.cardHeader}`
  },
  icon: {
    color: theme.colors.text,
    fontSize: '84px'
  }
});

const NewCalculatorButton = ({
  classes
}) => (
  <Button className={classes.root}>
    <AddIcon className={classes.icon} />
  </Button>
);

NewCalculatorButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewCalculatorButton);
