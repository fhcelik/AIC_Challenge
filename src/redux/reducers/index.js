import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import calculatorsByAuthor from './calculatorsByAuthor';
import entities from './entities';
import notifications from './notifications';
import popularCalculators from './popularCalculators';
import recentlyUsedCalculators from './recentlyUsedCalculators';
import units from './units';

export default combineReducers({
  app,
  auth,
  calculatorsByAuthor,
  entities,
  notifications,
  popularCalculators,
  recentlyUsedCalculators,
  units,
});
