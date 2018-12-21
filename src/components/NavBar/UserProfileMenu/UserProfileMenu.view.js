import AccountIcon from '@material-ui/icons/AccountBox';
import { Button, ListItem, MenuList, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import DropdownMenu from '../../DropdownMenu';
import { Routes } from '../../App/Routing';

const styles = theme => ({
  accountIcon: {
    fontSize: 36,
    color: theme.palette.text.primary,
    marginRight: 10,
  },
  button: {
    whiteSpace: 'nowrap',
    padding: 8,
    paddingRight: 20,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.link.hover,
    },
  },
  email: {
    textTransform: 'none',
  },
  listItem: {
    minWidth: 170,
    cursor: 'pointer',
    paddingLeft: 15,
    paddingRight: 15,
    '&:hover': {
      backgroundColor: theme.palette.link.hover,
    },
    color: theme.palette.text.primary,
  },
  listItemText: {
    textTransform: 'uppercase',
    ...theme.typography.display3,
  },
});

const UserProfileMenu = ({ classes, email, fullName, onLogout }) => (
  <DropdownMenu
    offset="0"
    placement="bottom-end"
    target={
      <Button className={classes.button}>
        <AccountIcon className={classes.accountIcon} />
        {fullName || <span className={classes.email}>{email}</span>}
      </Button>
    }
  >
    <MenuList disablePadding role="menu">
      <NavLink to={Routes.profile} exact>
        <ListItem color="inherit" button className={classes.listItem}>
          <Typography className={classes.listItemText}>Profile</Typography>
        </ListItem>
      </NavLink>
      <ListItem
        color="inherit"
        button
        className={classes.listItem}
        onClick={onLogout}
      >
        <Typography className={classes.listItemText}>Logout</Typography>
      </ListItem>
    </MenuList>
  </DropdownMenu>
);

UserProfileMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  fullName: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserProfileMenu);
