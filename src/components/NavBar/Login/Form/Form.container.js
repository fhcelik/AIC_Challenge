import * as R from 'ramda';
import {
  compose,
  defaultProps,
  lifecycle,
  withHandlers,
  withProps,
  withState,
} from 'recompose';
import { connect } from 'react-redux';
import Form from './Form.view';
import { login } from '../../../../redux/actions/auth';

const getInputValueOnFormSubmit = (inputName, e) =>
  R.pathOr(null, ['target', inputName, 'value'], e);

export default compose(
  connect(null, { login }),
  defaultProps({
    open: false,
    handleClose: () => {},
  }),
  withState('isInvalidInput', 'setIsInvalidInput', false),
  withState('isSubmitDisabled', 'setIsSubmitDisabled', true),
  withHandlers({
    onSubmit: ({ login, handleClose, openDialog, setIsInvalidInput }) => e => {
      e.preventDefault();
      if (!e.target.checkValidity()) {
        setIsInvalidInput(true);
        return;
      }
      handleClose();
      login(getInputValueOnFormSubmit('email', e)).then(() => {
        openDialog();
      });
    },
    onInputChange: ({ setIsInvalidInput, setIsSubmitDisabled }) => e => {
      if (!e.target.value) {
        setIsSubmitDisabled(true);
        return;
      }
      setIsSubmitDisabled(false);
      setIsInvalidInput(false);
    },
  }),
  lifecycle({
    componentDidUpdate({ open: prevOpen }) {
      const { open, setIsInvalidInput, setIsSubmitDisabled } = this.props;
      if (prevOpen !== open) {
        setIsSubmitDisabled(true);
        setIsInvalidInput(false);
      }
    },
  }),
  withProps(({ isInvalidInput }) => ({
    invalidInputText: isInvalidInput ? 'Email is invalid' : '',
  }))
)(Form);
