import * as R from 'ramda';
import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as Actions from '../../actions/entities';
import calculators from './calculators';
import collections from './collections';
import users from './users';

const subReducers = combineReducers({
  calculators,
  collections,
  users,
});

const entityReducer = handleActions(
  {
    [Actions.saveEntities]: (entities, { payload }) =>
      R.mergeDeepRight(entities, payload),
  },
  {}
);

export default reduceReducers(entityReducer, subReducers);
