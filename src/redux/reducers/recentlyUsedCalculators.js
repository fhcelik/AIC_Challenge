import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as Actions from '../actions/recentlyUsedCalculators';

const COUNT_OF_RECENTLY_USED_CALCULATORS = 5;

export default handleActions(
  {
    [Actions.setRecentlyUsedCalculators]: (
      recentlyUsedCalculators,
      { payload: calculatorIds }
    ) => calculatorIds,
    [Actions.addRecentlyUsedCalculator]: (
      recentlyUsedCalculators,
      { payload: calculatorId }
    ) =>
      R.pipe(
        R.prepend(calculatorId),
        R.uniq,
        R.take(COUNT_OF_RECENTLY_USED_CALCULATORS)
      )(recentlyUsedCalculators),
  },
  []
);
