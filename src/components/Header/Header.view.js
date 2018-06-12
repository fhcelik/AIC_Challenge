import cx from 'classnames';
import { Button, Grid, Toolbar, Typography, withStyles } from 'material-ui';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import Routes from '../../routes';
import CollectionSelect from './CollectionSelect';

const styles = theme => ({
  root: {
    backgroundColor: theme.colors.headerBackground,
    border: `1px solid ${theme.colors.cardHeader}`,
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
  search: {
    flex: 1,
    textAlign: 'left',
    color: theme.colors.fadedText,
    alignItems: 'center',
  },
  searchIcon: {
    paddingTop: '0.2em',
  },
  searchText: {
    display: 'inline',
    position: 'absolute',
    top: '0.9em',
    textTransform: 'uppercase',
  },
  activeLink: {
    backgroundColor: theme.colors.cardHeader,
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
    <Grid className={classes.search}>
      <MoreVertIcon className={classes.searchIcon} />
      <Typography
        variant="display3"
        color="inherit"
        classes={{
          root: classes.searchText,
        }}
      >
        Search for Calculators...
      </Typography>
    </Grid>
    <Button color="inherit">John Wicked</Button>
  </Toolbar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(Header));
