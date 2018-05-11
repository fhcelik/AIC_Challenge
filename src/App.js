import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Typography } from 'material-ui';
import Header from './components/Header';
import { Route, Switch } from 'react-router';
import Routes from './routes';
import Collection from './components/Collection';

const styles = theme => ({
  '@global a, a:active, a:visited': {
    textDecoration: 'none',
  },
  root: {
    background: theme.colors.backgroundGradient,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});

const Mock404 = () => <Typography variant="display4">Not Found</Typography>;

const App = ({ classes }) => (
  <div className={classes.root}>
    <Header />
    <Switch>
      <Route
        exact
        path={Routes.root}
        render={() => <Typography variant="display4">The Dashboard</Typography>}
      />
      <Route
        path={Routes.favourites}
        render={() => <Typography variant="display4">Favourites</Typography>}
      />
      <Route path={Routes.recent} component={Collection} />
      <Route path={Routes.myCalculators} component={Collection} />
      <Route component={Mock404} />
    </Switch>
  </div>
);

export default withStyles(styles)(App);
