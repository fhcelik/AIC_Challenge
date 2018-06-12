import AddIcon from 'material-ui-icons/AddCircleOutline';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { addCalculator } from '../redux/actions/calculators';

const styles = theme => ({
  root: {
    width: '23em',
    height: '12em',
    backgroundColor: theme.palette.card.background,
    margin: '.5em 0',
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

const enhance = compose(
  connect(null, { addCalculator }),
  withHandlers({
    onClick: ({ addCalculator }) => () => addCalculator({ isNew: true }),
  }),
  withStyles(styles)
);

export default enhance(NewCalculatorButton);
