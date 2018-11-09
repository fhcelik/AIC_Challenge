import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import entities from './entities';
import units from './units';
import notifications from './notifications';

export default combineReducers({
  app,
  auth,
  entities,
  notifications,
  units,
});
