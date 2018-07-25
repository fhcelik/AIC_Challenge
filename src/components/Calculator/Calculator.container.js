import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
  cancelAddingNewCalculator,
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
import updateLayoutOnChangeEnhancer from '../updateLayoutOnChange.enhancer';
import CalculatorView from './Calculator.view';

export default compose(
  withRouter,
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
  withProps(({ match: { params } }) => ({ collectionId: params.id })),
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
      cancelAddingNewCalculator,
      saveCalculator,
    }
  ),
  withStateHandlers(
    ({ isNew }) => ({
      renderDisplay: !isNew,
      renderEditor: isNew,
      renderInfo: false,
      isSaving: false,
    }),
    {
      showDisplay: () => () => ({
        renderDisplay: true,
        isSaving: false,
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
      setIsSaving: () => value => ({
        isSaving: value,
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
    onEditDone: ({ id, saveCalculator, setIsSaving, collectionId }) => () => {
      setIsSaving(true);
      saveCalculator({ collectionId, calculatorId: id })
        .then(() => setIsSaving(false))
        .catch(() => setIsSaving(false));
    },
    onCancel: ({ cancelAddingNewCalculator, id, collectionId }) => () =>
      cancelAddingNewCalculator({ collectionId, calculatorId: id }),
  }),
  updateLayoutOnChangeEnhancer,
  lifecycle({
    componentDidUpdate({ isNew: prevIsNew }) {
      const { isNew, showDisplay } = this.props;
      prevIsNew && !isNew && showDisplay();
    },
  }),
  pure
)(CalculatorView);
