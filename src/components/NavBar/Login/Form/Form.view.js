import AccountIcon from 'material-ui-icons/AccountCircle';
import {
  Button,
  Grid,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const emailPattern =
  '[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{1,}([.]{1}[a-zA-Z]{1,}|[.]{1}[a-zA-Z]{1,}[.]{1}[a-zA-Z]{1,})';

const styles = theme => ({
  '@global input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:invalid': {
    '-webkit-text-fill-color': theme.palette.text.primary,
    '-webkit-box-shadow': `0 0 0px 1000px ${
      theme.palette.navbar.background
    } inset`,
  },
  root: {
    padding: 20,
    width: 320,
  },
  accountIcon: {
    width: 36,
    height: 36,
    color: theme.palette.text.primary,
  },
  form: {
    width: '100%',
  },
  formControl: {
    width: '100%',
    height: 100,
  },
  input: {
    marginTop: 20,
    border: `1px solid ${theme.palette.card.header}`,
    paddingTop: 5,
    paddingLeft: 10,
    height: 55,
  },
  inputLabel: {
    textTransform: 'uppercase',
    paddingLeft: 10,
  },
  invalidInput: {
    color: theme.palette.notification.error.background,
  },
  submitButton: {
    marginTop: 10,
    textTransform: 'uppercase',
    width: '30%',
    border: `1px solid ${theme.palette.text.primary}`,
    padding: 0,
  },
  submitLabel: {
    fontSize: 13,
  },
  submitDisabled: {
    opacity: '0.2',
  },
});

const Form = ({
  classes,
  invalidInputText,
  isSubmitDisabled,
  onInputChange,
  onSubmit,
  open,
}) => (
  <Grid
    container
    direction="column"
    alignItems="center"
    className={classes.root}
  >
    <AccountIcon className={classes.accountIcon} />
    <form onSubmit={onSubmit} className={classes.form} noValidate>
      <Grid container direction="column" alignItems="center">
        <Grid className={classes.formControl}>
          {open && (
            <TextField
              onChange={onInputChange}
              className={classes.input}
              name="email"
              label="Email"
              type="email"
              inputProps={{ pattern: emailPattern }}
              fullWidth
              InputLabelProps={{ className: classes.inputLabel }}
            />
          )}
          <Typography className={classes.invalidInput}>
            {invalidInputText}
          </Typography>
        </Grid>
        <Button
          disabled={isSubmitDisabled}
          type="submit"
          classes={{
            root: classes.submitButton,
            label: classes.submitLabel,
            disabled: classes.submitDisabled,
          }}
        >
          Login
        </Button>
      </Grid>
    </form>
  </Grid>
);

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  invalidInputText: PropTypes.string.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Form);
