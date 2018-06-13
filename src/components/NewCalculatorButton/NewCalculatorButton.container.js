import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { addCalculator } from '../../redux/actions/calculators';
import NewCalculatorButton from './NewCalculatorButton.view';

const enhance = compose(
  connect(null, { addCalculator }),
  withHandlers({
    onClick: ({ addCalculator }) => () => addCalculator({ isNew: true }),
  })
);

export default enhance(NewCalculatorButton);
