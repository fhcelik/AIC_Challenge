import { combineReducers } from 'redux';
import app from './app';
import entities from './entities';
import units from './units';

export default combineReducers({
  app,
  entities,
  units,
});
