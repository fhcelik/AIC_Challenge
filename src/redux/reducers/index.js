import { combineReducers } from 'redux';
import formulas from './formulas';
import calculators from './calculators';

export default combineReducers({
  formulas,
  calculators,
});