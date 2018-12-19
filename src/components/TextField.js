import React from 'react';
import cx from 'classnames';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    overflowX: 'hidden',
    '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input': {
      '-moz-appearance': 'textfield',
    },
    border: `2px solid ${theme.palette.card.header}`,
    padding: 10,
  },
  inputLabel: {
    padding: 7,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
});

export default withStyles(styles, { withTheme: true })(
  ({ classes, className, InputLabelProps = {}, theme, ...props }) => (
    <TextField
      className={cx(classes.root, className)}
      InputLabelProps={{
        ...InputLabelProps,
        className: cx(classes.inputLabel, InputLabelProps.className),
      }}
      {...theme.props.MuiFormControl}
      {...props}
    />
  )
);
