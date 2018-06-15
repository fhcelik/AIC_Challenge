import { combineReducers } from 'redux';
import calculators from './calculators';
import collections from './collections';
import units from './units';

export default combineReducers({
  calculators,
  collections,
  units,
});
