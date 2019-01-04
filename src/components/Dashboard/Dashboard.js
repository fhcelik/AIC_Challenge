import { connect } from 'react-redux';
import { branch, compose, pure, renderComponent } from 'recompose';
import { Grid } from '@material-ui/core';
import React from 'react';
import { loggedInUserIdSelector } from '../../redux/selectors/auth';
import CalculatorsByAuthor from '../CalculatorsByAuthor';
import PopularCalculators from '../PopularCalculators';
import RecentlyUsedCalculators from '../RecentlyUsedCalculators';

const Dashboard = props => (
  <Grid>
    <RecentlyUsedCalculators />
    <CalculatorsByAuthor {...props} />
  </Grid>
);

export default compose(
  connect(state => ({
    id: loggedInUserIdSelector(state),
  })),
  branch(({ id }) => !id, renderComponent(PopularCalculators)),
  pure
)(Dashboard);
