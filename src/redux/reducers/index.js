import { combineReducers } from 'redux';
import formulas from './formulas';
import calculators from './calculators';
import units from './units';

export default combineReducers({
  formulas,
  calculators,
  units
});
