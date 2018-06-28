import cx from 'classnames';
import { Toolbar, Typography, withStyles } from 'material-ui';
import Account from 'material-ui-icons/AccountBox';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { compose } from 'recompose';
import { Routes } from '../App/Routing';
import SearchBar from '../SearchBar';
import CollectionSelect from './CollectionSelect';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.header.background,
    border: `1px solid ${theme.palette.card.header}`,
    boxShadow: 'none',
    flex: '0 0 auto',
    minHeight: '3em',
    zIndex: 100,
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

const Header = ({ classes, location }) => (
  <Toolbar className={classes.root}>
    <NavLink
      to={Routes.root}
      className={classes.navigation}
      activeClassName={classes.activeLink}
      exact={true}
    >
      <Typography variant="display3">Dashboard</Typography>
    </NavLink>
    <CollectionSelect
      className={cx(classes.navigation, {
        [classes.activeLink]: location.pathname.includes(Routes.collection),
      })}
    />
    <SearchBar />
    <Account className={classes.profilePicture} />
    <Typography
      noWrap
      className={cx(classes.navigation, classes.profile)}
      variant="display3"
    >
      John Wicked
    </Typography>
  </Toolbar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default compose(withRouter, withStyles(styles))(Header);
