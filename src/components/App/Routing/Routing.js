import { Typography } from 'material-ui';
import React from 'react';
import { Route, Switch } from 'react-router';
import Collection from '../../Collection';
import SearchResults from '../../SearchResults';

export const Routes = {
  root: '/',
  collection: '/collection/',
  search: '/search',
  profile: '/profile',
};

const Mock404 = () => <Typography variant="display4">Not Found</Typography>;

const Routing = () => (
  <Switch>
    <Route
      exact
      path={Routes.root}
      render={() => <Typography variant="display4">The Dashboard</Typography>}
    />
    <Route
      path={Routes.collection + ':id'}
      render={({ match }) => <Collection id={match.params.id} />}
    />
    <Route path={Routes.search} component={SearchResults} />
    <Route component={Mock404} />
  </Switch>
);

export default Routing;
