import React from 'react';
import { Toolbar, Button, Grid, Typography } from 'material-ui';
import { NavLink } from 'react-router-dom';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Routes from '../routes';
import { withStyles } from 'material-ui';

const styles = theme => ({
  root: {
    backgroundColor: theme.colors.headerBackground,
    border: `1px solid ${theme.colors.cardHeader}`,
    boxShadow: 'none',
    flex: '0 0 auto',
    minHeight: '3em',
  },
  navigation: {
    textTransform: 'uppercase',
    padding: '1em 1em',
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

const getNavigation = (text, route, classes) => (
  <NavLink
    to={route}
    className={classes.navigation}
    activeClassName={classes.activeLink}
    exact={route === Routes.root}
  >
    <Typography variant="display3">{text}</Typography>
  </NavLink>
);
const Header = ({ classes }) => (
  <Toolbar className={classes.root}>
    {getNavigation('Dashboard', Routes.root, classes)}
    {getNavigation('Favourites', Routes.favourites, classes)}
    {getNavigation('Recent', Routes.recent, classes)}
    {getNavigation('My Calculators', Routes.myCalculators, classes)}

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

export default withStyles(styles)(Header);
