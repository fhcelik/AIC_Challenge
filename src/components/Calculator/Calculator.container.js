import * as R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  branch,
  compose,
  lifecycle,
  pure,
  renderComponent,
  withContext,
  withHandlers,
  withProps,
  withStateHandlers,
} from 'recompose';
import PropTypes from 'prop-types';
import {
  cancelAddingNewCalculator,
  changeCalculatorArgUnit,
  changeCalculatorResultUnit,
  incrementCalculatorUsage,
  saveCalculator,
} from '../../redux/actions/calculators';
import { getUnit } from '../../redux/schemas/units';
import {
  calculatorArgsSelector,
  calculatorAuthorSelector,
  calculatorDescriptionSelector,
  calculatorIsNewSelector,
  calculatorResultFormulaSelector,
  calculatorResultSelector,
  calculatorTagsSelector,
  calculatorTitleSelector,
} from '../../redux/selectors/calculators';
import { fetchUnitDefinitions } from '../../redux/actions/units';
import { noUnitsSelector } from '../../redux/selectors/units';
import ErrorCatch from '../ErrorCatch';
import updateLayoutOnChange from '../hoc/updateLayoutOnChange';
import CalculatorView from './Calculator.view';

export default compose(
  withRouter,
  lifecycle({
    componentDidCatch(error, info) {
      this.setState({ brokenId: this.props.id });
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
      authorId: calculatorAuthorSelector(state, props),
      result: calculatorResultSelector(state, props),
      title: calculatorTitleSelector(state, props),
      description: calculatorDescriptionSelector(state, props),
      tags: calculatorTagsSelector(state, props),
      formula: calculatorResultFormulaSelector(state, props),
      isNew: calculatorIsNewSelector(state, props),
      noUnits: noUnitsSelector(state, props),
    }),
    {
      changeCalculatorArgUnit,
      changeCalculatorResultUnit,
      cancelAddingNewCalculator,
      incrementCalculatorUsage,
      fetchUnitDefinitions,
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
  withContext({ onCalculatorEditDone: PropTypes.func }, ({ onEditDone }) => ({
    onCalculatorEditDone: onEditDone,
  })),
  updateLayoutOnChange,
  lifecycle({
    componentDidUpdate({ args: prevArgs, isNew: prevIsNew }) {
      const {
        args,
        id,
        incrementCalculatorUsage,
        isNew,
        showDisplay,
      } = this.props;

      prevIsNew && !isNew && showDisplay();

      if (!R.equals(prevArgs, args) && !isNew) {
        incrementCalculatorUsage(id);
      }
    },
    componentDidMount() {
      const { noUnits, fetchUnitDefinitions } = this.props;
      noUnits && fetchUnitDefinitions();
    },
  }),
  pure
)(CalculatorView);
