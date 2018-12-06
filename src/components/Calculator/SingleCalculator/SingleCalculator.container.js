import { fetchCalculator } from '../../../redux/actions/calculators';
import { calculatorSelector } from '../../../redux/selectors/calculators';
import handleFetchEntity from '../../hoc/handleFetchEntity';
import SingleCalculatorView from './SingleCalculator.view';

export default handleFetchEntity({
  entityName: 'calculator',
  entitySelector: calculatorSelector,
  fetchEntityAction: fetchCalculator,
})(SingleCalculatorView);
