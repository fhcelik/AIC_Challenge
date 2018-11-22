import AccountIcon from 'material-ui-icons/AccountBox';
import {
  Button,
  ListItem,
  MenuList,
  Typography,
  withStyles,
} from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import DropdownMenu from '../../utils/DropdownMenu';
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
  },
});

const UserProfileMenu = ({ classes, fullName, onLogout }) => (
  <DropdownMenu
    offset="0"
    placement="bottom-end"
    target={
      <Button className={classes.button}>
        <AccountIcon className={classes.accountIcon} />
        {fullName}
      </Button>
    }
  >
    <MenuList disablePadding role="menu">
      <NavLink to={Routes.profile} exact>
        <ListItem color="inherit" button className={classes.listItem}>
          <Typography variant="display3" className={classes.listItemText}>
            Profile
          </Typography>
        </ListItem>
      </NavLink>
      <ListItem
        color="inherit"
        button
        className={classes.listItem}
        onClick={onLogout}
      >
        <Typography variant="display3" className={classes.listItemText}>
          Logout
        </Typography>
      </ListItem>
    </MenuList>
  </DropdownMenu>
);

UserProfileMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  fullName: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserProfileMenu);
