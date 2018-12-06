import AccountIcon from 'material-ui-icons/AccountBox';
import cx from 'classnames';
import { Button, Grid, TextField, Typography, withStyles } from 'material-ui';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { Routes } from '../../App/Routing';

const styles = theme => ({
  root: {
    minWidth: 200,
    maxWidth: 300,
    minHeight: 38,
  },
  header: {
    textTransform: 'uppercase',
    borderBottom: `1px solid ${theme.palette.card.header}`,
    padding: '7px 15px 12px 15px',
  },
  name: {
    maxWidth: 220,
  },
  icon: {
    fontSize: 30,
    color: theme.palette.text.primary,
    marginRight: 10,
  },
  field: {
    marginLeft: 15,
    textTransform: 'uppercase',
  },
  fieldValue: {
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  noName: {
    color: theme.palette.text.faded,
  },
  navLink: {
    textDecoration: 'none',
  },
  button: {
    marginTop: 7,
    border: `1px solid ${theme.palette.text.primary}`,
    padding: '0 15px',
  },
  buttonLabel: {
    ...theme.typography.display2,
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
});

const AuthorPopupInfo = ({ classes, fullName, id, role, company }) => (
  <Grid className={classes.root}>
    <Grid className={classes.header}>
      <Grid container alignItems="center">
        <AccountIcon className={classes.icon} />
        <Typography
          className={cx(classes.name, { [classes.noName]: !fullName })}
        >
          {fullName || 'No name...'}
        </Typography>
      </Grid>
      <NavLink
        to={`${Routes.users}${id}/calculators`}
        exact
        className={classes.navLink}
      >
        <Button classes={{ root: classes.button, label: classes.buttonLabel }}>
          Show calculators by user
        </Button>
      </NavLink>
    </Grid>
    {role && (
      <TextField
        autoComplete="off"
        label="ROLE"
        value={role}
        disabled
        type="text"
        multiline
        className={classes.field}
        inputProps={{ className: classes.fieldValue }}
      />
    )}
    {company && (
      <TextField
        autoComplete="off"
        label="COMPANY"
        value={company}
        disabled
        type="text"
        multiline
        className={classes.field}
        inputProps={{ className: classes.fieldValue }}
      />
    )}
  </Grid>
);

AuthorPopupInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  fullName: PropTypes.string,
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  company: PropTypes.string,
};

export default withStyles(styles)(AuthorPopupInfo);
