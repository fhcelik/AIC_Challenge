import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '../TextField';

const styles = theme => ({
  title: {
    textTransform: 'uppercase',
    ...theme.typography.display4,
  },
  fields: {
    marginTop: 20,
    width: 500,
  },
  submitButton: {
    marginTop: 30,
    textTransform: 'uppercase',
    border: `1px solid ${theme.palette.text.primary}`,
    padding: 0,
    width: 120,
  },
  submitLabel: {
    fontSize: 13,
  },
  submitDisabled: {
    opacity: '0.2',
  },
  loading: {
    position: 'absolute',
    right: 10,
  },
});

const Profile = ({
  classes,
  company,
  email,
  fullName,
  isLoading,
  isSubmitDisabled,
  onChangeCompany,
  onChangeFullName,
  onChangeRole,
  onSubmit,
  role,
}) => (
  <div className={classes.root}>
    <Typography className={classes.title}>YOUR PROFILE</Typography>
    <Grid container direction="column" className={classes.fields}>
      <TextField label="Email" value={email} disabled />
      <TextField
        label="Full Name"
        value={fullName}
        onChange={onChangeFullName}
      />
      <TextField label="Role" value={role} onChange={onChangeRole} />
      <TextField label="Company" value={company} onChange={onChangeCompany} />
      <Button
        disabled={isSubmitDisabled}
        type="submit"
        classes={{
          root: classes.submitButton,
          label: classes.submitLabel,
          disabled: classes.submitDisabled,
        }}
        onClick={onSubmit}
      >
        Save
        {isLoading && (
          <CircularProgress
            size={20}
            className={classes.loading}
            color="inherit"
          />
        )}
      </Button>
    </Grid>
  </div>
);

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.string,
  email: PropTypes.string.isRequired,
  fullName: PropTypes.string,
  isLoading: PropTypes.bool,
  isSubmitDisabled: PropTypes.bool,
  onChangeCompany: PropTypes.func.isRequired,
  onChangeFullName: PropTypes.func.isRequired,
  onChangeRole: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  role: PropTypes.string,
};

export default withStyles(styles)(Profile);
