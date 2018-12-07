import React from 'react';
import { Route, Switch } from 'react-router';
import CalculatorsByAuthor from '../../CalculatorsByAuthor';
import Collection from '../../Collection';
import Dashboard from '../../Dashboard';
import { Error404 } from '../../ErrorPage';
import SearchResults from '../../SearchResults';
import SingleCalculator from '../../Calculator/SingleCalculator';

export const Routes = {
  root: '/',
  calculators: '/calculators/',
  collections: '/collections/',
  profile: '/profile',
  search: '/search',
  users: '/users/',
};

const Routing = () => (
  <Switch>
    <Route exact path={Routes.root} component={Dashboard} />
    <Route
      path={`${Routes.users}:id/calculators`}
      render={({ match }) => <CalculatorsByAuthor id={match.params.id} />}
    />
    <Route
      path={`${Routes.calculators}:id`}
      render={({ match }) => <SingleCalculator id={match.params.id} />}
    />
    <Route
      path={`${Routes.collections}:id`}
      component={({ match }) => <Collection id={match.params.id} />}
    />
    <Route path={Routes.search} component={SearchResults} />
    <Route component={Error404} />
  </Switch>
);

export default Routing;
