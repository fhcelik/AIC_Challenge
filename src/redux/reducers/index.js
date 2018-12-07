import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import calculatorsByAuthor from './calculatorsByAuthor';
import entities from './entities';
import units from './units';
import notifications from './notifications';

export default combineReducers({
  app,
  auth,
  calculatorsByAuthor,
  entities,
  notifications,
  units,
});
