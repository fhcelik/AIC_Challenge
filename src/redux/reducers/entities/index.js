import * as R from 'ramda';
import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as Actions from '../../actions/entities';
import calculators from './calculators';

const subReducers = combineReducers({
  calculators,
  collections: handleActions({}, {}),
});

const entityReducer = handleActions(
  {
    [Actions.saveEntities]: (entities, { payload }) =>
      R.mergeWith(R.merge, entities, payload),
  },
  {}
);

export default reduceReducers(entityReducer, subReducers);
