import * as R from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  compose,
  lifecycle,
  pure,
  withContext,
  withHandlers,
  withProps,
  withStateHandlers,
} from 'recompose';
import PropTypes from 'prop-types';
import {
  cancelAddingNewCalculator,
  changeCalculatorArgValue,
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
import { isAuthorizedSelector } from '../../redux/selectors/auth';
import { fetchUnitDefinitions } from '../../redux/actions/units';
import { getCalculatorLink } from '../App/Routing/Routing';
import { noUnitsSelector } from '../../redux/selectors/units';
import updateLayoutOnChange from '../hoc/updateLayoutOnChange';
import CalculatorView from './Calculator.view';

export default compose(
  withRouter,
  withProps(({ id, match: { params } }) => ({
    collectionId: params.id,
    shareLink: getCalculatorLink(id),
  })),
  connect(
    (state, props) => ({
      args: calculatorArgsSelector(state, props),
      authorId: calculatorAuthorSelector(state, props),
      result: calculatorResultSelector(state, props),
      title: calculatorTitleSelector(state, props),
      description: calculatorDescriptionSelector(state, props),
      tags: calculatorTagsSelector(state, props),
      formula: calculatorResultFormulaSelector(state, props),
      isAuthorized: isAuthorizedSelector(state),
      isNew: calculatorIsNewSelector(state, props),
      noUnits: noUnitsSelector(state, props),
    }),
    {
      changeCalculatorArgValue,
      changeCalculatorArgUnit,
      changeCalculatorResultUnit,
      cancelAddingNewCalculator,
      incrementCalculatorUsage,
      fetchUnitDefinitions,
      saveCalculator,
    }
  ),
  withProps(({ noUnits }) => ({
    error: noUnits,
  })),
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
    onArgValueChange: ({ id, changeCalculatorArgValue }) => event => {
      changeCalculatorArgValue({
        id,
        argname: event.target.name,
        value: event.target.value,
      });
    },
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
    componentDidCatch(error) {
      return this.setState({ error });
    },
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
