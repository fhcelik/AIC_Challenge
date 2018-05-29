import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import {
  addCalculatorArgReference,
  changeCalculatorArgValue,
  removeCalculatorArgReference,
} from '../../../redux/actions/calculators';
import Display from './Display.view';

export const ENTER_VALUE = 'Enter value';

export default compose(
  connect(null, {
    addCalculatorArgReference,
    changeCalculatorArgValue,
    removeCalculatorArgReference,
  }),
  withHandlers({
    onArgValueChange: ({ id, changeCalculatorArgValue }) => event => {
      changeCalculatorArgValue({
        id,
        argname: event.target.name,
        value: Number(event.target.value),
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
  })
)(Display);
