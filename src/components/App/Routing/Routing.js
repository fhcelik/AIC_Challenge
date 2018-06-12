import React from 'react';
import { Typography } from 'material-ui';
import { Route, Switch } from 'react-router';
import Routes from '../../../routes';
import Collection from '../../Collection';

const Mock404 = () => <Typography variant="display4">Not Found</Typography>;

const Routing = () => (
  <Switch>
    <Route
      exact
      path={Routes.root}
      render={() => <Typography variant="display4">The Dashboard</Typography>}
    />
    <Route path={Routes.collection} render={() => <Collection />} />
    <Route component={Mock404} />
  </Switch>
);

export default Routing;
