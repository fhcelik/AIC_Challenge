import { combineReducers } from 'redux';
import app from './app';
import entities from './entities';
import units from './units';
import notifications from './notifications';

export default combineReducers({
  app,
  entities,
  notifications,
  units,
});
