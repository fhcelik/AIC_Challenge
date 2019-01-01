import PropTypes from 'prop-types';
import {
  compose,
  pure,
  withContext,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import CalculatorGrid from './CalculatorGrid.view';

export default compose(
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
  pure
)(CalculatorGrid);
