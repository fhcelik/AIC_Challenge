import PropTypes from 'prop-types';
import {
  compose,
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
  }))
)(CalculatorGrid);
