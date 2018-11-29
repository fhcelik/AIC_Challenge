import { Typography } from 'material-ui';
import React from 'react';
import { Route, Switch } from 'react-router';
import Collection from '../../Collection';
import SearchResults from '../../SearchResults';
import NotFound from '../../NotFound';

export const Routes = {
  root: '/',
  collection: '/collection/',
  search: '/search',
  profile: '/profile',
};

const Routing = () => (
  <Switch>
    <Route
      exact
      path={Routes.root}
      render={() => <Typography variant="display4">The Dashboard</Typography>}
    />
    <Route
      path={Routes.collection + ':id'}
      component={({ match }) => <Collection id={match.params.id} />}
    />
    <Route path={Routes.search} component={SearchResults} />
    <Route component={NotFound} />
  </Switch>
);

export default Routing;
