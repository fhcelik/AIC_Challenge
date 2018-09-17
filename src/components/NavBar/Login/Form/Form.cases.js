import { Grid } from '@material-ui/core';
import React from 'react';
import Form from './Form.view';

const mockedProps = {
  open: true,
  isSubmitDisabled: true,
  invalidInputText: '',
  onInputChange: () => {},
  onSubmit: () => {},
};

const FormWrapped = props => (
  <Grid container justify="flex-end">
    <Form {...mockedProps} {...props} />
  </Grid>
);

export default {
  base: () => <FormWrapped />,
  withValidationError: () => (
    <FormWrapped invalidInputText="Email is invalid" />
  ),
  withSubmitEnabled: () => <FormWrapped isSubmitDisabled={false} />,
};
