import cx from 'classnames';
import { AppBar, Toolbar, Typography, withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { compose } from 'recompose';
import { Routes } from '../App/Routing';
import SearchBar from '../SearchBar';
import CollectionSelect from './CollectionSelect';
import Login from './Login';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.navbar.background,
    borderBottom: `1px solid ${theme.palette.card.header}`,
  },
  toolbar: {
    minHeight: '3em',
  },
  navigation: {
    textTransform: 'uppercase',
    padding: '1em',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.link.hover,
    },
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

const NavBar = ({ classes, location }) => (
  <AppBar position="static" className={classes.root}>
    <Toolbar className={classes.toolbar}>
      <NavLink
        to={Routes.root}
        className={classes.navigation}
        activeClassName={classes.activeLink}
        exact
      >
        <Typography variant="display3">Dashboard</Typography>
      </NavLink>
      <CollectionSelect
        className={cx(classes.navigation, {
          [classes.activeLink]: location.pathname.includes(Routes.collection),
        })}
      />
      <SearchBar />
      <Login />
    </Toolbar>
  </AppBar>
);

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default compose(withRouter, withStyles(styles))(NavBar);
