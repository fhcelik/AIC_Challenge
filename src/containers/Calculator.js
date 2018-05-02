import { connect } from 'react-redux';
import {
  branch,
  compose,
  lifecycle,
  pure,
  renderComponent,
  withHandlers,
  withProps,
} from 'recompose';
import Calculator from '../components/Calculator';
import ErrorCatch from '../components/ErrorCatch';
import {
  addCalculatorArgReference,
  changeCalculatorArg,
  changeCalculatorResult,
  removeCalculatorArgReference,
} from '../redux/actions/calculators';
import { calculatorPropsSelector } from '../redux/selectors/calculators';

export const ENTER_VALUE = 'Enter value';

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
  connect(calculatorPropsSelector, {
    addCalculatorArgReference,
    changeCalculatorArg,
    changeCalculatorResult,
    removeCalculatorArgReference,
  }),
  withHandlers({
    onArgValueChange: ({ id, changeCalculatorArg }) => event => {
      changeCalculatorArg({
        id,
        argvals: { [event.target.name]: { value: Number(event.target.value) } },
      });
    },
    onArgUnitChange: ({ id, changeCalculatorArg }) => event => {
      changeCalculatorArg({
        id,
        argvals: { [event.target.name]: { unit: event.target.value } },
      });
    },
    onResultUnitChange: ({ id, changeCalculatorResult }) => event => {
      changeCalculatorResult({
        id,
        result: { unit: event.target.value },
      });
    },
    setArgToFormula: ({
      id,
      addCalculatorArgReference,
      removeCalculatorArgReference,
    }) => argname => event => {
      if (id.length === event.target.value.length) {
        addCalculatorArgReference({
          id,
          argname,
          formulaId: event.target.value,
        });
      } else if (ENTER_VALUE === event.target.value) {
        removeCalculatorArgReference({ id, argname });
      }
    },
  }),
  pure
)(Calculator);
