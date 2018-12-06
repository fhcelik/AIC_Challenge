import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  compose,
  lifecycle,
  pure,
  withContext,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { fetchUsages } from '../../redux/actions/usages';
import CalculatorGrid from './CalculatorGrid.view';

export default compose(
  connect(null, { fetchUsages }),
  withStateHandlers(
    { domNode: undefined },
    { setDomNode: () => domNode => ({ domNode }) }
  ),
  withHandlers(() => ({
    updateLayout: ({ domNode }) => () => domNode.updateLayout(),
  })),
  withContext({ onResize: PropTypes.func }, ({ updateLayout }) => ({
    onResize: updateLayout,
  })),
  lifecycle({
    componentDidMount() {
      const { calculatorIds, fetchUsages } = this.props;
      if (R.length(calculatorIds)) fetchUsages(calculatorIds);
    },
  }),
  pure
)(CalculatorGrid);
