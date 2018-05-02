import { combineReducers } from 'redux';
import calculators from './calculators';
import units from './units';

export default combineReducers({
  calculators,
  units,
});
