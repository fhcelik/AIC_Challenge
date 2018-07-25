import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import { addCalculator } from '../../redux/actions/calculators';
import NewCalculatorButton from './NewCalculatorButton.view';

const enhance = compose(
  withRouter,
  connect(null, { addCalculator }),
  withHandlers({
    onClick: ({ addCalculator, match: { params } }) => () =>
      addCalculator({ collectionId: params.id }),
  })
);

export default enhance(NewCalculatorButton);
