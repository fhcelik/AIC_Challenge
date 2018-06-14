import { connect } from 'react-redux';
import {
  branch,
  compose,
  lifecycle,
  pure,
  renderComponent,
  withHandlers,
  withProps,
  withStateHandlers,
} from 'recompose';
import {
  changeCalculatorArgUnit,
  changeCalculatorResultUnit,
  saveCalculator,
} from '../../redux/actions/calculators';
import { getUnit } from '../../redux/schemas/units';
import {
  calculatorArgsSelector,
  calculatorDescriptionSelector,
  calculatorIsNewSelector,
  calculatorResultFormulaSelector,
  calculatorResultSelector,
  calculatorTagsSelector,
  calculatorTitleSelector,
} from '../../redux/selectors/calculators';
import ErrorCatch from '../ErrorCatch';
import CalculatorView from './Calculator.view';

export default compose(
  lifecycle({
    componentDidCatch(error, info) {
      this.setState({ brokenId: this.props.id });
      console.log(error.message);
    },
  }),
  branch(
    ({ brokenId, id }) => brokenId === id,
    compose(
      withProps({ message: 'Invalid formula' }),
      renderComponent(ErrorCatch)
    )
  ),
  connect(
    (state, props) => ({
      args: calculatorArgsSelector(state, props),
      result: calculatorResultSelector(state, props),
      title: calculatorTitleSelector(state, props),
      description: calculatorDescriptionSelector(state, props),
      tags: calculatorTagsSelector(state, props),
      formula: calculatorResultFormulaSelector(state, props),
      isNew: calculatorIsNewSelector(state, props),
    }),
    {
      changeCalculatorArgUnit,
      changeCalculatorResultUnit,
      saveCalculator,
    }
  ),
  withStateHandlers(
    ({ isNew }) => ({
      renderDisplay: !isNew,
      renderEditor: isNew,
      renderInfo: false,
    }),
    {
      showDisplay: () => () => ({
        renderDisplay: true,
      }),
      showEditor: () => () => ({
        renderDisplay: false,
        renderEditor: true,
        renderInfo: false,
      }),
      showInfo: () => () => ({
        renderDisplay: false,
        renderEditor: false,
        renderInfo: true,
      }),
    }
  ),
  withHandlers({
    onArgUnitChange: ({ id, changeCalculatorArgUnit }) => event => {
      changeCalculatorArgUnit({
        id,
        argname: event.target.name,
        unit: getUnit(event.target.value),
      });
    },
    onResultUnitChange: ({ id, changeCalculatorResultUnit }) => event => {
      changeCalculatorResultUnit({
        id,
        unit: getUnit(event.target.value),
      });
    },
    onEditDone: ({ id, saveCalculator, showDisplay }) => () => {
      saveCalculator({ id });
      showDisplay();
    },
  }),
  lifecycle({
    componentDidUpdate({ renderDisplay: renderDisplayPrev }) {
      const { onResize, renderDisplay } = this.props;
      if (renderDisplay !== renderDisplayPrev && onResize) {
        onResize();
      }
    },
  }),
  pure
)(CalculatorView);
