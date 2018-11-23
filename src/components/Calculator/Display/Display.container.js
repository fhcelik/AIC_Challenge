import { connect } from 'react-redux';
import { compose, withHandlers, withProps } from 'recompose';
import {
  addCalculatorArgReference,
  changeCalculatorArgValue,
  removeCalculatorArgReference,
} from '../../../redux/actions/calculators';
import { isAuthorizedSelector } from '../../../redux/selectors/auth';
import Display from './Display.view';
import { getCalculatorLink } from '../../App/Routing/Routing';

export const ENTER_VALUE = 'Enter value';

export default compose(
  connect(
    state => ({
      isAuthorized: isAuthorizedSelector(state),
    }),
    {
      addCalculatorArgReference,
      changeCalculatorArgValue,
      removeCalculatorArgReference,
    }
  ),
  withProps(({ id }) => ({
    shareLink: getCalculatorLink(id),
  })),
  withHandlers({
    onArgValueChange: ({ id, changeCalculatorArgValue }) => event => {
      changeCalculatorArgValue({
        id,
        argname: event.target.name,
        value: event.target.value,
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
