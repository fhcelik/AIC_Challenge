import cx from 'classnames';
import { Button, Toolbar, Typography, withStyles } from 'material-ui';
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
    height: '3em',
  },
  activeLink: {
    backgroundColor: theme.palette.card.header,
  },
  'activeLink:active': {
    textDecoration: 'none',
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
    <Button color="inherit">John Wicked</Button>
  </Toolbar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default compose(withRouter, withStyles(styles))(Header);
