import { connect } from 'react-redux';
import { compose, pure } from 'recompose';
import { Grid } from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CalculatorGrid from '../CalculatorGrid';
import CalculatorsByAuthor from '../CalculatorsByAuthor';
import { loggedInUserIdSelector } from '../../redux/selectors/auth';
import PopularCalculators from '../PopularCalculators';
import RecentlyUsedCalculators from '../RecentlyUsedCalculators';

const styles = theme => ({
  divider: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    paddingBottom: 30,
    marginBottom: 30,
  },
});

const Dashboard = ({ classes, ...props }) =>
  props.id ? (
    <Grid>
      <RecentlyUsedCalculators />
      <CalculatorsByAuthor {...props} />
    </Grid>
  ) : (
    <Grid>
      <PopularCalculators {...props} />
      <Grid className={classes.divider} />
      <CalculatorGrid
        calculatorIds={[]}
        title="my calculators"
        showAddCalculatorButton
      />
    </Grid>
  );

export default compose(
  connect(state => ({ id: loggedInUserIdSelector(state) })),
  withStyles(styles),
  pure
)(Dashboard);
