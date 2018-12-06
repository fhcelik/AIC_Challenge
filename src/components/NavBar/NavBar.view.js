import * as R from 'ramda';
import cx from 'classnames';
import { AppBar, Toolbar, withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { compose } from 'recompose';
import { Routes } from '../App/Routing';
import SearchBar from '../SearchBar';
import CollectionSelect from './CollectionSelect';
import Login from './Login';
import UserProfileMenu from './UserProfileMenu';
import { logo as Logo } from '../../images';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.navbar.background,
    borderBottom: `1px solid ${theme.palette.card.header}`,
  },
  toolbar: {
    minHeight: '3em',
    padding: '0 6px 0 0',
  },
  navigation: {
    textTransform: 'uppercase',
    padding: '1em',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.link.hover,
    },
  },
  logoWrapper: {
    padding: '0.8em 1em',
  },
  logo: {
    width: '110px !important',
    height: '22px !important',
  },
  activeLink: {
    backgroundColor: theme.palette.link.active,
  },
  'activeLink:active': {
    textDecoration: 'none',
  },
  profile: {
    width: '180px',
  },
  profilePicture: {
    fontSize: '36px',
    color: 'white',
  },
});

const NavBar = ({ classes, isAuthorized, location }) => (
  <AppBar position="fixed" className={classes.root}>
    <Toolbar className={classes.toolbar}>
      <NavLink
        to={Routes.root}
        className={cx(classes.navigation, classes.logoWrapper)}
        exact
      >
        <Logo className={classes.logo} />
      </NavLink>
      <CollectionSelect
        className={cx(classes.navigation, {
          [classes.activeLink]: R.contains(
            Routes.collections,
            location.pathname
          ),
        })}
      />
      <SearchBar />
      {isAuthorized ? <UserProfileMenu /> : <Login />}
    </Toolbar>
  </AppBar>
);

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

export default compose(withRouter, withStyles(styles))(NavBar);
