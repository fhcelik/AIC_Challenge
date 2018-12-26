import { handleActions } from 'redux-actions';
import * as Actions from '../actions/popularCalculators';

export default handleActions(
  {
    [Actions.setPopularCalculators]: (
      popularCalculators,
      { payload: calculatorIds }
    ) => calculatorIds,
  },
  []
);
