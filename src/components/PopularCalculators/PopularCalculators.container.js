import { compose, pure, withProps } from 'recompose';
import { fetchPopularCalculators } from '../../redux/actions/popularCalculators';
import handleFetchEntityEnhancer from '../hoc/handleFetchEntity';
import { popularCalculatorsSelector } from '../../redux/selectors/popularCalculators';
import CalculatorGrid from '../CalculatorGrid';

export default compose(
  withProps({ title: 'popular calculators' }),
  handleFetchEntityEnhancer({
    entityName: 'calculatorIds',
    entitySelector: popularCalculatorsSelector,
    fetchEntityAction: fetchPopularCalculators,
  }),
  pure
)(CalculatorGrid);
