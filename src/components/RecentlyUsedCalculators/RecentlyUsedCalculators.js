import * as R from 'ramda';
import { branch, compose, pure, renderNothing, withProps } from 'recompose';
import { Grid } from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { fetchRecentlyUsedCalculators } from '../../redux/actions/recentlyUsedCalculators';
import handleFetchEntityEnhancer from '../hoc/handleFetchEntity';
import { recentlyUsedCalculatorsSelector } from '../../redux/selectors/recentlyUsedCalculators';
import CalculatorGrid from '../CalculatorGrid';

const styles = theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    paddingBottom: 30,
    marginBottom: 30,
  },
});

const RecentlyUsedCalculators = ({ classes, ...props }) => (
  <Grid className={classes.root}>
    <CalculatorGrid {...props} />
  </Grid>
);

export default compose(
  withProps({ title: 'recently used calculators' }),
  handleFetchEntityEnhancer({
    entityName: 'calculatorIds',
    entitySelector: recentlyUsedCalculatorsSelector,
    fetchEntityAction: fetchRecentlyUsedCalculators,
  }),
  branch(({ calculatorIds }) => R.isEmpty(calculatorIds), renderNothing),
  withStyles(styles),
  pure
)(RecentlyUsedCalculators);
