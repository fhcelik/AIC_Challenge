import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import {
  addCalculatorArg,
  addCalculatorTag,
  changeCalculatorArgAlias,
  changeCalculatorDescription,
  changeCalculatorResultFormula,
  changeCalculatorTitle,
  removeCalculatorArg,
  removeCalculatorTag,
} from '../../../redux/actions/calculators';
import {
  calculatorResultUnitSelector,
  newCalculatorArgNameSelector,
} from '../../../redux/selectors/calculators';
import Editor from './Editor.view';

export default compose(
  connect(
    (state, props) => ({
      newArgName: newCalculatorArgNameSelector(state, props),
      resultBaseUnit: calculatorResultUnitSelector(state, props),
    }),
    {
      addCalculatorArg,
      addCalculatorTag,
      changeCalculatorArgAlias,
      changeCalculatorDescription,
      changeCalculatorResultFormula,
      changeCalculatorTitle,
      removeCalculatorArg,
      removeCalculatorTag,
    }
  ),
  withHandlers({
    onTitleChange: ({ id, changeCalculatorTitle }) => event => {
      changeCalculatorTitle({ id, title: event.target.value });
    },
    onDescriptionChange: ({ id, changeCalculatorDescription }) => event => {
      changeCalculatorDescription({ id, description: event.target.value });
    },
    onTagAdd: ({ id, addCalculatorTag }) => tag => {
      addCalculatorTag({ id, tag });
    },
    onTagDelete: ({ id, removeCalculatorTag }) => tag => {
      removeCalculatorTag({ id, tag });
    },
    onArgAdd: ({ id, addCalculatorArg, newArgName }) => () => {
      addCalculatorArg({ id, argname: newArgName });
    },
    onArgAliasChange: ({ id, changeCalculatorArgAlias }) => event => {
      changeCalculatorArgAlias({
        id,
        argname: event.target.name,
        alias: event.target.value,
      });
    },
    onArgRemove: ({ id, removeCalculatorArg }) => argname => () => {
      removeCalculatorArg({ id, argname });
    },
    onResultFormulaChange: ({ id, changeCalculatorResultFormula }) => event => {
      changeCalculatorResultFormula({
        id,
        execFormula: event.target.value,
      });
    },
  })
)(Editor);
