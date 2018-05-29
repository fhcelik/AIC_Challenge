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
import {
  changeCalculatorArgUnit,
  changeCalculatorResultUnit,
} from '../../redux/actions/calculators';
import { getUnit } from '../../redux/schemas/units';
import {
  calculatorArgsSelector,
  calculatorDescriptionSelector,
  calculatorResultSelector,
  calculatorTagsSelector,
  calculatorTitleSelector,
} from '../../redux/selectors/calculators';
import ErrorCatch from '../ErrorCatch';
import Display from './Display';
import Editor from './Editor';

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
    }),
    {
      changeCalculatorArgUnit,
      changeCalculatorResultUnit,
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
  }),
  pure,
  branch(props => props.edit, renderComponent(Editor))
)(Display);
