import { combineReducers } from 'redux';
import app from './app';
import calculators from './calculators';
import collections from './collections';
import units from './units';

export default combineReducers({
  app,
  calculators,
  collections,
  units,
});
